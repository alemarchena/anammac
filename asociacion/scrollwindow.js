
window.onscroll = function () { scrollfunction() };

function scrollfunction() 
{
    var winScroll = document.body.scrollTop;
    var height = document.body.scrollHeight - document.body.clientHeight;
    var scrolled = (winScroll / height) * 100;
    
    Funcionalidad(scrolled);

}


function Funcionalidad(movimiento){
    // AnimaBarra(movimiento);
    botonFlotante(movimiento);
}

function AnimaBarra(movimiento){
    document.getElementById("barra").style.width = movimiento + "%";
}


function botonFlotante(m){
    if(m > 5)
    { document.getElementById("botonflotante").style.display= "block";}
    else
    { document.getElementById("botonflotante").style.display = "none";}
}