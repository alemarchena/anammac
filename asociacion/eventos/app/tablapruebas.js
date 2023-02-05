import {ClearSelect} from './select.js?a=14';
import {ListaPruebas,ListaEventos,VerCamposEvento} from './pruebas.js?a=14';
import { BuscarEventos,GuardarEventoPrueba,BuscarEventoConPruebas } from './pruebas.js?a=14';
import { EBDD,ABDD } from "./actualizador.js?a=14";
import {ShowMessage} from './showmessage.js?a=8'


let   rebu = document.getElementById('resultadobusquedapruebas');
let   rebudetalle = document.getElementById('resultadobusquedadetalleprueba');
let   rebuevento = document.getElementById('resultadopruebasevento');
let   reeventos = document.getElementById('resultadoseventos');
let   reeventoconpruebas = document.getElementById('resultadoeventoconpruebas');

const codigoevento          = document.getElementById('codigoevento');

  // --------------------- Limpieza de tablas ---------------------


export function LimpiarTPruebas()
{
    rebu.classList.add('table-responsive');
    while(rebu.firstChild){rebu.removeChild(rebu.firstChild);} 
}

export function LimpiarTPDetalle()
{
  rebudetalle.classList.add('table-responsive');
    while(rebudetalle.firstChild){rebudetalle.removeChild(rebudetalle.firstChild);} 
}

export function LimpiarTPEvento()
{
  rebuevento.classList.add('table-responsive');
    while(rebuevento.firstChild){rebuevento.removeChild(rebuevento.firstChild);} 
    
}

export function LimpiarTEventos()
{
  reeventos.classList.add('table-responsive');
    while(reeventos.firstChild){reeventos.removeChild(reeventos.firstChild);} 
}

