
const getUsuario = (req, res) => {
    if(req.session.user) {
        res.json({ ...req.session.user, facebookLogin: false });
    } else if(req.user) {
        res.json({ ...req.user, facebookLogin: true });
    }
};

module.exports = { getUsuario }