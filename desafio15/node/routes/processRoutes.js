const express = require('express');
const path = require('path');
const CPUS = require('os').cpus();

module.exports = app => {
    const router = express.Router();
    app.use('/process', router);

    router.get('/info', (req, res) => {
        res.sendFile('info.html', { root: path.resolve('public') });
    });

    router.get('/api/info', (req, res) => {
        const info = {
            argumentos: process.argv,
            SO: process.platform,
            version_node: process.version,
            memoria_total_reservada: process.memoryUsage().rss,
            path_de_ejecucion: process.execPath,
            PID: process.pid,
            carpeta_del_proyecto: process.cwd(),
            num_cpus: CPUS.length
        }
        
        res.json({ info });
    });
}