const toJSON = (data) => {
    return JSON.stringify(data, null, 2);
}

let initialData = {
    "elements": [
        {
            "title": "Escuadra",
            "id": 1,
            "price": 123.45,
            "timestamp": "31-03-2022 22:32:19",
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
        },
        {
            "title": "Calculadora",
            "id": 2,
            "price": 234.56,
            "timestamp": "31-03-2022 22:34:26",
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        },
        {
            "title": "Globo Terráqueo",
            "id": 3,
            "price": 345.67,
            "timestamp": "31-03-2022 22:35:04",
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
        }
    ]
}

initialData = toJSON(initialData);

module.exports = initialData;