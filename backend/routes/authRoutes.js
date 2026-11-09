const { Router } = require('express');
const passport = require("passport");
require('../middleware/passport');
const authController = require('../controller/authController');

const authRouter = Router();

authRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
        return res.status(401).json({ error: info.message });
        }

        return authController.login(req, res, next, user);
    })(req, res, next)
});

authRouter.post('/signup', authController.signup);

module.exports = authRouter