import {LlenarTabla,Limpiar} from './tabla.js?a=35'
import {ShowMessage} from './showmessage.js?a=35'

const buscado           = document.getElementById('buscado');
const espera            = document.getElementById("espera");
const buscar            = document.getElementById("buscar");
const buscarreciente    = document.getElementById("buscarreciente");
const buscaraprobados   = document.getElementById("buscaraprobados");
const totalencontrado   = document.getElementById("totalencontrado");
const codigoeventopagado= document.getElementById('codigoeventopagado');

buscar.addEventListener('click',()=>{
    if(codigoeventopagado.value >0)
        Listar(0);
    else
        ShowMessage("Seleccione un evento","error",3000);
})


buscaraprobados.addEventListener('click',()=>{
    if(codigoeventopagado.value >0)
        Listar(1);
    else
        ShowMessage("Seleccione un evento","error",3000);
})

buscarreciente.addEventListener('click',()=>{
    if(codigoeventopagado.value >0)
        Listar(2);
    else
        ShowMessage("Seleccione un evento","error",3000);
})
let arreglo= [];

const Listar = ((valor)=>{
    arreglo= [];
    totalencontrado.innerHTML = '';
    
    let arreglopalabras=[];
    let arreglopalabrasprocesadas=[];
    let itempalabra='';
    let paqueteJsonBuscarprocesadas='';

    espera.style.visibility = "visible";

    const editor = buscado.value;
    arreglopalabras = editor.split(' ');
    
    
    for(let b=0;b<arreglopalabras.length;b++)
    {
        if(arreglopalabras[b].trim()!="")
        {
            itempalabra = new Object();
            itempalabra.palabra = arreglopalabras[b].trim(),
            itempalabra.donde = valor,
            itempalabra.idevento = codigoeventopagado.value,
            arreglopalabrasprocesadas.push(itempalabra);
        }
    }

    paqueteJsonBuscarprocesadas =JSON.stringify( arreglopalabrasprocesadas );

    if(arreglopalabrasprocesadas.length==0 && valor == 0)
    {
        espera.style.visibility = "hidden";
        Limpiar();

        ShowMessage("Ingrese un texto a buscar","success",3000);

    }else{
        
        Limpiar();
         //busqueda de aprobados y desprobados
        if(arreglopalabrasprocesadas.length == 0 && (valor == 1 || valor == 2 || valor == 3)){
            itempalabra = new Object();
            itempalabra.palabra = '-x*#*x/',
            itempalabra.donde = valor,
            itempalabra.idevento = codigoeventopagado.value,

            arreglopalabrasprocesadas.push(itempalabra);

        }
        paqueteJsonBuscarprocesadas =JSON.stringify( arreglopalabrasprocesadas );

        fetch("./controladores/buscarevento.php?a=35",{method:'POST',body:paqueteJsonBuscarprocesadas,headers:{'Content-Type':'application/json'}})   
        .then(response => response.json())
        .then(data => 
        {
            if(data!="consultavacia")
            {
                let cantidad =  data.length;
                totalencontrado.innerHTML = cantidad + " registros encontrados";

                if(cantidad > 0)
                {
                    for(let a = 0 ;a<cantidad;a++) //llenar la lista
                    {
                        let toPropuestas = new Object();

                        toPropuestas.idafiliacion       = data[a].idafiliacion;
                        toPropuestas.numeroafiliado     = data[a].numeroafiliado;
                        toPropuestas.nombres            = data[a].nombres;
                        toPropuestas.apellidos          = data[a].apellidos;
                        toPropuestas.whatsapp           = data[a].whatsapp;
                        toPropuestas.email              = data[a].email;
                        toPropuestas.fotoatleta         = data[a].fotoatleta;

                        toPropuestas.idinscripcion      = data[a].idinscripcion;
                        toPropuestas.idevento           = data[a].idevento;
                        toPropuestas.nombre             = data[a].nombre;
                        toPropuestas.fotopagoevento     = data[a].fotopagoevento;
                        toPropuestas.fechapagoevento    = data[a].fechapagoevento;
                        toPropuestas.aprobacionevento   = data[a].aprobacionevento;
                        toPropuestas.montopagado        = data[a].montopagado;
                        toPropuestas.montopagadodolar   = data[a].montopagadodolar;

                        toPropuestas.idestado           = data[a].idestado;
                        toPropuestas.nombreestado             = data[a].nombreestado;

                        arreglo.push(toPropuestas);
                    }
                }
                espera.style.visibility = "hidden";

                
                LlenarTabla(arreglo);
            }else{
                
                ShowMessage("No hay datos que coincidan con la búsqueda.","success",3000);
                espera.style.visibility = "hidden";
            }

        })
        .catch(function(error){
            ShowMessage("Hubo un error al consultar a la base de datos.","error",3000);
            
            console.log(error);
            espera.style.visibility = "hidden";
        });
    }
});

