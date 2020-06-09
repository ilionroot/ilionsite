const alfabeto = [
    'a','b','c','d','e','f','g','h','i','j',
    'k','l','m','n','o','p','q','r','s','t',
    'u','v','w','x','y','z'
];

function codificar(texto) {
    var codigo = '';
    
    var texto = texto.replace(/[\s-]/g,"");

    for (var i = 0; i < texto.length; i++) {
        var letra = texto[i];

        if (alfabeto.indexOf(letra) > -1) {
            var index = alfabeto.indexOf(letra);
            
            if (index > 0) {
                codigo += alfabeto[index-1];
            } else {
                codigo += alfabeto[25];
            }
        }
    }

    return codigo;
}

function decodificar(texto) {
    var decodificado = '';

    texto = texto.replace(/[\s-]/g,"");

    for (char of texto) {
        var index = alfabeto.indexOf(char);

        if (index === 25) {
            decodificado += alfabeto[0];
        } else if(index !== 25) {
            decodificado += alfabeto[index + 1];
        }
    }
    
    return decodificado;
}

module.exports = {
    deco: decodificar,
    codi: codificar
}