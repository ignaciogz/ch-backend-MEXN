let plantilla;

window.onload = init;

async function init() {
    await getHBS("faker");
    await initListadoAleatorio();
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

async function initListadoAleatorio() {
    const data = await fetch("/faker/api/productos-test")
                        .then(res => res.json());
    renderView(data);
}