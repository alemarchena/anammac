import {LlenarTabla,Limpiar} from './tabla.js?a=9'
import {ShowMessage} from './showmessage.js?a=9'

const buscado           = document.getElementById('buscado');
const espera            = document.getElementById("espera");
const buscar            = document.getElementById("buscar");
const totalencontrado   = document.getElementById("totalencontrado");
const uidestado         = document.getElementById("uidestado");
const uemail            = document.getElementById("uemail");
const upas              = document.getElementById("upas");

buscar.addEventListener('click',()=>{
    Listar(0);
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
    
    Limpiar();
    
    for(let b=0;b<arreglopalabras.length;b++)
    {
        if(arreglopalabras[b].trim()!="")
        {
            itempalabra = new Object();
            itempalabra.palabra = arreglopalabras[b].trim(),
            itempalabra.donde = valor,
            itempalabra.idestado = uidestado.innerHTML,
            itempalabra.email = uemail.innerHTML,
            itempalabra.usuario = upas.innerHTML,
            arreglopalabrasprocesadas.push(itempalabra);
        }
    }

    paqueteJsonBuscarprocesadas =JSON.stringify( arreglopalabrasprocesadas );

        //busqueda de aprobados y desprobados
    if(arreglopalabrasprocesadas.length == 0){
        itempalabra = new Object();
        itempalabra.palabra = '-x*#*x/',
        itempalabra.donde = valor,
        itempalabra.idestado =  uidestado.innerHTML,
        itempalabra.email = uemail.innerHTML,
        itempalabra.usuario = upas.innerHTML,
        arreglopalabrasprocesadas.push(itempalabra);
    }
    paqueteJsonBuscarprocesadas =JSON.stringify( arreglopalabrasprocesadas );

    
    fetch("./controladores/buscarxestado.php?a=4",{method:'POST',body:paqueteJsonBuscarprocesadas,headers:{'Content-Type':'application/json'}})   
    .then(response => response.json())
    .then(data => 
    {
        let cantidad =  data.length;
        totalencontrado.innerHTML = cantidad + " registros encontrados";

        if(cantidad > 0 && data != "consultavacia")
        {
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                let toPropuestas = new Object();
                toPropuestas.idafiliacion       = data[a].idafiliacion;
                toPropuestas.numeroafiliado     = data[a].numeroafiliado;
                toPropuestas.usuario            = data[a].usuario;
                toPropuestas.nombres            = data[a].nombres;
                toPropuestas.apellidos          = data[a].apellidos;
                toPropuestas.genero             = data[a].genero;
                toPropuestas.fechanacimiento    = data[a].fechanacimiento;
                toPropuestas.email              = data[a].email;
                toPropuestas.codigoestado       = data[a].codigoestado;
                toPropuestas.nombreestado       = data[a].nombreestado;
                toPropuestas.direccion          = data[a].direccion;

                let linkeadowhatsapp            =data[a].whatsapp;
                linkeadowhatsapp=linkeadowhatsapp.trim().replace('+', '');
                linkeadowhatsapp=linkeadowhatsapp.trim().replace('-', '');
                linkeadowhatsapp=linkeadowhatsapp.trim().replace('(', '');
                linkeadowhatsapp=linkeadowhatsapp.trim().replace(')', '');
                toPropuestas.whatsapp   = linkeadowhatsapp;
                
                toPropuestas.nombresangre           = data[a].nombresangre;
                toPropuestas.nombreespecialidad     = data[a].nombreespecialidad;
                toPropuestas.enfermedadcronica      = data[a].enfermedadcronica;
                toPropuestas.nombretalla            = data[a].nombretalla;
                toPropuestas.fotoatleta             = data[a].fotoatleta;
                toPropuestas.fotodocumento          = data[a].fotodocumento;
                toPropuestas.fotopago               = data[a].fotopago;
                toPropuestas.fechapago              = data[a].fechapago;
                toPropuestas.fechainscripcion       = data[a].fechainscripcion;
                toPropuestas.aprobado               = data[a].aprobado;
                toPropuestas.desactivado            = data[a].desactivado;

                arreglo.push(toPropuestas);
            }
        }
        espera.style.visibility = "hidden";

        
        LlenarTabla(arreglo);
    })
    .catch(function(error){
        console.log(error);
        espera.style.visibility = "hidden";
    });
    
});

