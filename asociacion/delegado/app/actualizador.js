import {ShowMessage} from './showmessage.js'
// ----------------------- Modificaciones de datos -----------------------
const idusuario = document.getElementById('idusuario');
let valor='';

document.addEventListener('change',function(e){

    let uck = e.target.id;
    valor = this.getElementById(uck).value;
    
    uck == 'usuario'    ? ABDD('usuario',valor,'texto',idusuario.value)     :false;
    uck == 'email' ? ShowMessage('Se ha intentado cambiar el email','error') : false;

    e.preventDefault();
});

//Actualiza los datos del alumno en la base de datos
export const ABDD = ( async (campo,valor,tipodato,idusuario)=>{
    let stringvalor = valor.toString();
    valor = stringvalor.replace("'",'`');
    
    let datosconsulta = {campo : campo,valor:valor,tipodato:tipodato,id  : idusuario}
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
