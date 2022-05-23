const path = require('path');
const authMw = require("../utils/middlewares/authMiddleware");

module.exports = app => {
    app.get('/registro', authMw.isNotAuth, (req, res)=>{
        res.sendFile('register.html', { root: path.resolve('public') });
    });
    
    app.get('/login', authMw.isNotAuth, (req, res) => {
        res.sendFile('login.html', { root: path.resolve('public') });
    });

    app.post('/login', (req, res) => {
        req.session.user = req.body;
        res.json({ success: true });
    });
    
    app.get('/logout', (req, res) => {
        res.sendFile('logout.html', { root: path.resolve('public') });
    });
    
    app.delete('/logout', (req, res) => {
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
    });

    // Extra
    app.get('/api/usuario', (req, res) => {
        if(req.session.user) {
            res.json({ ...req.session.user, facebookLogin: false });
        } else if(req.user) {
            res.json({ ...req.user, facebookLogin: true });
        }
    });
    
    // Errores
    app.get("/login-error", (req, res) => {
        res.sendFile('login-error.html', { root: path.resolve('public') });
    });
    
    app.get("/registro-error", (req, res) => {
        res.sendFile('registro-error.html', { root: path.resolve('public') });
    });
}