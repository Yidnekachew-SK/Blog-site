const jwt = require('jsonwebtoken');
require('../middleware/passport');

async function loginGet(req, res) {
    res.json({message: 'login page'});
}

async function loginPost(req, res) {
    const user = req.user;

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token });
}

async function signup(req, res) {
    res.json({message: 'signup page'});
}

async function signupPost(req, res) {
    res.json();
}

module.exports = {
    loginGet,
    loginPost,
    signup,
    signupPost
}