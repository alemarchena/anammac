import {ShowMessage} from './showmessage.js'
import {ConvierteaDMA} from './clases.js'

let reeventos           = document.getElementById('resultadoseventos');
let reeventoconpruebas  = document.getElementById('resultadoeventoconpruebas');
let eventosdisponibles  = document.getElementById('eventosdisponibles');

let divtotal            = document.getElementById('divtotal');
let labeltotal          = document.getElementById('labeltotal');
let labeltotaldolar     = document.getElementById('labeltotaldolar');
let descripcionevento   = document.getElementById('descripcionevento');
let numeroafiliado      = document.getElementById('numeroafiliado');


eventosdisponibles.addEventListener('click',(e)=>{
    e.preventDefault();
    BuscarEventos(numeroafiliado.value);
   
})

export const BuscarEventos = ((numeroafiliado)=>{
   
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
            LimpiarTotal();
            ActivarTotal(0);
            LimpiarDescripcion();
            LimpiarEventoConPruebas();
            LlenarTablaEventos(arregloeventos,numeroafiliado);
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

export const LlenarTablaEventos = ((arregloeventos,numeroafiliado) =>{

    LimpiarTEventos();

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
            let columna7 = document.createElement("th");

            let celda1 = document.createElement("td");let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");let celda4 = document.createElement("td");
            let celda5 = document.createElement("td");let celda6 = document.createElement("td");
            let celda7 = document.createElement("td");

            let enca1 = document.createTextNode('Código evento'); 
            celda1.appendChild(enca1); columna1.appendChild(celda1);

            let enca2 = document.createTextNode('Nombre');
            celda2.appendChild(enca2); columna2.appendChild(celda2);

            let enca3 = document.createTextNode('fecha');
            celda3.appendChild(enca3); columna3.appendChild(celda3);
            
            let enca4 = document.createTextNode('hora');
            celda4.appendChild(enca4); columna4.appendChild(celda4);

            let enca5 = document.createTextNode('Whatsapp');
            celda5.appendChild(enca5); columna5.appendChild(celda5);

            let enca6 = document.createTextNode('');
            celda6.appendChild(enca6); columna6.appendChild(celda6);

            let enca7 = document.createTextNode('');
            celda7.appendChild(enca7); columna7.appendChild(celda7);


            hilera.appendChild(columna1);        hilera.appendChild(columna2);
            hilera.appendChild(columna3);        hilera.appendChild(columna4);
            hilera.appendChild(columna5);        hilera.appendChild(columna6);
            hilera.appendChild(columna7);        

            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }else{
  
        // Crea las hileras de la tabla
            let hilera = document.createElement("tr");

            let columna1 = document.createElement("th");let columna2 = document.createElement("th");
            let columna3 = document.createElement("th");let columna4 = document.createElement("th");
            let columna5 = document.createElement("th");let columna6 = document.createElement("th");
            let columna7 = document.createElement("th"); 

            let celda1 = document.createElement("td");let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");let celda4 = document.createElement("td");
            let celda5 = document.createElement("td");let celda6 = document.createElement("td");
            let celda7 = document.createElement("td");
            

            let idevento = document.createTextNode(arregloeventos[i].idevento);
            idevento.id = "idprueba" + arregloeventos[i].idevento;
            celda1.appendChild(idevento);        
            celda1.id= "celdanu" + arregloeventos[i].idevento;
            columna1.appendChild(celda1);

            let nombre = document.createTextNode(arregloeventos[i].nombre);
            nombre.id = "nombre" + arregloeventos[i].nombre;
            celda2.appendChild(nombre); columna2.appendChild(celda2);


            let fecha = document.createTextNode(arregloeventos[i].fecha);
            fecha.id = "fecha" + arregloeventos[i].fecha;
            celda3.appendChild(fecha); columna3.appendChild(celda3);

            let hora = document.createTextNode(arregloeventos[i].hora);
            hora.id = "hora" + arregloeventos[i].hora;
            celda4.appendChild(hora); columna4.appendChild(celda4);

            let whatsapp = document.createTextNode(arregloeventos[i].whatsapp);
            whatsapp.id = "whatsapp" + arregloeventos[i].whatsapp;
            celda5.appendChild(whatsapp); columna5.appendChild(celda5);

            //Ver pruebas del evento
            let botonverpruebas = document.createElement("button");
            botonverpruebas.id = "VerEvento" + arregloeventos[i].idevento;
            botonverpruebas.innerHTML = "Ver pruebas";
            botonverpruebas.classList.add("btn");
            botonverpruebas.classList.add("btn-info");
            botonverpruebas.classList.add("btn-list");
            
            botonverpruebas.onclick = (e)=>{
            e.preventDefault();
                VerEvento(e.target.id,arregloeventos,numeroafiliado);
            }
            celda6.appendChild(botonverpruebas); columna6.appendChild(celda6);

            //Descargar condiciones
            let botonpagar = document.createElement("button");
            botonpagar.id = "PagarEvento" + arregloeventos[i].idevento;
            botonpagar.classList.add("btn");
            botonpagar.classList.add("btn-success");
            botonpagar.classList.add("btn-list");
            botonpagar.innerHTML = "Pagar";
            botonpagar.onclick = (e)=>{
                e.preventDefault();
                PagarEvento(e.target.id,arregloeventos);
            }
            celda7.appendChild(botonpagar); columna7.appendChild(celda7);

            hilera.appendChild(columna1);        
            hilera.appendChild(columna2);
            hilera.appendChild(columna3);       
            hilera.appendChild(columna4);       
            hilera.appendChild(columna5);       
            hilera.appendChild(columna6);       
            hilera.appendChild(columna7);       
            
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

export const PagarEvento = (async (id,arreglo,numeroafiliado)=>{
    if(totalgeneral<=0)
    {
        ShowMessage("Verifique la cantidad de pruebas seleccionadas","success",2000);
    }else{
        let botonPagar = document.getElementById(id);
        
        let idpuro = id.replace('PagarEvento','');
        for (let i = 0; i < arreglo.length; i++) {
            if(arreglo[i].idevento == idpuro)
            {
                alert(totalgeneral);
                // BuscarEventoConPruebas(arreglo[i],numeroafiliado);
            }
        }
    }
});

export function LimpiarTEventos()
{
  reeventos.classList.add('table-responsive');
    while(reeventos.firstChild){reeventos.removeChild(reeventos.firstChild);} 
}


export const VerEvento = (async (id,arreglo,numeroafiliado)=>{
    let idpuro = id.replace('VerEvento','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idevento == idpuro)
        {
            MostrarDescripcionEvento(arreglo[i].descripcion);
            LimpiarLabel();
            BuscarEventoConPruebas(arreglo[i],numeroafiliado);
            ActivarTotal(1);
        }
    }
  });

  const MostrarDescripcionEvento = ((descripcion)=>{
    descripcionevento.innerHTML = descripcion;
  })

  const ActivarTotal = ((valor)=>{
    if(valor==1)
        divtotal.style.display = "block";
    else
        divtotal.style.display = "none";

  })
  export const BuscarEventoConPruebas = ((codigoevento,numeroafiliado)=>{
   
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
                item.codigoprueba       = data[a].codigoprueba;

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

            LlenarEventoConPruebas(arregloeventoconpruebas,numeroafiliado);
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

export const LlenarEventoConPruebas = ((arregloeventoconpruebas,numeroafiliado) =>{

    LimpiarEventoConPruebas();
    let idevento=0;
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

            idevento = arregloeventoconpruebas[i].idevento;

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
                SeleccionPrueba(e.target.id,arregloeventoconpruebas,numeroafiliado);
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

      ConsultarSeleccion(arregloeventoconpruebas,idevento,numeroafiliado);


  });

  export function LimpiarEventoConPruebas()
{
  reeventoconpruebas.classList.add('table-responsive');
    while(reeventoconpruebas.firstChild){reeventoconpruebas.removeChild(reeventoconpruebas.firstChild);} 

    LimpiarLabel();
    LimpiarArregloCalculadora();
}

let arreglocalculadora = [];

export const SeleccionPrueba = (async (id,arreglo,numeroafiliado)=>{
        let idpuro = id.replace('SeleccionPrueba','');

        for (let i = 0; i < arreglo.length; i++) {
          if(arreglo[i].ideventoprueba == idpuro)
          {
              //   GuardarEventoPrueba( codigoevento.value,arreglo[i].codigoprueba,arreglo[i].codigodetalle );
            let botonelegido = document.getElementById(id);
            if(botonelegido.classList.contains("btn-success")){
                botonelegido.classList.replace("btn-success","btn-warning");

                arreglocalculadora.push(arreglo[i]);
                GuardarSeleccion(arreglo[i],numeroafiliado);
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

                EliminarSeleccion(arreglo[i],numeroafiliado);

                Calculadora();
            }

          }
        } 
  });

let totalgeneral =0;

export const Calculadora = (()=>{
    let contadorbase=0;
    let contadorextra=0;
    let contadorcombinada=0;

    totalgeneral =0;
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

const LimpiarDescripcion = (()=>{
    descripcionevento.innerHTML = '';
})

const LimpiarTotal = (()=>{
    totalgeneral =0;
})
const ConsultarSeleccion = ((arregloeventoconpruebas,idevento,numeroafiliado)=>{

    let publicacion = {
        idevento : idevento,
        numeroafiliado : numeroafiliado,
    }
    fetch('./controladores/consultarseleccion.php?a=60',{
        method:'POST',
        body:JSON.stringify(publicacion),
        headers:{'Content-Type':'application/Json'}
    }).then(response=>{
        if(response.status == 200)
        {
            return response.json();
        }
    }).then(data=>{
        if(data.length>0)
        {
            data.forEach(element => {

                for (let i = 0; i < arregloeventoconpruebas.length; i++) {
                    if(arregloeventoconpruebas[i].ideventoprueba == element['ideventoprueba'])
                    {
                        let botonelegido = document.getElementById("SeleccionPrueba" + arregloeventoconpruebas[i].ideventoprueba);
                        botonelegido.classList.replace("btn-success","btn-warning");
                        arreglocalculadora.push(arregloeventoconpruebas[i]);
                        Calculadora();
                    }
                } 
            });
        }
    })
})


const GuardarSeleccion = ((arreglo,numeroafiliado)=>{

    let publicacion = {
        ideventoprueba : arreglo.ideventoprueba,
        codigodetalle : arreglo.codigodetalle,
        codigoprueba : arreglo.codigoprueba,
        idevento : arreglo.idevento,
        numeroafiliado : numeroafiliado,
    }
    fetch('./controladores/guardarseleccion.php?a=60',{
        method:'POST',
        body:JSON.stringify(publicacion),
        headers:{'Content-Type':'application/Json'}
    }).then(response=>{
        if(response.status == 200)
        {
            return response.text();
        }
    }).then(data=>{
        if(data)
            ShowMessage("Guardado","success",1000);
        else
            ShowMessage("Error al guardar","error",1000);

    })
})

const EliminarSeleccion = ((arreglo,numeroafiliado)=>{

    let publicacion = {
        ideventoprueba : arreglo.ideventoprueba,
        codigodetalle : arreglo.codigodetalle,
        codigoprueba : arreglo.codigoprueba,
        idevento : arreglo.idevento,
        numeroafiliado : numeroafiliado,
    }
    fetch('./controladores/eliminarseleccion.php?a=60',{
        method:'POST',
        body:JSON.stringify(publicacion),
        headers:{'Content-Type':'application/Json'}
    }).then(response=>{
        if(response.status == 200)
        {
            return response.text();
        }
    }).then(data=>{
        if(data)
            ShowMessage("Descartado","success",1000);
        else
            ShowMessage("Error al guardar","error",1000);

    })
})