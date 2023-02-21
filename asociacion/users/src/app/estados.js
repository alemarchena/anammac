import {NewOpcion} from './select.js?a=67';

const codigoestado = document.getElementById('codigoestado');

export function ListaEstados() 
    {
        
        if(codigoestado.length == 0)
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
            console.log(error);
        });
    }

    ListaEstados();
