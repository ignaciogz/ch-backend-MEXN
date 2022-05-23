const { NumberTools } = require("../utils/tools");

// LOGICA
function contarNumerosRandomGenerados(cantidadDeNumerosRandom) {
    let numeros = {};

    for(let i=0; i < cantidadDeNumerosRandom; i++) {
        let randomNumber = NumberTools.getRandom();
        numeros[randomNumber] = numeros.hasOwnProperty(randomNumber) ? numeros[randomNumber] + 1 : 1;
    }

    return numeros;
}

// COMUNICACION
process.on('message', msg => {
    const { cant } = msg;

    const resultado = contarNumerosRandomGenerados(cant);
    process.send({ resultado });
});