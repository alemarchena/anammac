import {ShowMessage} from './showmessage.js'
// ----------------------- Modificaciones de datos -----------------------
const idafiliacion = document.getElementById('idafiliacion');
let valor='';

document.addEventListener('change',function(e){

    let uck = e.target.id;
    valor = this.getElementById(uck).value;
    
    uck == 'usuario'    ? ABDD('usuario',valor,'texto',idafiliacion.value)     :false;
    uck == 'nombrecambia'    ? ABDD('nombres',valor,'texto',idafiliacion.value)     :false;
    uck == 'apellidocambia'    ? ABDD('apellidos',valor,'texto',idafiliacion.value)     :false;
    uck == 'calendario'    ? ABDD('fechanacimiento',valor,'texto',idafiliacion.value)     :false;
    uck == 'email' ? ShowMessage('Se ha intentado cambiar el email','error') : false;

    e.preventDefault();
});

//Actualiza los datos del atleta en la base de datos
export const ABDD = ( async (campo,valor,tipodato,idafiliacion)=>{
    let stringvalor = valor.toString();
    valor = stringvalor.replace("'",'`');
    
    let datosconsulta = {campo : campo,valor:valor,tipodato:tipodato,id  : idafiliacion}
    fetch("./controladores/actualizaafiliado.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1){
            ShowMessage(campo+" guardado..","success",2000)
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
})

//Elimina un registro segun un campo y valor de la base de datos
export const EBDD = ( async (tabla,campo,valor,tipodato)=>{
    let stringvalor = valor.toString();
    valor = stringvalor.replace("'",'`');
    
    let datosconsulta = {tabla:tabla, campo : campo,valor:valor,tipodato:tipodato}
    fetch("./controladores/eliminagenerico.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1){
            ShowMessage(campo+" eliminado..","success",2000)
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
})
