let plantilla;

window.onload = init;

async function init() {
    await getHBS("info");
    initInfo();
};

async function getHBS(templateName) {
    // Obtieniendo la plantilla
    await fetch(`/${templateName}.handlebars`)
            .then(res => res.text())
            .then(data => plantilla = data);
}

function renderView(data) {
    const template = Handlebars.compile(plantilla);             // Compilando la plantilla
    const html = template(data);                                // Generando el html
    document.getElementById('contenedor').innerHTML = html;     // Inyectando el resultado en la vista
}

async function initInfo() {
    const data = await fetch("/process/api/info")
                        .then(res => res.json());
    renderView(data);
}