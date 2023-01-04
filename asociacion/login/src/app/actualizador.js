import {ShowMessage} from './showmessage.js'
// ----------------------- Modificaciones de datos -----------------------
const idusuario = document.getElementById('idusuario');

document.addEventListener('change',function(e){

    let uck = e.target.id;
    let valor = this.getElementById(uck).value;
    
    uck == 'usuario'    ? ABDD('usuario',valor,'texto')     :false;
    uck == 'email' ? ShowMessage('Se ha intentado cambiar el email','error') : false;

    e.preventDefault();
});

//Actualiza los datos del alumno en la base de datos
export const ABDD = ((campo,valor,tipodato)=>{
    valor = valor.replace("'",'`');
    let datosconsulta = {id  : idusuario.value,campo : campo,valor:valor,tipodato:tipodato}
    fetch("./controladores/actualizausuario.php?a=8",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
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

export const EBDD = ( async (tabla,campo,valor,tipodato)=>{
    let stringvalor = valor.toString();
    valor = stringvalor.replace("'",'`');
    
    let datosconsulta = {tabla:tabla, campo : campo,valor:valor,tipodato:tipodato}
    fetch("./controladores/eliminagenerico.php?a=8",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
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
