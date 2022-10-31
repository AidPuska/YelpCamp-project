const User = require('../models/user');
const Campground = require('../models/campground')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Successfully registered!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }

}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) };
        req.flash('success', 'Successfully loged out');
        res.redirect('/campgrounds')
    })
}

module.exports.renderProfile = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('users/profile', { campgrounds })
}