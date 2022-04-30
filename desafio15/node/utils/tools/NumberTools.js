class NumberTools {
    static getRandom(max = 1000, min = 1) {
        return Math.floor(Math.random() * max) + min;
    }
}

module.exports = NumberTools;