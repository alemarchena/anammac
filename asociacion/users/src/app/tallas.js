import {NewOpcion} from './select.js';

const codigotalla= document.getElementById('codigotalla');

export function ListaTallas() 
    {
        NewOpcion(codigotalla,'0','Seleccione su talla');

        let publicacionlistaTallas = {
            tabla : "apt_tallas",
        }
     
        fetch("./controladores/leer.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaTallas ),headers:{'Content-Type':'application/json'}})   
     
        .then(response => response.json())
        .then(function(data){
            let cantidad = Object.keys(data).length;
            if(cantidad>0){
                for(let a = 0 ;a<cantidad;a++) //llenar la lista
                {
                    NewOpcion(codigotalla,data[a].codigotalla,data[a].nombretalla);
                }
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }

ListaTallas();

