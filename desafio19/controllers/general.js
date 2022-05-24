const path = require('path');
const { infoLog: loggerWinston } = require("../utils/loggers/winston");

const allLogearPeticionRecibida = (req, res, next) => {
    loggerWinston.info(`Petición recibida -> ruta: '${req.path}' || método: '${req.method}'`);
    next();
};

const getHomePage = (req, res) => {
    res.sendFile('main.html', { root: path.resolve('public') });
};

const getRegistroPage = (req, res) => {
    res.sendFile('register.html', { root: path.resolve('public') });
};

const getLoginPage = (req, res) => {
    res.sendFile('login.html', { root: path.resolve('public') });
};

const postLogin = (req, res) => {
    req.session.user = req.body;
    res.json({ success: true });
};

const getLogout = (req, res) => {
    res.sendFile('logout.html', { root: path.resolve('public') });
};

const deleteLogout = (req, res) => {
    if(req.user) {
        req.user = null;
    }

    req.session.destroy( err => {
        if(err) {
            res.send({ status: "Logout ERROR", body: err });
        } else {
            res.send("Logout OK !");
        }
    });
};

// Errores
const getLogin_errorPage = (req, res) => {
    res.sendFile('login-error.html', { root: path.resolve('public') });
};

const getRegistro_errorPage = (req, res) => {
    res.sendFile('registro-error.html', { root: path.resolve('public') });
};

module.exports = {
    allLogearPeticionRecibida,
    getHomePage,
    getRegistroPage,
    getLoginPage,
    postLogin,
    getLogout,
    deleteLogout,
    getLogin_errorPage,
    getRegistro_errorPage
}