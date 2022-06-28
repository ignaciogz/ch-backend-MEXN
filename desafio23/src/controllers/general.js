const send = require('koa-send');
const path = require('path');

const getHomePage = async (ctx) => {
    await send(ctx, 'main.html', { root: path.resolve('src/public') });
}

const getRegistroPage = async (ctx) => {
    await send(ctx, 'register.html', { root: path.resolve('src/public') });
};

const getLoginPage = async (ctx) => {
    await send(ctx, 'login.html', { root: path.resolve('src/public') });
};

const postLogin = async (ctx) => {
    ctx.session.user = ctx.request.body;

    ctx.body = {
        success: true
    };
}

const getLogout = async (ctx) => {
    await send(ctx, 'logout.html', { root: path.resolve('src/public') });
};

const deleteLogout = (ctx, next) => {
    if(ctx.session.user) {
        ctx.session = null;
    }

    if(ctx.state.user) {
        ctx.logout();
    }
}; 

// Errores
const getLogin_errorPage = async (ctx) => {
    await send(ctx, 'login-error.html', { root: path.resolve('src/public') });
};

const getRegistro_errorPage = async (ctx) => {
    await send(ctx, 'registro-error.html', { root: path.resolve('src/public') });
};

module.exports = {
    getHomePage,
    getRegistroPage,
    getLoginPage,
    postLogin,
    getLogout,
    deleteLogout,
    getLogin_errorPage,
    getRegistro_errorPage
}