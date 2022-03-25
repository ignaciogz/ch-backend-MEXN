class View {
    static async getHBS(vista) {
        return await fetch(`/${vista}.handlebars`)
                        .then(res => res.text());
    }
    
    static renderView(HBSTemplate, data = null) {
        const template = Handlebars.compile(HBSTemplate);          // Compilando la plantilla
        const html = template(data);                               // Generando el html
        document.getElementById('container').innerHTML = html;     // Inyectando el resultado en la vista
    }
}

export { View };