const { fork } = require('child_process');

const getRandoms = (req, res) => {
    const forked = fork("forks/randomCounter.js")
    let { cant } = req.query;

    cant = Number(cant) || 100000000;

    forked.send({ cant });

    forked.on('message', msg => {
        const { resultado } = msg;
        res.json(resultado);
    })
};

module.exports = { getRandoms }