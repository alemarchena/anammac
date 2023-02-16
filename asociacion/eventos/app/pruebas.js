import {LimpiarEventoConPruebas,LlenarEventoConPruebas,LlenarTablaEventos,LimpiarTEventos,LlenarTablaPruebas,LimpiarTPruebas,LlenarTablaDetallePrueba,LimpiarTPDetalle,LlenarTablaPruebasEvento,LimpiarTPEvento} from './tablapruebas.js?a=8'
import {ShowMessage} from './showmessage.js?a=8'
import {NewOpcion,ClearSelect} from './select.js?a=8';
    
const codigoprueba          = document.getElementById('codigoprueba');
const codigoevento          = document.getElementById('codigoevento');
const codigoeventopagado          = document.getElementById('codigoeventopagado');

const idpruebaauto          = document.getElementById('idpruebaauto');
const nombreprueba          = document.getElementById('nombreprueba');
const guardarnombreprueba   = document.getElementById('guardarnombreprueba');
const ordenprueba           = document.getElementById('ordenprueba');
const verpruebas            = document.getElementById('verpruebas');
const nuevaprueba           = document.getElementById('nuevaprueba');

const idpruebaautodetalle   = document.getElementById('idpruebaautodetalle');
const nombredetalle         = document.getElementById('nombredetalle');
const guardarnombredetalle  = document.getElementById('guardarnombredetalle');
const ordenpruebadetalle           = document.getElementById('ordenpruebadetalle');
const verdetalle            = document.getElementById('verdetalle');
const nuevapruebadetalle    = document.getElementById('nuevapruebadetalle');

const fechaeventog          = document.getElementById('fechaeventog');
const horaeventog           = document.getElementById('horaeventog');
const nombreeventog         = document.getElementById('nombreeventog');
const descripcioneventog    = document.getElementById('descripcioneventog');
const whatsappg             = document.getElementById('whatsappg');
const guardarevento         = document.getElementById('guardarevento');
const verpruebasevento      = document.getElementById('verpruebasevento');
const vereventos            = document.getElementById('vereventos');

const vereventoconpruebas   = document.getElementById('vereventoconpruebas');

const nuevoevento           = document.getElementById('nuevoevento');
const ideventoauto          = document.getElementById('ideventoauto');
const cantidadpruebasbase   = document.getElementById('cantidadpruebasbase');
const costopruebabase       = document.getElementById('costopruebabase');
const costopruebaextra      = document.getElementById('costopruebaextra');

const costomenores          = document.getElementById('costomenores');
const edadmaximamenor       = document.getElementById('edadmaximamenor');
const costopruebacombinada  = document.getElementById('costopruebacombinada');

const costopruebabasedolar       = document.getElementById('costopruebabasedolar');
const costopruebaextradolar      = document.getElementById('costopruebaextradolar');
const costopruebacombinadadolar  = document.getElementById('costopruebacombinadadolar');

nuevoevento.addEventListener('click',(e)=>{
    e.preventDefault();

    NuevoEvento();
    ShowMessage("Completa al menos los campos con * ","success",3000);
})

nuevaprueba.addEventListener('click',(e)=>{
    e.preventDefault();

    NuevaPrueba();
    
})

nuevapruebadetalle.addEventListener('click',(e)=>{
    e.preventDefault();

    NuevaPruebaDetalle();
    
})

verpruebas.addEventListener('click',(e)=>{
    e.preventDefault();

    BuscarPruebas();
})

verdetalle.addEventListener('click',(e)=>{
    e.preventDefault();

    if(codigoprueba.value == 0)
        ShowMessage("Seleccione una prueba","error",3000);
    else
        BuscarDetallePrueba();
})

verpruebasevento.addEventListener('click',(e)=>{
    e.preventDefault();

    BuscarPruebasEvento();
})

vereventoconpruebas.addEventListener('click',(e)=>{
    e.preventDefault();
    
    if(codigoevento.value == 0)
        ShowMessage("Seleccione un evento","error",3000);
    else
        BuscarEventoConPruebas();
})

vereventos.addEventListener('click',(e)=>{
    e.preventDefault();

    BuscarEventos();
})

guardarnombreprueba.addEventListener('click',()=>{
    
    if(nombreprueba.value == '')
    {
        ShowMessage("Escriba un nombre","error",3000);
    }
    else
        GuardarPrueba();
})

guardarnombredetalle.addEventListener('click',()=>{
    if(codigoprueba.value == 0)
    {
        ShowMessage("Seleccione una prueba","error",3000);
    }
    else{
        if(nombredetalle.value == '')
        {
            ShowMessage("Ingrese el detalle de la prueba","error",3000);
        }else if(idpruebaautodetalle.value == '')
        {
            GuardarPruebaDetalle();
        }
    }
})

