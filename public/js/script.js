$('.menu').click(() => {
    var menu = document.getElementById('menu');
    
    menu.classList.toggle('efeito');

    var lat = $('.lat')[0];
    var escurecer = $('.escurecer')[0];

    abrirLat(lat, escurecer);
});

function abrirLat(obj, obj1) {
    obj.classList.toggle('crescer');
    obj1.classList.toggle('escurecer1');
}