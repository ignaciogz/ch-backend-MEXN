const crearListado = (data) => {
    const elementos = data.map((elem) => {
        return `<li style="color: ${elem}">${elem}</li>`;
    })
    .join(" ");

    return `<ul>${elementos}</ul>`
}

const getColoresView = (data = []) => {
    const content = data.length > 0 ? crearListado(data) : "NO hay colores almacenados" 

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <title>Desafío 24</title>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <section id="contenedor">
                <div class="container-fluid">
                <div class="row">
                    <div class="col-8 offset-2">
                        <div class="contenido">
                            <h1>Colores</h1>
            
                            <form action="/" id="formColores" method="POST">
                                <label for="color" class="form-label">Ingrese un color (en inglés)</label>
                                <input type="text" id="color" name="color" class="form-control" placeholder="red" required>

                                <input type="submit" class="btn btn-success" value="Enviar">
                            </form>
                            <hr>
                            <h3>Listado de colores almacenados</h3>
                            ${content}
                        </div>
                    </div>
                </div>
            </section>

            <script src="main.js"></script>
        </body>
        </html>
    `
}
    

export default getColoresView;