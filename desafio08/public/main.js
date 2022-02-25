let socket, plantilla;

window.onload = init;

async function init() {
    await getHBS();
    initSockets();
};

async function getHBS() {
    // Obtieniendo la plantilla
    await fetch("/index.handlebars")
            .then(res => res.text())
            .then(data => plantilla = data);
}

function initSockets() {
    socket = new io();

    socket.on('init', data => {
        renderView(data);

        initFormProduct();
        initFormChat();
    });

    socket.on('renderView', data => {
        renderView(data);
    });

    socket.on('renderNewProduct', data => {
        renderProducts(data);
    });

    socket.on('renderNewMessage', data => {
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
        .map(function (elem, index) {
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
    let html = data.arrayMsjs
        .map(function (elem, index) {
            return `<div class="msjChat">
                        <b>${elem.email}</b>
                        <span>[${elem.date}]</span>: <i>${elem.msj}</i>
                    </div>`;
        })
        .join(" ");

    document.getElementById("contenedorChat").innerHTML = html;
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

        if (productoNuevo.title == "" || productoNuevo.price == "" || productoNuevo.thumbnail == "") window.location.reload();

        socket.emit("new-product", productoNuevo);

        return false;
    })
}

function initFormChat() {
    const formChat = document.getElementById('formChat');
    formChat.addEventListener("submit", e => {
        e.preventDefault();
        
        let msjNuevo = {
            email: e.target[0].value,
            date: Date.now(),
            msj: e.target[1].value
        }
        
        if(msjNuevo.email == "" || msjNuevo.msj == "") window.location.reload();
        
        socket.emit("new-message", msjNuevo);

        return false;
    })
}
