import {NewOpcion} from './select.js';

const codigosangre = document.getElementById('codigosangre');

export function ListaSangres() 
    {
        NewOpcion(codigosangre,'0','Seleccione su tipo de sangre');

        let publicacionlistaSangres = {
            tabla : "apt_sangres",
        }
     
        fetch("./controladores/leer.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaSangres ),headers:{'Content-Type':'application/json'}})   
     
        .then(response => response.json())
        .then(function(data){
            let cantidad = Object.keys(data).length;
            if(cantidad>0){
                for(let a = 0 ;a<cantidad;a++) //llenar la lista
                {
                    NewOpcion(codigosangre,data[a].idsangre,data[a].nombresangre);
                }
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }

ListaSangres();

