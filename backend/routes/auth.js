const express = require('express')
const User = require('../models/Users')
const router = express.Router()
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'donttellanybody'

const { body, validationResult } = require('express-validator');

// create a User using : POST './api/auth/createuser' . No login required

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
            // check whether the user with same email exists already
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Seems like email already exists" })
            }
            // creating secure pass
            const salt = await bcrypt.genSaltSync(10)
            const secPass = await bcrypt.hashSync(req.body.password , salt)

            // create new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            const data ={
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET)
            res.json({token})
        } catch (error) {        //to catch error and show other than duplicate email
            console.error(error.message)
            res.status(500).send('some error occured')
        }
    })

module.exports = router