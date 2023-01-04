import {ShowMessage} from './showmessage.js';

const fechaestimada = document.getElementById('fechaestimada');
const descargarafiliados = document.getElementById('descargarafiliados');

document.getElementById("fechaestimada").addEventListener('change',()=>{
    SetearFechaEstimada();
    descargarafiliados.style.display = "block";
});

function SetearFechaEstimada() 
    {
        let publicacionFecha = {
            fechaestimada : fechaestimada.value,
        }
        console.log(publicacionFecha);
        fetch("./controladores/setfechaconsulta.php?a=17",{method:'POST',body: JSON.stringify( publicacionFecha ),headers:{'Content-Type':'application/json;charset=utf-8'}})   
     
        .then(response => response.text())
        .then(function(data){
            console.log(data);
        })
        .catch(function (error){
            ShowMessage("No tiene conexión a la base de datos.","error",3000);
            console.log(error);
        });
    }

