const express = require('express');
const { fork } = require('child_process');

module.exports = app => {
    const router = express.Router();
    app.use('/fork', router);

    router.get('/api/randoms', (req, res) => {
        const forked = fork("forks/randomCounter.js")
        let { cant } = req.query;

        cant = Number(cant) || 100000000;

        forked.send({ cant });

        forked.on('message', msg => {
            const { resultado } = msg;
            res.json(resultado);
        })
    });
}