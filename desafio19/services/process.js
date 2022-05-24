const CPUS = require('os').cpus();

const getInfoObject = () => {
    return {
        argumentos: process.argv,
        SO: process.platform,
        version_node: process.version,
        memoria_total_reservada: process.memoryUsage().rss,
        path_de_ejecucion: process.execPath,
        PID: process.pid,
        carpeta_del_proyecto: process.cwd(),
        num_cpus: CPUS.length
    }
}

module.exports = { getInfoObject }