guardarevento.addEventListener('click',()=>{

    let te = false;

    if(fechaeventog.value == '')
    {
        te = true;
        ShowMessage("Selecciona una fecha para el evento","error",3000);
    }

    if(horaeventog.value == '' && !te)
    {
        te = true;
        ShowMessage("Selecciona una hora para el evento","error",3000);
    }
    
    if(nombreeventog.value == '' && !te)
    {
        te = true;
        ShowMessage("Indique un nombre para el evento","error",3000);
    }

    if(descripcioneventog.value == '' && !te)
    {
        te = true;
        ShowMessage("Indique una descripción para el evento","error",3000);
    }

    if(cantidadpruebasbase.value == '' && !te)
    {
        te = true;
        ShowMessage("Indique la cantidad de pruebas base","error",3000);
    }
    if(costopruebabase.value == '' && !te)
    {
        te = true;
        ShowMessage("Indique el precio del total de las pruebas base","error",3000);
    }

    if(costopruebaextra.value       == '' && !te) costopruebaextra.value = 0;
    if(costomenores.value           == '' && !te) costomenores.value = 0;
    if(edadmaximamenor.value        == '' && !te) edadmaximamenor.value = 0;
    if(costopruebacombinada.value   == '' && !te) costopruebacombinada.value = 0;

    if(!te)
    {
        if(ideventoauto.value == '')
            GuardarEvento();
    }
})

// ------------------------ Busquedas ----------------------------


export const BuscarPruebas = (()=>{
   
    let publicacionlistaPruebas = {
        tabla : "apt_pruebas",
    }

    let arreglo = [];

    fetch("./controladores/leer.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaPruebas ),headers:{'Content-Type':'application/json'}})   

    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                let item = new Object();
                item.codigoprueba   = data[a].codigoprueba;
                item.nombreprueba   = data[a].nombreprueba;
                item.ordenprueba    = data[a].ordenprueba;
                item.escombinada    = data[a].escombinada;

                arreglo.push(item);
            }

            LlenarTablaPruebas(arreglo);
        }else
        {
            arreglo = [];
            LimpiarTPruebas();
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });

})


export const BuscarDetallePrueba = (()=>{
    
    let publicacionlistaPruebas = {
        codigoprueba : codigoprueba.value,
    }
    
    let arreglodetalle = [];

    fetch("./controladores/leerpruebas.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaPruebas ),headers:{'Content-Type':'application/json'}})   

    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                let item = new Object();
                item.codigoprueba       = data[a].codigoprueba;
                item.nombreprueba       = data[a].nombreprueba;
                item.codigodetalle      = data[a].codigodetalle;
                item.nombredetalle      = data[a].nombredetalle;
                item.ordenpruebadetalle = data[a].ordenpruebadetalle;

                arreglodetalle.push(item);
            }

            LlenarTablaDetallePrueba(arreglodetalle);
        }else
        {
            arreglodetalle = [];
            LimpiarTPDetalle();
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });

})


export const BuscarPruebasEvento = (()=>{
   
    let publicacionlistaPruebas = {
        codigoprueba : 0,
    }

    let arreglopruebaevento = [];

    fetch("./controladores/leerpruebas.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaPruebas ),headers:{'Content-Type':'application/json'}})   

    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                let item = new Object();
                item.codigoprueba = data[a].codigoprueba;
                item.nombreprueba = data[a].nombreprueba;
                item.codigodetalle = data[a].codigodetalle;
                item.nombredetalle = data[a].nombredetalle;

                arreglopruebaevento.push(item);
            }
            LlenarTablaPruebasEvento(arreglopruebaevento);
        }else
        {
            LimpiarTPEvento();
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });

})


export const BuscarEventos = (()=>{
   

    let publicacionlistaPruebas = {
        codigoevento : 0,
    }

    let arregloeventos = [];

    fetch("./controladores/leereventos.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaPruebas ),headers:{'Content-Type':'application/json'}})   

    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                let item = new Object();
                item.idevento           = data[a].idevento;
                item.nombre             = data[a].nombre;
                item.descripcion        = data[a].descripcion;
                item.fecha              = data[a].fecha;
                item.hora               = data[a].hora;
                item.imagen             = data[a].imagen;
                item.archivocondiciones = data[a].archivocondiciones;
                item.whatsapp           = data[a].whatsapp;

                item.cantidadpruebasbase    = data[a].cantidadpruebasbase;
                item.costopruebabase        = data[a].costopruebabase;
                item.costopruebaextra       = data[a].costopruebaextra;
                item.costomenores           = data[a].costomenores;
                item.edadmaximamenor        = data[a].edadmaximamenor;
                item.costopruebacombinada   = data[a].costopruebacombinada;

                item.costopruebabasedolar     = data[a].costopruebabasedolar;
                item.costopruebaextradolar    = data[a].costopruebaextradolar;
                item.costopruebacombinadadolar= data[a].costopruebacombinadadolar;

                item.activo= data[a].activo;

                arregloeventos.push(item);

            }

            LlenarTablaEventos(arregloeventos);
        }else
        {
            LimpiarTEventos();
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });

})

