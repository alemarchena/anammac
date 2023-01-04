import {EliminarPermisoDelegado} from './funcionalidadtabla.js'

let  rebu = document.getElementById('resultadobusquedausuarios');

export function LimpiarTablaUsuarios(arreglo)
{
    rebu.classList.add('table-responsive');
    while(rebu.firstChild){rebu.removeChild(rebu.firstChild);} 
    arreglo = [];
}

export const LlenarTablaUsuarios = ((arreglo) =>{

  LimpiarTablaUsuarios(arreglo);

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

        let columna1 = document.createElement("th");        let columna2 = document.createElement("th");
        let columna3 = document.createElement("th");        let columna4 = document.createElement("th");
        let columna5 = document.createElement("th");        let columna6 = document.createElement("th");
        let columna7 = document.createElement("th");        let columna8 = document.createElement("th");
        let columna9 = document.createElement("th");        let columna10 = document.createElement("th"); 

        let celda1 = document.createElement("td");        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");        let celda4 = document.createElement("td");
        let celda5 = document.createElement("td");        let celda6 = document.createElement("td");
        let celda7 = document.createElement("td");        let celda8 = document.createElement("td");
        

        let enca1 = document.createTextNode('Id usuario'); celda1.appendChild(enca1); columna1.appendChild(celda1);
        let enca2 = document.createTextNode('email');     celda2.appendChild(enca2); columna2.appendChild(celda2);
        let enca3 = document.createTextNode('usuario');      celda3.appendChild(enca3); columna3.appendChild(celda3);
        let enca4 = document.createTextNode('Es Delegado');    celda4.appendChild(enca4); columna4.appendChild(celda4);
        let enca5 = document.createTextNode('Es administrador');       celda5.appendChild(enca5); columna5.appendChild(celda5);
        let enca6 = document.createTextNode('Id Estado');            celda6.appendChild(enca6); columna6.appendChild(celda6);
        let enca7 = document.createTextNode('Nombre Estado');            celda7.appendChild(enca7); columna7.appendChild(celda7);
        let enca8 = document.createTextNode('');            celda8.appendChild(enca8); columna7.appendChild(celda8);
        

        hilera.appendChild(columna1);        hilera.appendChild(columna2);
        hilera.appendChild(columna3);        hilera.appendChild(columna4);
        hilera.appendChild(columna5);        hilera.appendChild(columna6);
        hilera.appendChild(columna7);        hilera.appendChild(columna8); 
        
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
      }else{

      // Crea las hileras de la tabla
        let hilera = document.createElement("tr");

        let columna1 = document.createElement("th");        let columna2 = document.createElement("th");
        let columna3 = document.createElement("th");        let columna4 = document.createElement("th");
        let columna5 = document.createElement("th");        let columna6 = document.createElement("th");
        let columna7 = document.createElement("th");        let columna8 = document.createElement("th"); 

        let celda1 = document.createElement("td");        let celda2 = document.createElement("td");
        let celda3 = document.createElement("td");        let celda4 = document.createElement("td");
        let celda5 = document.createElement("td");        let celda6 = document.createElement("td");
        let celda7 = document.createElement("td");        let celda8 = document.createElement("td");

        let idusuario = document.createTextNode(arreglo[i].idusuario);
        idusuario.id = "idusuario" + arreglo[i].idusuario;
        celda1.appendChild(idusuario);        columna1.appendChild(celda1);
        celda1.id= "celdanu" + arreglo[i].idusuario;

        let email = document.createTextNode(arreglo[i].email);
        email.id = "email" + arreglo[i].email;
        celda2.appendChild(email);        columna2.appendChild(celda2);
        celda2.id= "celda" + arreglo[i].idusuario;

        let usuario = document.createTextNode(arreglo[i].usuario);
        usuario.id = "usuario" + arreglo[i].idusuario;
        celda3.appendChild(usuario);        columna3.appendChild(celda3);

        let estaautorizado = document.createTextNode(arreglo[i].estaautorizado);
        estaautorizado.id = "estaautorizado" + arreglo[i].idusuario;
        celda4.appendChild(estaautorizado);        columna4.appendChild(celda4);

        let esadministrador = document.createTextNode(arreglo[i].esadministrador);
        esadministrador.id = "esadministrador" + arreglo[i].idusuario;
        celda5.appendChild(esadministrador);        columna5.appendChild(celda5);

        let idestado = document.createTextNode(arreglo[i].idestado);
        idestado.id = "idestado" + arreglo[i].idusuario;
        celda6.appendChild(idestado);        columna6.appendChild(celda6);
        
        let nombreestado = document.createTextNode(arreglo[i].nombreestado);
        nombreestado.id = "nombreestado" + arreglo[i].idusuario;
        celda7.appendChild(nombreestado);        columna7.appendChild(celda7);

        
        //Eliminar un afiliado
        let botoneliminar = document.createElement("button");
        botoneliminar.id = "Eliminar" + arreglo[i].idusuario;
        botoneliminar.innerHTML = "Eliminar <span class='material-icons'>delete</span>";
        
        botoneliminar.classList.add("btn");
        botoneliminar.classList.add("btn-danger");
        
        botoneliminar.onclick = (e)=>{
          e.preventDefault();
          
          let text = "¿Desea eliminar el permiso ?";
          if (confirm(text) == true) {
            EliminarPermisoDelegado(e.target.id,arreglo);
            LimpiarTablaUsuarios(arreglo);
          } 
        }
        celda8.appendChild(botoneliminar);        columna8.appendChild(celda8);

 

        hilera.appendChild(columna1);        hilera.appendChild(columna2);
        hilera.appendChild(columna3);        hilera.appendChild(columna4);
        hilera.appendChild(columna5);        hilera.appendChild(columna6);
        hilera.appendChild(columna7);        hilera.appendChild(columna8);
        
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