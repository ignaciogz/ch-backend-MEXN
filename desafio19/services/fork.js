const { NumberTools } = require("../utils/tools");

const contarNumerosRandomGenerados = (cantidadDeNumerosRandom) => {
    let numeros = {};

    for(let i=0; i < cantidadDeNumerosRandom; i++) {
        let randomNumber = NumberTools.getRandom();
        numeros[randomNumber] = numeros.hasOwnProperty(randomNumber) ? numeros[randomNumber] + 1 : 1;
    }

    return numeros;
}

module.exports = { contarNumerosRandomGenerados }