export const BuscarEventoConPruebas = (()=>{
   
    let publicacionEventoConPruebas = {
        codigoevento : 0,
    }

    let arregloeventoconpruebas = [];

    fetch("./controladores/leereventoconpruebas.php?a=1",{method:'POST',body: JSON.stringify( publicacionEventoConPruebas ),headers:{'Content-Type':'application/json'}})   

    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                let item = new Object();
                item.idevento           = data[a].idevento;
                item.ideventoprueba     = data[a].ideventoprueba;
                item.nombre             = data[a].nombre;
                item.nombreprueba       = data[a].nombreprueba;
                item.nombredetalle      = data[a].nombredetalle;

                arregloeventoconpruebas.push(item);
            }

            LlenarEventoConPruebas(arregloeventoconpruebas);
        }else
        {
            LimpiarEventoConPruebas();
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });

})

// ------------------------ Guardado ----------------------------
export const GuardarPrueba = (()=>{

    let publicacion = {
        nombreprueba    : nombreprueba.value,
        ordenprueba     : ordenprueba.value,
        
    }

    fetch("./controladores/guardarprueba.php?a=1",{method:'POST',body: JSON.stringify( publicacion ),headers:{'Content-Type':'application/json'}})   
    .then(response => response.json())
    .then(function(data){
        if(data>0){
            ShowMessage('Guardado..','success',3000);
            BuscarPruebas();
            nombreprueba.value = '';
            ClearSelect("codigoprueba");
            ClearSelect("codigopruebaevento");
            ListaPruebas();
            
        }
    })
    .catch(function (error){
        console.log(error);
    });
})

export const GuardarPruebaDetalle = (()=>{

    let publicacion = {
        codigoprueba : codigoprueba.value,
        nombredetalle : nombredetalle.value,
        ordenpruebadetalle : ordenpruebadetalle.value,

    }

    fetch("./controladores/guardarpruebadetalle.php?a=1",{method:'POST',body: JSON.stringify( publicacion ),headers:{'Content-Type':'application/json'}})   
    .then(response => response.json())
    .then(function(data){
        if(data>0){
            ShowMessage('Guardado..','success',3000);
            BuscarDetallePrueba();
            nombredetalle.value = '';
        }
    })
    .catch(function (error){
        console.log(error);
    });
})

export const GuardarEvento = (()=>{

    let publicacion = {
        fechaevento         : fechaeventog.value,
        horaevento          : horaeventog.value,
        nombreevento        : nombreeventog.value,
        descripcionevento   : descripcioneventog.value,
        whatsapp            : whatsappg.value,

        cantidadpruebasbase : cantidadpruebasbase.value,
        costopruebabase     : costopruebabase.value,
        costopruebaextra    : costopruebaextra.value,

        costomenores        : costomenores.value,
        edadmaximamenor     : edadmaximamenor.value,
        costopruebacombinada: costopruebacombinada.value,
        
        costopruebabasedolar     : costopruebabasedolar.value,
        costopruebaextradolar    : costopruebaextradolar.value,
        costopruebacombinadadolar: costopruebacombinadadolar.value,
        activo: 0,
    }

    fetch("./controladores/guardarevento.php?a=1",{method:'POST',body: JSON.stringify( publicacion ),headers:{'Content-Type':'application/json'}})   
    .then(response => response.json())
    .then(function(data){
        if(data>0){
            ShowMessage('Guardado..','success',3000);
            BuscarEventos();
            ClearSelect("codigoevento");
            ListaEventos();
            fechaeventog.value = '';
            horaeventog.value = '';
            nombreeventog.value = '';
            descripcioneventog.value = '';

            cantidadpruebasbase.value = '';
            costopruebabase.value = '';
            costopruebaextra.value = '';

            costomenores.value = '';
            edadmaximamenor.value = '';
            costopruebacombinada.value = '';

        }
    })
    .catch(function (error){
        console.log(error);
    });
})

