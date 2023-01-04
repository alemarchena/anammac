import {LlenarTabla,Limpiar} from './tabla.js?a=12'
import {ShowMessage} from './showmessage.js?a=12'

const buscado           = document.getElementById('buscado');
const espera            = document.getElementById("espera");
const buscar            = document.getElementById("buscar");
const buscarreciente    = document.getElementById("buscarreciente");
const buscaraprobados   = document.getElementById("buscaraprobados");
const buscardesaprobados= document.getElementById("buscardesaprobados");
const totalencontrado= document.getElementById("totalencontrado");

buscar.addEventListener('click',()=>{
    Listar(0);
})


buscaraprobados.addEventListener('click',()=>{
    Listar(1);
})

buscardesaprobados.addEventListener('click',()=>{
    Listar(2);
})

buscarreciente.addEventListener('click',()=>{
    Listar(3);
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
            arreglopalabrasprocesadas.push(itempalabra);
        }
        paqueteJsonBuscarprocesadas =JSON.stringify( arreglopalabrasprocesadas );


        fetch("./controladores/buscar.php?a=3",{method:'POST',body:paqueteJsonBuscarprocesadas,headers:{'Content-Type':'application/json'}})   
        .then(response => response.json())
        .then(data => 
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
                    toPropuestas.usuario            = data[a].usuario;
                    toPropuestas.nombres            = data[a].nombres;
                    toPropuestas.apellidos          = data[a].apellidos;
                    toPropuestas.genero             = data[a].genero;
                    toPropuestas.fechanacimiento    = data[a].fechanacimiento;
                    toPropuestas.email              = data[a].email;
                    toPropuestas.codigoestado       = data[a].codigoestado;
                    toPropuestas.nombreestado       = data[a].nombreestado;
                    toPropuestas.direccion          = data[a].direccion;

                    let linkeadowhatsapp        =data[a].whatsapp;
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
            ShowMessage("Hubo un error al consultar a la base de datos.","error",3000);
            
            console.log(error);
            espera.style.visibility = "hidden";
        });
    }
});

