import {ShowMessage} from './showmessage.js'
// ----------------------- Modificaciones de datos -----------------------
const idevento = document.getElementById('ideventoauto');
let valor='';

document.addEventListener('change',function(e){

    if(idevento.value != '')
    {
        let uck = e.target.id;
        valor = this.getElementById(uck).value;
        
        uck == 'nombreeventog'    ? ABDD('nombre',valor,'texto',idevento.value)     :false;
        uck == 'descripcioneventog'    ? ABDD('descripcion',valor,'texto',idevento.value)     :false;
        uck == 'fechaeventog'    ? ABDD('fecha',valor,'texto',idevento.value)     :false;
        uck == 'horaeventog'    ? ABDD('hora',valor,'texto',idevento.value)     :false;
        uck == 'archivocondiciones'    ? ABDD('archivocondiciones',valor,'texto',idevento.value)     :false;
        uck == 'whatsappg'    ? ABDD('whatsapp',valor,'texto',idevento.value)     :false;
        
        uck == 'cantidadpruebasbase'    ? ABDD('cantidadpruebasbase',valor,'numero',idevento.value)     :false;
        uck == 'costopruebabase'    ? ABDD('costopruebabase',valor,'numero',idevento.value)     :false;
        uck == 'costopruebaextra'    ? ABDD('costopruebaextra',valor,'numero',idevento.value)     :false;
        uck == 'costomenores'    ? ABDD('costomenores',valor,'numero',idevento.value)     :false;
        uck == 'edadmaximamenor'    ? ABDD('edadmaximamenor',valor,'numero',idevento.value)     :false;
        uck == 'costopruebacombinada'    ? ABDD('costopruebacombinada',valor,'numero',idevento.value)     :false;
        
    }
    e.preventDefault();
});

//Actualiza los datos del atleta en la base de datos
export const ABDD = ( async (campo,valor,tipodato,idevento)=>{
    let stringvalor = valor.toString();
    valor = stringvalor.replace("'",'`');
    
    let datosconsulta = {campo : campo,valor:valor,tipodato:tipodato,id  : idevento}
    fetch("./controladores/actualizaevento.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
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
