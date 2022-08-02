
function obtenerPrimos(from, to) {
    let numerosPrimos = [];
    for (; from < to; from++) {
        if (primo(from)) {
            numerosPrimos.push(from);
        }
    }
    console.log(numerosPrimos);
}

function primo(numero) {
    for (var i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return numero !== 1;
}