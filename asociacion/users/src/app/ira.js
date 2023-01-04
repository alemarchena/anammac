const botonflotante = document.getElementById('botonflotante');

botonflotante.addEventListener('click',()=>{
    ira(500,'navbar');
});

function ira(velocidad, lugar) {
    let posicion = $("#" + lugar).offset().top;
    $("HTML, BODY").animate({ scrollTop: posicion }, velocidad);
}

