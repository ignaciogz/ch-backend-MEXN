class Auth {
    isAuth(req, res, next) {
        const userIsAuthenticated = req.session.user ? true : false;
        if(userIsAuthenticated || req.isAuthenticated()){
            next();
        } else {
            res.redirect('/login');
        }
    }
    
    isNotAuth(req, res, next) {
        const userIsAuthenticated = req.session.user ? true : false;
        if(!userIsAuthenticated && !req.isAuthenticated()){
            next();
        } else {
            res.redirect('/');
        }
    }
}

module.exports = new Auth();