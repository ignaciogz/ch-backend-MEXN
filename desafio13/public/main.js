let socket, plantilla;

window.onload = init;

async function init() {
    await getHBS('main');
    initSockets();
    initUserNavBar();
};

async function getHBS(templateName) {
    // Obtieniendo la plantilla
    await fetch(`/${templateName}.handlebars`)
            .then(res => res.text())
            .then(data => plantilla = data);
}

function initSockets() {
    socket = new io();

    // INICIO - normalizr schemas
    const autoresSchema = new normalizr.schema.Entity('autores');

    const mensajesSchema = new normalizr.schema.Entity('mensajes', {
        autor: autoresSchema
    });
        
    const chatSchema = new normalizr.schema.Entity('chatSchema', {
        mensajes: [mensajesSchema]
    })
    // FIN - normalizr schemas

    socket.on('init', data => {
        data = denormalizeMsjs(data, chatSchema);
        renderView(data);

        initFormProduct();
        initFormChat();
    });

    socket.on('renderView', data => {
        data = denormalizeMsjs(data, chatSchema);
        renderView(data);
    });

    socket.on('renderNewProduct', data => {
        renderProducts(data);
    });

    socket.on('renderNewMessage', data => {
        data = denormalizeMsjs(data, chatSchema);
        renderMessages(data);
    });
}

function renderView(data) {
    const template = Handlebars.compile(plantilla);             // Compilando la plantilla
    const html = template(data);                                // Generando el html
    document.getElementById('contenedor').innerHTML = html;     // Inyectando el resultado en la vista
}

function renderProducts(data) {
    let html = data.arrayProductos
        .map(function (elem) {
            return `<tr>
                        <td>${elem.title}</td>
                        <td>${elem.price}</td>
                        <td><img src="${elem.thumbnail}" class="thumbnail"></td>
                    </tr>`;
        })
        .join(" ");

    document.getElementById("contenedorProductos").innerHTML = html;
}

function renderMessages(data) {
    let html = data.arrayMsjs.mensajes
        .map(function (elem) {
            return `<div class="msjChat">
                        <b>${elem.autor.id}</b>
                        <span>[${elem.timestamp}]</span>: <i>${elem.msj}</i>
                        <img class="avatar" src=${elem.autor.avatar} alt="Avatar de ${elem.autor.nombre} ${elem.autor.apellido}">
                    </div>`;
        })
        .join(" ");

    document.getElementById("contenedorChat").innerHTML = html;
}

function renderUserData(data) {
    const { userName, userImg, userEmail } = data;
    document.getElementById("contenedorNombreDeUsuario").innerHTML = userName;
    document.getElementById("contenedorEmailDeUsuario").innerHTML = userEmail;
    document.getElementById("contenedorImgDeUsuario").src = userImg; 
}

async function initUserNavBar() {
    let data = await Request.GET('api/usuario');
    renderUserData(data);

    const $btnDesloguear = document.getElementById("btn-desloguear");
    $btnDesloguear.addEventListener("click", () => {
        location.href = "/logout"
    });
}

function initFormProduct() {
    const formProduct = document.getElementById('formProduct');
    formProduct.addEventListener("submit", e => {
        e.preventDefault();

        let productoNuevo = {
            title: e.target[0].value,
            price: e.target[1].value,
            thumbnail: e.target[2].value
        }

        socket.emit("new-product", productoNuevo);

        return false;
    })
}

function initFormChat() {
    const formChat = document.getElementById('formChat');
    formChat.addEventListener("submit", e => {
        e.preventDefault();
        
        let msjNuevo = {
            autor: {
                id: e.target[0].value,
                nombre: e.target[1].value,
                apellido: e.target[2].value,
                edad: e.target[3].value,
                alias: e.target[4].value,
                avatar: e.target[5].value,
            },
            msj: e.target[6].value
        }
        
        socket.emit("new-message", msjNuevo);

        e.target[6].value = "";
        e.target[6].focus();

        return false;
    })
}

function denormalizeMsjs(data, schema) {
    let arrayMsjs = normalizr.denormalize(data.arrayMsjs.result, schema, data.arrayMsjs.entities);

    let normalizado = JSON.stringify(data.arrayMsjs).length;
    let desnormalizado = JSON.stringify(arrayMsjs).length;
    let compresion = Math.floor(100 - (normalizado * 100) / desnormalizado);
    
    return {
        ...data,
        arrayMsjs,
        compresion
    };
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