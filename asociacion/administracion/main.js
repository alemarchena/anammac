document.oncontextmenu = () => { return false;}

document.addEventListener("keydown", function(event){
    var key = event.key ;
    if (key == 'F12') {
        window.location.reload();
    } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
        window.close();
    }
}, false);

import './app/interfaz.js?a=26'
import './app/redireccion.js?a=26'
import './app/buscador.js?a=26'
import './app/funcionalidadtabla.js?a=26'
import './app/usuarios.js?a=26'

