module.exports = {
    //Archivos ecosystem, opcion util para aumentar productividad usando PM2
    apps : [{
        "name": "my-server",
        "script": "myserver.js",
        "args": "-p 8086",
        "exec_mode": "cluster",
        "instances": -1
    },{
        "name": "my-server2",
        "script": "myserver.js",
        "args": "-p 8074",
        "exec_mode": "fork"
    }]
}