const service = require('../services/process');
const path = require('path');

const getInfoPage = (req, res) => {
    res.sendFile('info.html', { root: path.resolve('src/public') });
};

const getInfo = (req, res) => {
    const info = service.getInfoObject();
    console.log("La info es: ", info);
    
    res.json({ info });
};

module.exports = { getInfoPage, getInfo };