// ----------------------- Modificaciones de datos -----------------------
import {GetRandomString} from './randomstring.js'
import {ABDD} from './actualizador.js'
import {ShowMessage} from './showmessage.js'


const keyusuario = document.getElementById("keyusuario");

document.addEventListener('change',function(e){

    let uck = e.target.id;
    let valor = this.getElementById(uck).value;
    uck == 'usuario'    ? ABDD('usuario',valor,'texto')     :false;
    e.preventDefault();
});


document.getElementById("generarusuario").addEventListener('click',(e)=>{
    
    e.preventDefault();
    let nuevaClave =GetRandomString(7);
    let datosconsulta = {usuario:nuevaClave,codigoestado:0,aprobado:0,desactivado  : 0}
    fetch("./controladores/guardarafiliadovacio.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1)
        {
            keyusuario.value = nuevaClave;
            ShowMessage("Nuevo usuario creado con clave : " + nuevaClave,"success",10000);
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });


})
