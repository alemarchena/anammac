import {ShowMessage} from './showmessage.js'
import {Info} from './formulario.js'
import {ConvierteaDMA} from './clases.js'
let reeventos           = document.getElementById('resultadoseventos');
let reeventoconpruebas  = document.getElementById('resultadoeventoconpruebas');
let eventosdisponibles  = document.getElementById('eventosdisponibles');
let misinscripciones    = document.getElementById('misinscripciones');
let divtotal               = document.getElementById('divtotal');
let labeltotal             = document.getElementById('labeltotal');
let labeltotaldolar             = document.getElementById('labeltotaldolar');

misinscripciones.addEventListener('click',(e)=>{
e.preventDefault();
alert("Ver mis inscripciones")
})

eventosdisponibles.addEventListener('click',(e)=>{
    e.preventDefault();
    BuscarEventos(Info);
})

export const BuscarEventos = ((info)=>{
   
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
                item.fecha              = ConvierteaDMA(data[a].fecha);
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
            ActivarTotal(0);
            
            LimpiarEventoConPruebas();
            LlenarTablaEventos(arregloeventos,info);
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

export const LlenarTablaEventos = ((arregloeventos,info) =>{

    LimpiarTEventos();

    console.log("Número de afiliado:" + info.numeroafiliado);
    // Crea un elemento <table> y un elemento <tbody>
    let tabla   = document.createElement("table");
    tabla.classList.add('table');
    tabla.classList.add('table-striped');
    tabla.style ="overflow-x:auto;";
    tabla.style.backgroundColor ="white";
      let tblBody = document.createElement("tbody");
  
      for (let i = -1; i < arregloeventos.length; i++) {
  
        if(i==-1)
        {
            // Crea las hileras de la tabla
            let hilera = document.createElement("tr");

            let columna1 = document.createElement("th");let columna2 = document.createElement("th");
            let columna3 = document.createElement("th");let columna4 = document.createElement("th");
            let columna5 = document.createElement("th");let columna6 = document.createElement("th");
            let columna7 = document.createElement("th");let columna8 = document.createElement("th");

            let celda1 = document.createElement("td");let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");let celda4 = document.createElement("td");
            let celda5 = document.createElement("td");let celda6 = document.createElement("td");
            let celda7 = document.createElement("td");let celda8 = document.createElement("td");

            let enca1 = document.createTextNode('Código evento'); 
            celda1.appendChild(enca1); columna1.appendChild(celda1);

            let enca2 = document.createTextNode('Nombre');
            celda2.appendChild(enca2); columna2.appendChild(celda2);

            let enca3 = document.createTextNode('descripcion');
            celda3.appendChild(enca3); columna3.appendChild(celda3);
            
            let enca4 = document.createTextNode('fecha');
            celda4.appendChild(enca4); columna4.appendChild(celda4);

            let enca5 = document.createTextNode('hora');
            celda5.appendChild(enca5); columna5.appendChild(celda5);

            let enca6 = document.createTextNode('Whatsapp');
            celda6.appendChild(enca6); columna6.appendChild(celda6);

            let enca7 = document.createTextNode('');
            celda7.appendChild(enca7); columna7.appendChild(celda7);

            let enca8 = document.createTextNode('');
            celda8.appendChild(enca8); columna8.appendChild(celda8);



            hilera.appendChild(columna1);        hilera.appendChild(columna2);
            hilera.appendChild(columna3);        hilera.appendChild(columna4);
            hilera.appendChild(columna5);        hilera.appendChild(columna6);
            hilera.appendChild(columna7);        hilera.appendChild(columna8);

            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }else{
  
        // Crea las hileras de la tabla
            let hilera = document.createElement("tr");

            let columna1 = document.createElement("th");let columna2 = document.createElement("th");
            let columna3 = document.createElement("th");let columna4 = document.createElement("th");
            let columna5 = document.createElement("th");let columna6 = document.createElement("th");
            let columna7 = document.createElement("th");let columna8 = document.createElement("th");

            let celda1 = document.createElement("td");let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");let celda4 = document.createElement("td");
            let celda5 = document.createElement("td");let celda6 = document.createElement("td");
            let celda7 = document.createElement("td");let celda8 = document.createElement("td");
            

            let idevento = document.createTextNode(arregloeventos[i].idevento);
            idevento.id = "idprueba" + arregloeventos[i].idevento;
            celda1.appendChild(idevento);        
            celda1.id= "celdanu" + arregloeventos[i].idevento;
            columna1.appendChild(celda1);

            let nombre = document.createTextNode(arregloeventos[i].nombre);
            nombre.id = "nombre" + arregloeventos[i].nombre;
            celda2.appendChild(nombre); columna2.appendChild(celda2);

            let descripcion = document.createTextNode(arregloeventos[i].descripcion);
            descripcion.id = "descripcion" + arregloeventos[i].descripcion;
            celda3.appendChild(descripcion); columna3.appendChild(celda3);

            let fecha = document.createTextNode(arregloeventos[i].fecha);
            fecha.id = "fecha" + arregloeventos[i].fecha;
            celda4.appendChild(fecha); columna4.appendChild(celda4);

            let hora = document.createTextNode(arregloeventos[i].hora);
            hora.id = "hora" + arregloeventos[i].hora;
            celda5.appendChild(hora); columna5.appendChild(celda5);

            let whatsapp = document.createTextNode(arregloeventos[i].whatsapp);
            whatsapp.id = "whatsapp" + arregloeventos[i].whatsapp;
            celda6.appendChild(whatsapp); columna6.appendChild(celda6);

            //Ver pruebas del evento
            let botonverpruebas = document.createElement("button");
            botonverpruebas.id = "VerEvento" + arregloeventos[i].idevento;
            botonverpruebas.innerHTML = "Ver pruebas <span class='material-icons'>visibility</span>";
            botonverpruebas.classList.add("btn");
            botonverpruebas.classList.add("btn-info");
            botonverpruebas.classList.add("btn-list");
            
            botonverpruebas.onclick = (e)=>{
            e.preventDefault();
                VerEvento(e.target.id,arregloeventos);
            }
            celda7.appendChild(botonverpruebas); columna7.appendChild(celda7);

            //Descargar condiciones
            let botonactivacion = document.createElement("button");
            botonactivacion.id = "DescargarCondiciones" + arregloeventos[i].idevento;
            botonactivacion.classList.add("btn");
            botonactivacion.classList.add("btn-success");
            botonactivacion.classList.add("btn-list");

            botonactivacion.innerHTML = "Descargar condiciones <span class='material-icons'>download</span>";
            botonactivacion.onclick = (e)=>{
                e.preventDefault();
                Descargar(e.target.id,arregloeventos);
            }
            celda8.appendChild(botonactivacion); columna8.appendChild(celda8);

            hilera.appendChild(columna1);        
            hilera.appendChild(columna2);
            hilera.appendChild(columna3);       
            hilera.appendChild(columna4);       
            hilera.appendChild(columna5);       
            hilera.appendChild(columna6);       
            hilera.appendChild(columna7);       
            hilera.appendChild(columna8);       
            
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }
      }
      
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      reeventos.appendChild(tabla);
      
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");
  
});

export function LimpiarTEventos()
{
  reeventos.classList.add('table-responsive');
    while(reeventos.firstChild){reeventos.removeChild(reeventos.firstChild);} 
}

export const VerEvento = (async (id,arreglo)=>{
    let idpuro = id.replace('VerEvento','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idevento == idpuro)
        {
            LimpiarLabel();
            BuscarEventoConPruebas(arreglo[i]);
            ActivarTotal(1);
        }
    }
  });

  const ActivarTotal = ((valor)=>{
    if(valor==1)
        divtotal.style.display = "block";
    else
        divtotal.style.display = "none";

  })
  export const BuscarEventoConPruebas = ((codigoevento)=>{
   
    let publicacionEventoConPruebas = {
        codigoevento : codigoevento.idevento,
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
                item.codigodetalle      = data[a].codigodetalle;

                item.cantidadpruebasbase    = data[a].cantidadpruebasbase;
                item.costopruebabase        = data[a].costopruebabase;
                item.costopruebabasedolar   = data[a].costopruebabasedolar;
                
                item.costopruebaextra        = data[a].costopruebaextra;
                item.costopruebaextradolar        = data[a].costopruebaextradolar;

                item.costopruebacombinada        = data[a].costopruebacombinada;
                item.costopruebacombinadadolar        = data[a].costopruebacombinadadolar;

                item.costomenores        = data[a].costomenores;
                item.edadmaximamenor        = data[a].edadmaximamenor;

                item.escombinada        = data[a].escombinada;



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

export const LlenarEventoConPruebas = ((arregloeventoconpruebas) =>{

    LimpiarEventoConPruebas();

      // Crea un elemento <table> y un elemento <tbody>
      let tabla   = document.createElement("table");
      tabla.classList.add('table');
      tabla.classList.add('table-striped');
      tabla.style ="overflow-x:auto;";
      tabla.style.backgroundColor = "white";

      let tblBody = document.createElement("tbody");

      for (let i = -1; i < arregloeventoconpruebas.length; i++) {

        if(i==-1)
        {
          // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");   
          columna1.style = "text-align: -webkit-right;"

          let columna2 = document.createElement("th");


          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");


          let enca1 = document.createTextNode('Prueba'); celda1.appendChild(enca1); columna1.appendChild(celda1);
          let enca2 = document.createTextNode('Agregue las pruebas que desea');celda2.appendChild(enca2); columna2.appendChild(celda2);


          hilera.appendChild(columna1);        hilera.appendChild(columna2);          

          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }else{

        // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th"); 
          columna1.style = "text-align: -webkit-right;"
                 
          let columna2 = document.createElement("th");

          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");

          let nombreprueba = document.createTextNode(arregloeventoconpruebas[i].nombreprueba);
          nombreprueba.id = "nombreprueba" + arregloeventoconpruebas[i].nombreprueba;
          if(arregloeventoconpruebas[i].escombinada == 1)
            celda1.style.color = "red";

          celda1.appendChild(nombreprueba);        
          columna1.appendChild(celda1);

           //Seleccionar/Deseleccionar una prueba
           let botonagregareventop = document.createElement("button");
           botonagregareventop.id = "SeleccionPrueba" + arregloeventoconpruebas[i].ideventoprueba;
           botonagregareventop.innerHTML = "Agregar " + arregloeventoconpruebas[i].nombredetalle;
           botonagregareventop.classList.add("btn");
           botonagregareventop.classList.add("btn-success");
           botonagregareventop.classList.add("btn-list");
           
           botonagregareventop.onclick = (e)=>{
             e.preventDefault();
             SeleccionPrueba(e.target.id,arregloeventoconpruebas);
           }
          celda2.appendChild(botonagregareventop);        
          columna2.appendChild(celda2);


          hilera.appendChild(columna1);        
          hilera.appendChild(columna2);
          
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }
        
      }
    
      
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      reeventoconpruebas.appendChild(tabla);
      
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");

  });

  export function LimpiarEventoConPruebas()
{
  reeventoconpruebas.classList.add('table-responsive');
    while(reeventoconpruebas.firstChild){reeventoconpruebas.removeChild(reeventoconpruebas.firstChild);} 

    LimpiarLabel();
    LimpiarArregloCalculadora();
}

let arreglocalculadora = [];

export const SeleccionPrueba = (async (id,arreglo)=>{
      let idpuro = id.replace('SeleccionPrueba','');

      for (let i = 0; i < arreglo.length; i++) {
          if(arreglo[i].ideventoprueba == idpuro)
          {
              //   GuardarEventoPrueba( codigoevento.value,arreglo[i].codigoprueba,arreglo[i].codigodetalle );
            let botonelegido = document.getElementById(id);
            if(botonelegido.classList.contains("btn-success")){
                botonelegido.classList.replace("btn-success","btn-warning");

                arreglocalculadora.push(arreglo[i]);
                Calculadora();

            }
            else
            {
                botonelegido.classList.replace("btn-warning","btn-success");
                let arreglotemporal = [];
                for(let b=0;b<arreglocalculadora.length;b++)
                {

                    if(arreglocalculadora[b].ideventoprueba !=  arreglo[i].ideventoprueba)
                    {
                        arreglotemporal.push(arreglocalculadora[b]);
                    }
                }

                arreglocalculadora = [...arreglotemporal];

                Calculadora();
            }

          }
      }
  });

export const Calculadora = (()=>{
    let contadorbase=0;
    let contadorextra=0;
    let contadorcombinada=0;

    let totalgeneral =0;
    let totalbase = 0;

    let totalgeneraldolar =0;
    let totalbasedolar = 0;

    for(let a=0;a<arreglocalculadora.length;a++)
    {
        if(arreglocalculadora[a].escombinada == 0)
        {
            contadorbase +=1;
        }else
        {
            contadorcombinada +=1;
        }
    }

    if(contadorbase > 0 || contadorcombinada > 0 )
    {
        if(contadorbase > arreglocalculadora[0].cantidadpruebasbase)
        {
            contadorextra = contadorbase - arreglocalculadora[0].cantidadpruebasbase;
        }

        if(contadorbase>0){

            totalbase = parseInt(arreglocalculadora[0].costopruebabase);
            totalbasedolar = parseInt(arreglocalculadora[0].costopruebabasedolar);
        }
        
        totalgeneral = totalbase + 
        parseInt(contadorextra * arreglocalculadora[0].costopruebaextra) +
        parseInt(contadorcombinada * arreglocalculadora[0].costopruebacombinada);

        totalgeneraldolar= totalbasedolar + 
        parseInt(contadorextra * arreglocalculadora[0].costopruebaextradolar) +
        parseInt(contadorcombinada * arreglocalculadora[0].costopruebacombinadadolar);

        console.log(totalgeneral)
    }      

    labeltotal.innerHTML = "TOTAL $ " + totalgeneral;
    labeltotaldolar.innerHTML = "TOTAL U$S " + totalgeneraldolar;
})

const LimpiarLabel = (()=>{
    labeltotal.innerHTML = "TOTAL $ 0";
    labeltotaldolar.innerHTML = "TOTAL U$S 0";
})

const LimpiarArregloCalculadora = (()=>{
    arreglocalculadora = [];
})