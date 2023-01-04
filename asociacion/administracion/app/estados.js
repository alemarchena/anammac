import {NewOpcion} from './select.js';
import {ShowMessage} from './showmessage.js';

const codigoestado = document.getElementById('codigoestado');

export function ListaEstados() 
    {
        NewOpcion(codigoestado,'0','Seleccione el estado que representa');

        let publicacionlistaEstados = {
            tabla : "apt_estados",
        }
     
        fetch("./controladores/leer.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaEstados ),headers:{'Content-Type':'application/json'}})   
     
        .then(response => response.json())
        .then(function(data){
            let cantidad = Object.keys(data).length;
            if(cantidad>0){
                for(let a = 0 ;a<cantidad;a++) //llenar la lista
                {
                    NewOpcion(codigoestado,data[a].idestado,data[a].nombreestado);
                }
            }
        })
        .catch(function (error){
            ShowMessage("No tiene conexión a la base de datos.","error",3000);
            console.log(error);
        });
    }

