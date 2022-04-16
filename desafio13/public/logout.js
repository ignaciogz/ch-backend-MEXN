let plantilla;

window.onload = init;

async function init() {
    await getHBS("logout");
    renderView();

    showUserInfo();
    deleteUserInfo();
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

function renderUserName(data) {
    const { userName } = data;
    document.getElementById("contenedorNombreDeUsuario").innerHTML = userName;
}

async function showUserInfo() {
    let data = await Request.GET('api/usuario');
    renderUserName(data);

    setTimeout(() => {
        location.href = "/login";
    }, 2000);
}

async function deleteUserInfo() {
    await Request.DELETE('logout');
}

// Tomado de 2da Entrega de Proyecto Final:
class Request {
    static #generateOptionsObj(method, data) {
        return {
            method,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    }

    static async #generateRequestWithOptions(url, method, data) {
        const options = Request.#generateOptionsObj(method, data);
        
        return await fetch(url, options)
                        .then(res => res.json());
    }

    static async GET(url) {
        return await fetch(url)
                        .then(res => res.json());
    }

    static async POST(url, data = {}) {
        return await Request.#generateRequestWithOptions(url, "POST", data);
    }

    static async PUT(url, data = {}) {
        return await Request.#generateRequestWithOptions(url, "PUT", data);
    }

    static async DELETE(url, data = {}) {
        return await Request.#generateRequestWithOptions(url, "DELETE", data);
    }
}