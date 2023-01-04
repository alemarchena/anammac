import {NewOpcion} from './select.js';

const codigoespecialidad = document.getElementById('codigoespecialidad');

export function ListaEspecialidades() 
    {
        NewOpcion(codigoespecialidad,'0','Seleccione su especialidad');

        let publicacionlistaEspecialidades = {
            tabla : "apt_especialidades",
        }
     
        fetch("./controladores/leer.php?a=33",{method:'POST',body: JSON.stringify( publicacionlistaEspecialidades ),headers:{'Content-Type':'application/json'}})   
     
        .then(response => response.json())
        .then(function(data){
            let cantidad = Object.keys(data).length;
            if(cantidad>0){
                for(let a = 0 ;a<cantidad;a++) //llenar la lista
                {
                    NewOpcion(codigoespecialidad,data[a].codigoespecialidad,data[a].nombreespecialidad);
                }
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }

    ListaEspecialidades();
