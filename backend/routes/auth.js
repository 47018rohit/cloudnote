const express = require('express')
const User = require('../models/Users')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'donttellanybody'

const { body, validationResult } = require('express-validator');

//ROUTE 1: create a User using : POST './api/auth/createuser' . No login required

router.post('/createuser', [
    body('name', 'please enter valid name').isLength({ min: 3 }),
    body('email', 'please enter valid email').isEmail(),
    body('password', 'password must be atleast 8 character').isLength({ min: 8 }),

],
    async (req, res) => {
        // if errors occur , show bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            let success = false;
            // check whether the user with same email exists already
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({success, error: "Seems like email already exists" })
            }
            // creating secure pass
            const salt = await bcrypt.genSaltSync(10)
            const secPass = await bcrypt.hashSync(req.body.password, salt)

            // create new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({success, token })
        } catch (error) {        //to catch error and show other than duplicate email
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })

//ROUTE 2: Validate a User login using : POST './api/auth/login' . No login required

router.post('/login', [
    body('email', 'please enter valid email').isEmail(),
    body('password', `password can't be left blank`).exists(),

],
    async (req, res) => {
        // if errors occur , show bad request and errors
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                // success = false
                res.status(400).json({ success, error: 'Please enter correct credentials' })
            }
            // comparing the password
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                // success = false
                res.status(400).json({ success, error: 'Please enter correct credentials' })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({ success, token })

        } catch (error) {        //to catch error and show other than duplicate email
            console.error(error.message)
            res.status(500).send('Internal Server Error ')
        }
    })

//ROUTE 3: Get User logged in Details using : POST './api/auth/getuser' . Login required
router.post('/getuser', fetchuser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error ')
    }
})


module.exports = router