export const GuardarEventoPrueba = ((codigoevento,codigoprueba,codigodetalle)=>{

    let publicacion = {
        codigoevento:codigoevento,
        codigoprueba:codigoprueba,
        codigodetalle:codigodetalle
    }

    fetch("./controladores/buscaeventoprueba.php?a=1",{method:'POST',body: JSON.stringify( publicacion ),headers:{'Content-Type':'application/json'}})   
    .then(response => response.json())
    .then(function(data){
        
        if(data=="consultavacia"){
            //    ------------------------------
            fetch("./controladores/guardareventoprueba.php?a=1",{method:'POST',body: JSON.stringify( publicacion ),headers:{'Content-Type':'application/json'}})   
            .then(response => response.json())
            .then(function(data){
                if(data>0){
                    LimpiarEventoConPruebas();
                    setTimeout(() => {
                        BuscarEventoConPruebas();
                    }, 150);
                    ShowMessage('Agregado..','success',1000);
                }
            })
            .catch(function (error){
                console.log(error);
            });
            // ------------------------------------
        }else
        {
            ShowMessage("Ya se encuentra en el evento","error",2000);
        }
    })
    .catch(function (error){
        console.log(error);
    });

        
})

export const VerCamposEvento = ((arreglo)=>{

    LimpiarTEventos();

    ideventoauto.value          = arreglo.idevento;
    fechaeventog.value          = arreglo.fecha;
    horaeventog.value           = arreglo.hora;
    nombreeventog.value         = arreglo.nombre;
    descripcioneventog.value    = arreglo.descripcion;
    whatsappg.value             = arreglo.whatsapp;
    cantidadpruebasbase.value   = arreglo.cantidadpruebasbase;
    costopruebabase.value       = arreglo.costopruebabase;
    costopruebaextra.value      = arreglo.costopruebaextra;
    costomenores.value          = arreglo.costomenores;
    edadmaximamenor.value       = arreglo.edadmaximamenor;
    costopruebacombinada.value  = arreglo.costopruebacombinada;
    
    costopruebabasedolar.value       = arreglo.costopruebabasedolar;
    costopruebaextradolar.value      = arreglo.costopruebaextradolar;
    costopruebacombinadadolar.value  = arreglo.costopruebacombinadadolar;

})

export const VerCamposPrueba = ((arreglo)=>{
    idpruebaauto.value = arreglo.codigoprueba;
    nombreprueba.value = arreglo.nombreprueba;
    ordenprueba.value  = arreglo.ordenprueba;
})

export const VerCamposPruebaDetalle = ((arreglo)=>{

    idpruebaautodetalle.value = arreglo.codigodetalle;
    nombredetalle.value = arreglo.nombredetalle;
    ordenpruebadetalle.value  = arreglo.ordenpruebadetalle;
})

export const NuevoEvento = (()=>{

    ideventoauto.value              = '';
    fechaeventog.value              = '';
    horaeventog.value               = '';
    nombreeventog.value             = '';
    descripcioneventog.value        = '';
    whatsappg.value                 = '';
    cantidadpruebasbase.value       = '';
    costopruebabase.value           = '';
    costopruebaextra.value          = '';
    costomenores.value              = '';
    edadmaximamenor.value           = '';
    costopruebacombinada.value      = '';
    costopruebabasedolar.value      = '';
    costopruebaextradolar.value     = '';
    costopruebacombinadadolar.value = '';
})

export const NuevaPrueba = (()=>{

    idpruebaauto.value              = '';
    nombreprueba.value              = '';
    ordenprueba.value               = '';
    
})

export const NuevaPruebaDetalle = (()=>{

    idpruebaautodetalle.value              = '';
    nombredetalle.value              = '';
    ordenpruebadetalle.value               = '';
    
})
// ------------------------ Listar ----------------------------

export function ListaPruebas() 
{
    NewOpcion(codigoprueba,'0','Seleccione una prueba');

    let publicacionlistaPruebas = {
        tabla : "apt_pruebas",
    }
    
    fetch("./controladores/leer.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaPruebas ),headers:{'Content-Type':'application/json'}})   
    
    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                NewOpcion(codigoprueba,data[a].codigoprueba,data[a].nombreprueba);
            }
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });
}

export function ListaEventos() 
{
    NewOpcion(codigoevento,'0','Seleccione un evento');
    NewOpcion(codigoeventopagado,'0','Seleccione un evento');

    let publicacionlistaEventos = {
        tabla : "apt_eventos",
    }
    
    fetch("./controladores/leer.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaEventos ),headers:{'Content-Type':'application/json'}})   
    
    .then(response => response.json())
    .then(function(data){
        let cantidad = Object.keys(data).length;
        if(cantidad>0){
            for(let a = 0 ;a<cantidad;a++) //llenar la lista
            {
                NewOpcion(codigoevento,data[a].idevento,data[a].nombre);
                NewOpcion(codigoeventopagado,data[a].idevento,data[a].nombre);
            }
        }
    })
    .catch(function (error){
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });
}

ListaPruebas();
ListaEventos();