export function LimpiarEventoConPruebas()
{
  reeventoconpruebas.classList.add('table-responsive');
    while(reeventoconpruebas.firstChild){reeventoconpruebas.removeChild(reeventoconpruebas.firstChild);} 
}

  // --------------------- Llenado de tablas ---------------------

  export const LlenarTablaPruebas = ((arreglo) =>{


    LimpiarTPruebas();

      // Crea un elemento <table> y un elemento <tbody>
      let tabla   = document.createElement("table");
      tabla.classList.add('table');
      tabla.classList.add('table-striped');
      tabla.style ="overflow-x:auto;";

      let tblBody = document.createElement("tbody");

      for (let i = -1; i < arreglo.length; i++) {

        if(i==-1)
        {
          // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          

          let enca1 = document.createTextNode('Código prueba'); 
          celda1.appendChild(enca1); 
          columna1.appendChild(celda1);

          let enca2 = document.createTextNode('Nombre prueba');
          celda2.appendChild(enca2); 
          columna2.appendChild(celda2);
        
          hilera.appendChild(columna1);        hilera.appendChild(columna2);
          
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }else{

        // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");

          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");
        

          let codigoprueba = document.createTextNode(arreglo[i].codigoprueba);
          codigoprueba.id = "idprueba" + arreglo[i].codigoprueba;
          celda1.appendChild(codigoprueba);        
          celda1.id= "celdanu" + arreglo[i].codigoprueba;
          columna1.appendChild(celda1);

          let nombreprueba = document.createTextNode(arreglo[i].nombreprueba);
          nombreprueba.id = "nombreprueba" + arreglo[i].nombreprueba;
          celda2.appendChild(nombreprueba);        
          columna2.appendChild(celda2);

          //Eliminar una prueba
          let botoneliminar = document.createElement("button");
          botoneliminar.id = "Eliminar" + arreglo[i].codigoprueba;
          botoneliminar.innerHTML = "Eliminar <span class='material-icons'>delete</span>";
          botoneliminar.classList.add("btn");
          botoneliminar.classList.add("btn-danger");
          
          botoneliminar.onclick = (e)=>{
            e.preventDefault();
            
            let text = "¿Desea eliminar ?";
            if (confirm(text) == true) {
              EliminarPrueba(e.target.id,arreglo);
              LimpiarTPruebas();
            } 
          }
          celda3.appendChild(botoneliminar);        
          columna3.appendChild(celda3);

          hilera.appendChild(columna1);        
          hilera.appendChild(columna2);
          hilera.appendChild(columna3);       
          
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }
        
      }
    
      
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      rebu.appendChild(tabla);
      
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");

  });
    
  export const LlenarTablaDetallePrueba = ((arreglodetalle) =>{

    LimpiarTPDetalle();

      // Crea un elemento <table> y un elemento <tbody>
      let tabla   = document.createElement("table");
      tabla.classList.add('table');
      tabla.classList.add('table-striped');
      tabla.style ="overflow-x:auto;";

      let tblBody = document.createElement("tbody");

      for (let i = -1; i < arreglodetalle.length; i++) {

        if(i==-1)
        {
          // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");        
          let columna4 = document.createElement("th");
          let columna5 = document.createElement("th");

          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");
          let celda4 = document.createElement("td");
          let celda5 = document.createElement("td");

          let enca1 = document.createTextNode('Código prueba'); 
          celda1.appendChild(enca1); 
          columna1.appendChild(celda1);

          let enca2 = document.createTextNode('Nombre');
          celda2.appendChild(enca2); 
          columna2.appendChild(celda2);
        
          let enca3 = document.createTextNode('Cód.detalle'); 
          celda3.appendChild(enca3); 
          columna3.appendChild(celda3);

          let enca4 = document.createTextNode('Detalle');
          celda4.appendChild(enca4); 
          columna4.appendChild(celda4);

          let enca5 = document.createTextNode('');
          celda5.appendChild(enca5); 
          columna5.appendChild(celda5);

          hilera.appendChild(columna1);        hilera.appendChild(columna2);
          hilera.appendChild(columna3);        hilera.appendChild(columna4);
          hilera.appendChild(columna5);

          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }else{

        // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");
          let columna4 = document.createElement("th");
          let columna5 = document.createElement("th");

          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");
          let celda4 = document.createElement("td");
          let celda5 = document.createElement("td");

          let codigoprueba = document.createTextNode(arreglodetalle[i].codigoprueba);
          codigoprueba.id = "idprueba" + arreglodetalle[i].codigoprueba;
          celda1.appendChild(codigoprueba);        
          celda1.id= "celdanu" + arreglodetalle[i].codigoprueba;
          columna1.appendChild(celda1);

          let nombreprueba = document.createTextNode(arreglodetalle[i].nombreprueba);
          nombreprueba.id = "nombreprueba" + arreglodetalle[i].nombreprueba;
          celda2.appendChild(nombreprueba);        
          columna2.appendChild(celda2);

          let codigodetalle = document.createTextNode(arreglodetalle[i].codigodetalle);
          codigodetalle.id = "codigodetalle" + arreglodetalle[i].codigodetalle;
          celda3.appendChild(codigodetalle);        
          columna3.appendChild(celda3);

          let nombredetalle = document.createTextNode(arreglodetalle[i].nombredetalle);
          nombredetalle.id = "nombredetalle" + arreglodetalle[i].nombredetalle;
          celda4.appendChild(nombredetalle);        
          columna4.appendChild(celda4);

          //Eliminar una prueba
          let botoneliminar = document.createElement("button");
          botoneliminar.id = "EliminarDetalle" + arreglodetalle[i].codigodetalle;
          botoneliminar.innerHTML = "Eliminar <span class='material-icons'>delete</span>";
          botoneliminar.classList.add("btn");
          botoneliminar.classList.add("btn-danger");
          
          botoneliminar.onclick = (e)=>{
            e.preventDefault();
            
            let text = "¿Desea eliminar ?";
            if (confirm(text) == true) {
              EliminarPruebaDetalle(e.target.id,arreglodetalle);
              LimpiarTPDetalle();
            } 
          }
          celda5.appendChild(botoneliminar);        
          columna5.appendChild(celda5);

          hilera.appendChild(columna1);        
          hilera.appendChild(columna2);
          hilera.appendChild(columna3);       
          hilera.appendChild(columna4);       
          hilera.appendChild(columna5);       
          
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }
        
      }
    
      
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      rebudetalle.appendChild(tabla);
      
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");

  });

  export const LlenarTablaEventos = ((arregloeventos) =>{

      LimpiarTEventos();
    
        // Crea un elemento <table> y un elemento <tbody>
        let tabla   = document.createElement("table");
        tabla.classList.add('table');
        tabla.classList.add('table-striped');
        tabla.style ="overflow-x:auto;";
    
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
            let columna9 = document.createElement("th");
    
            let celda1 = document.createElement("td");let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");let celda4 = document.createElement("td");
            let celda5 = document.createElement("td");let celda6 = document.createElement("td");
            let celda7 = document.createElement("td");let celda8 = document.createElement("td");
            let celda9 = document.createElement("td");
    
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
    
            let enca6 = document.createTextNode('Modificar');
            celda6.appendChild(enca6); columna6.appendChild(celda6);
    
            let enca7 = document.createTextNode('condiciones');
            celda7.appendChild(enca7); columna7.appendChild(celda7);
    
            let enca8 = document.createTextNode('Whatsapp');
            celda8.appendChild(enca8); columna8.appendChild(celda8);
    
            let enca9 = document.createTextNode('');
            celda9.appendChild(enca9); columna9.appendChild(celda9);
    
            hilera.appendChild(columna1);        hilera.appendChild(columna2);
            hilera.appendChild(columna3);        hilera.appendChild(columna4);
            hilera.appendChild(columna5);        hilera.appendChild(columna6);
            hilera.appendChild(columna7);        hilera.appendChild(columna8);
            hilera.appendChild(columna9);
    
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
          }else{
    
          // Crea las hileras de la tabla
            let hilera = document.createElement("tr");
    
            let columna1 = document.createElement("th");let columna2 = document.createElement("th");
            let columna3 = document.createElement("th");let columna4 = document.createElement("th");
            let columna5 = document.createElement("th");let columna6 = document.createElement("th");
            let columna7 = document.createElement("th");let columna8 = document.createElement("th");
            let columna9 = document.createElement("th");
    
            let celda1 = document.createElement("td");let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");let celda4 = document.createElement("td");
            let celda5 = document.createElement("td");let celda6 = document.createElement("td");
            let celda7 = document.createElement("td");let celda8 = document.createElement("td");
            let celda9 = document.createElement("td");
            
    
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
    
            //Modificar una prueba
            let botonmodificarevento = document.createElement("button");
            botonmodificarevento.id = "ModificarEvento" + arregloeventos[i].idevento;
            botonmodificarevento.innerHTML = "Modificar <span class='material-icons'>visibility</span>";
            botonmodificarevento.classList.add("btn");
            botonmodificarevento.classList.add("btn-info");
            
            botonmodificarevento.onclick = (e)=>{
              e.preventDefault();
                ModificarEvento(e.target.id,arregloeventos);
            }
            celda6.appendChild(botonmodificarevento); columna6.appendChild(celda6);
    
            //Eliminar una prueba
            let botonactivacion = document.createElement("button");
            botonactivacion.id = "ActivacionEvento" + arregloeventos[i].idevento;
            botonactivacion.classList.add("btn");
            
            if(arregloeventos[i].activo == 1){
              botonactivacion.classList.add("btn-danger");
              botonactivacion.innerHTML = "Desactivar <span class='material-icons'>remove</span>";
            }
            else
            {
              botonactivacion.classList.add("btn-success");
              botonactivacion.innerHTML = "Activar <span class='material-icons'>add</span>";
            }


            botonactivacion.onclick = (e)=>{
              e.preventDefault();
              Activacion(e.target.id,arregloeventos);
            }
            
            celda7.appendChild(botonactivacion); columna7.appendChild(celda7);
    
            let whatsapp = document.createTextNode(arregloeventos[i].whatsapp);
            whatsapp.id = "whatsapp" + arregloeventos[i].whatsapp;
            celda8.appendChild(whatsapp); columna8.appendChild(celda8);
    
            //Eliminar una prueba
            let botoneliminarevento = document.createElement("button");
            botoneliminarevento.id = "EliminarEvento" + arregloeventos[i].idevento;
            botoneliminarevento.innerHTML = "Eliminar <span class='material-icons'>delete</span>";
            botoneliminarevento.classList.add("btn");
            botoneliminarevento.classList.add("btn-danger");
            
            botoneliminarevento.onclick = (e)=>{
              e.preventDefault();
              
              let text = "¿Desea eliminar ?";
              if (confirm(text) == true) {
                EliminarEvento(e.target.id,arregloeventos);
                LimpiarTEventos();
              } 
            }
            celda9.appendChild(botoneliminarevento);        
            columna9.appendChild(celda9);
    
            hilera.appendChild(columna1);        
            hilera.appendChild(columna2);
            hilera.appendChild(columna3);       
            hilera.appendChild(columna4);       
            hilera.appendChild(columna5);       
            hilera.appendChild(columna6);       
            hilera.appendChild(columna7);       
            hilera.appendChild(columna8);       
            hilera.appendChild(columna9);       
            
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

  export const LlenarTablaPruebasEvento = ((arreglopruebaevento) =>{

    LimpiarTPEvento();

      // Crea un elemento <table> y un elemento <tbody>
      let tabla   = document.createElement("table");
      tabla.classList.add('table');
      tabla.classList.add('table-striped');
      tabla.style ="overflow-x:auto;";

      let tblBody = document.createElement("tbody");

      for (let i = -1; i < arreglopruebaevento.length; i++) {

        if(i==-1)
        {
          // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");        
          let columna4 = document.createElement("th");
          let columna5 = document.createElement("th");

          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");
          let celda4 = document.createElement("td");
          let celda5 = document.createElement("td");

          let enca1 = document.createTextNode('Código prueba'); celda1.appendChild(enca1); columna1.appendChild(celda1);
          let enca2 = document.createTextNode('Nombre');celda2.appendChild(enca2); columna2.appendChild(celda2);
          let enca3 = document.createTextNode('Cód.detalle'); celda3.appendChild(enca3); columna3.appendChild(celda3);
          let enca4 = document.createTextNode('Detalle');celda4.appendChild(enca4); columna4.appendChild(celda4);
          let enca5 = document.createTextNode('');

          celda5.appendChild(enca5); columna5.appendChild(celda5);

          hilera.appendChild(columna1);        hilera.appendChild(columna2);
          hilera.appendChild(columna3);        hilera.appendChild(columna4);
          hilera.appendChild(columna5);

          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }else{

        // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");
          let columna4 = document.createElement("th");
          let columna5 = document.createElement("th");

          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");
          let celda4 = document.createElement("td");
          let celda5 = document.createElement("td");

          let codigoprueba = document.createTextNode(arreglopruebaevento[i].codigoprueba);
          codigoprueba.id = "idprueba" + arreglopruebaevento[i].codigoprueba;
          celda1.appendChild(codigoprueba);        
          celda1.id= "celdanu" + arreglopruebaevento[i].codigoprueba;
          columna1.appendChild(celda1);

          let nombreprueba = document.createTextNode(arreglopruebaevento[i].nombreprueba);
          nombreprueba.id = "nombreprueba" + arreglopruebaevento[i].nombreprueba;
          celda2.appendChild(nombreprueba);        
          columna2.appendChild(celda2);

          let codigodetalle = document.createTextNode(arreglopruebaevento[i].codigodetalle);
          codigodetalle.id = "codigodetalle" + arreglopruebaevento[i].codigodetalle;
          celda3.appendChild(codigodetalle);        
          columna3.appendChild(celda3);

          let nombredetalle = document.createTextNode(arreglopruebaevento[i].nombredetalle);
          nombredetalle.id = "nombredetalle" + arreglopruebaevento[i].nombredetalle;
          celda4.appendChild(nombredetalle);        
          columna4.appendChild(celda4);

          //Agrega una prueba
          let checkprueba = document.createElement("button");
          checkprueba.id = "Check" + arreglopruebaevento[i].codigoprueba + arreglopruebaevento[i].codigodetalle;
          checkprueba.innerHTML = "Agregar <span class='material-icons'>add</span>";
          checkprueba.classList.add("btn");
          checkprueba.classList.add("btn-sucess");
          
          checkprueba.onclick = (e)=>{
            e.preventDefault();
            AltaEventoPrueba(e.target.id,arreglopruebaevento);
          }
          celda5.appendChild(checkprueba);        
          columna5.appendChild(celda5);

          hilera.appendChild(columna1);        
          hilera.appendChild(columna2);
          hilera.appendChild(columna3);       
          hilera.appendChild(columna4);       
          hilera.appendChild(columna5);       
          
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }
        
      }
    
      
      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      rebuevento.appendChild(tabla);
      
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");

  });

  export const LlenarEventoConPruebas = ((arregloeventoconpruebas) =>{

    LimpiarEventoConPruebas();

      // Crea un elemento <table> y un elemento <tbody>
      let tabla   = document.createElement("table");
      tabla.classList.add('table');
      tabla.classList.add('table-striped');
      tabla.style ="overflow-x:auto;";

      let tblBody = document.createElement("tbody");

      for (let i = -1; i < arregloeventoconpruebas.length; i++) {

        if(i==-1)
        {
          // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");        


          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");


          let enca1 = document.createTextNode('Nombre prueba'); celda1.appendChild(enca1); columna1.appendChild(celda1);
          let enca2 = document.createTextNode('Nombre Detalle');celda2.appendChild(enca2); columna2.appendChild(celda2);
          let enca3 = document.createTextNode(''); celda3.appendChild(enca3); columna3.appendChild(celda3);


          hilera.appendChild(columna1);        hilera.appendChild(columna2);          hilera.appendChild(columna3);        

          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }else{

        // Crea las hileras de la tabla
          let hilera = document.createElement("tr");

          let columna1 = document.createElement("th");        
          let columna2 = document.createElement("th");
          let columna3 = document.createElement("th");


          let celda1 = document.createElement("td");
          let celda2 = document.createElement("td");
          let celda3 = document.createElement("td");


          let nombreprueba = document.createTextNode(arregloeventoconpruebas[i].nombreprueba);
          nombreprueba.id = "nombreprueba" + arregloeventoconpruebas[i].nombreprueba;
          celda1.appendChild(nombreprueba);        
          columna1.appendChild(celda1);

          let nombredetalle = document.createTextNode(arregloeventoconpruebas[i].nombredetalle);
          nombredetalle.id = "nombredetalle" + arregloeventoconpruebas[i].nombredetalle;
          celda2.appendChild(nombredetalle);        
          columna2.appendChild(celda2);

           //Eliminar una prueba
           let botoneliminareventop = document.createElement("button");
           botoneliminareventop.id = "EliminarEventoPrueba" + arregloeventoconpruebas[i].ideventoprueba;
           botoneliminareventop.innerHTML = "Quitar <span class='material-icons'>delete</span>";
           botoneliminareventop.classList.add("btn");
           botoneliminareventop.classList.add("btn-danger");
           
           botoneliminareventop.onclick = (e)=>{
             e.preventDefault();
             
             let text = "¿Desea eliminar ?";
             if (confirm(text) == true) {
               EliminarEventoPrueba(e.target.id,arregloeventoconpruebas);
               LimpiarEventoConPruebas();
             } 
           }

      
          celda3.appendChild(botoneliminareventop);        
          columna3.appendChild(celda3);

          hilera.appendChild(columna1);        
          hilera.appendChild(columna2);
          hilera.appendChild(columna3);       
          
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

  // --------------------- ELiminaciones ---------------------


  export const EliminarPrueba = (async (id,arreglo)=>{
    let idpuro = id.replace('Eliminar','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].codigoprueba == idpuro)
        {
            await EBDD('apt_pruebas','codigoprueba',arreglo[i].codigoprueba,'numero');
            ClearSelect("codigoprueba");
            ListaPruebas();
        }
    }
  });
  

  export const EliminarPruebaDetalle = (async (id,arreglo)=>{
  let idpuro = id.replace('EliminarDetalle','');
      for (let i = 0; i < arreglo.length; i++) {
          if(arreglo[i].codigodetalle == idpuro)
          {
              await EBDD('apt_pruebasdetalle','codigodetalle',arreglo[i].codigodetalle,'numero');
          }
      }
  });

  export const EliminarEvento = (async (id,arreglo)=>{
    let idpuro = id.replace('EliminarEvento','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idevento == idpuro)
        {
            await EBDD('apt_eventos','idevento',arreglo[i].idevento,'numero');
            BuscarEventos();
            ClearSelect("codigoevento");
            setTimeout(() => {
              ListaEventos();
            }, 1000);
        }
    }
  });

  export const EliminarEventoPrueba = (async (id,arreglo)=>{
    let idpuro = id.replace('EliminarEventoPrueba','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].ideventoprueba == idpuro)
        {
            await EBDD('apt_eventoprueba','ideventoprueba',arreglo[i].ideventoprueba,'numero');
            LimpiarEventoConPruebas();
            setTimeout(() => {
              BuscarEventoConPruebas();
            }, 150);
          
        }
    }
  });
  
  // --------------------- Altas ---------------------


export const AltaEventoPrueba = (async (id,arreglo)=>{

  if(codigoevento.value!=0){

    let idpuro = id.replace('Check','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].codigoprueba + arreglo[i].codigodetalle == idpuro)
        {
            GuardarEventoPrueba( codigoevento.value,arreglo[i].codigoprueba,arreglo[i].codigodetalle );
        }
    }
  }else{
    ShowMessage("Seleccione un evento","error",3000);
  }

});

export const ModificarEvento = (async (id,arreglo)=>{
  let idpuro = id.replace('ModificarEvento','');
  for (let i = 0; i < arreglo.length; i++) {
      if(arreglo[i].idevento == idpuro)
      {
        VerCamposEvento(arreglo[i]);
      }
  }
});

export const Activacion = (async (id,arreglo)=>{
  let idpuro = id.replace('ActivacionEvento','');
  for (let i = 0; i < arreglo.length; i++) {
      if(arreglo[i].idevento == idpuro)
      {
        arreglo[i].activo == 0 ? ABDD('activo',1,'numero',arreglo[i].idevento,"Activación:"):ABDD('activo',0,'numero',arreglo[i].idevento,"Desactivación:");
        LimpiarTEventos();
      }
  }
});