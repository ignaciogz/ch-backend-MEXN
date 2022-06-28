class Auth {
    async isAuth(ctx, next) {
        const userIsAuthenticated = ctx.session.user ? true : false;
        if(userIsAuthenticated || ctx.isAuthenticated()){
            await next();
        } else {
            ctx.redirect('/login');
        }
    }
    
    async isNotAuth(ctx, next) {
        const userIsAuthenticated = ctx.session.user ? true : false;
        if(!userIsAuthenticated && !ctx.isAuthenticated()){
            await next();
        } else {
            ctx.redirect('/');
        }
    }
}

module.exports = new Auth();