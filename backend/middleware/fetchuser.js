const jwt = require("jsonwebtoken");
const JWT_SECRET = 'donttellanybody'

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add user id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: 'please enter with right token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;

    } catch (error) {
        res.status(401).send({ error: 'please enter with right token' })
    }
    next();
}

module.exports = fetchuser;