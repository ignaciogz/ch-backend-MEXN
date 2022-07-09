window.onload = init;

function init() {
    initFormLogin();
};

function initFormLogin() {
    const formColores = document.getElementById('formColores');
    formColores.addEventListener("submit", callbackFormColores)
}

async function callbackFormColores(e) {
    e.preventDefault();

    const data = {
        color: e.target.color.value
    }

    const result = await Request.POST('/', data);

    if (result.success) {
        location.href = "/";
    }

    return false;
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