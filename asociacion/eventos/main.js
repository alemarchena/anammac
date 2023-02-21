document.oncontextmenu = () => { return false;}

document.addEventListener("keydown", function(event){
    var key = event.key ;
    if (key == 'F12') {
        window.location.reload();
    } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
        window.close();
    }
}, false);

import './app/interfaz.js?a=19'
import './app/redireccion.js?a=19'
import './app/buscador.js?a=19'
import './app/tabla.js?a=19'
import './app/funcionalidadtabla.js?a=19'
import './app/pruebas.js?a=19'
import './app/actualizador.js?a=19'
import './app/tablapruebas.js?a=19'

