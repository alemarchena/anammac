document.oncontextmenu = () => { return false;}

document.addEventListener("keydown", function(event){
    var key = event.key ;
    if (key == 'F12') {
        window.location.reload();
    } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
        window.close();
    }
}, false);

import './app/interfaz.js?a=35'
import './app/redireccion.js?a=35'
import './app/buscador.js?a=35'
import './app/tabla.js?a=35'
import './app/funcionalidadtabla.js?a=35'
// import './app/pruebas.js?a=35'
import './app/actualizador.js?a=35'
import './app/tablapruebas.js?a=35'

