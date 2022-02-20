class FormTools {
    static getInput(id) {
        const $input = document.getElementById(`${id}`);

        return $input.value;
    }

    static setInput(id, valor) {
        const $input = document.getElementById(`${id}`);

        $input.value = valor;
    }
}

export { FormTools };