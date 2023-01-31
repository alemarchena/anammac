import {Ver,Aprobacion,Bloqueo,Ocultar,CreacionAprobacion,Generar} from './funcionalidadtabla.js?a=23'

let  rebu = document.getElementById('resultadobusqueda');

export function Limpiar(arreglo)
{
    rebu.classList.add('table-responsive');
    while(rebu.firstChild){rebu.removeChild(rebu.firstChild);} 
    arreglo = [];
}

export const LlenarTabla = ((arreglo) =>{

    Limpiar(arreglo);

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
        let celda9 = document.createElement("td");        let celda10 = document.createElement("td");

        let enca1 = document.createTextNode('Nº Afiliado'); celda1.appendChild(enca1); columna1.appendChild(celda1);
        let enca2 = document.createTextNode('Usuario');     celda2.appendChild(enca2); columna2.appendChild(celda2);
        let enca3 = document.createTextNode('Nombre');      celda3.appendChild(enca3); columna3.appendChild(celda3);
        let enca4 = document.createTextNode('Apellido');    celda4.appendChild(enca4); columna4.appendChild(celda4);
        let enca5 = document.createTextNode('email');       celda5.appendChild(enca5); columna5.appendChild(celda5);
        let enca6 = document.createTextNode('');            celda6.appendChild(enca6); columna6.appendChild(celda6);
        let enca7 = document.createTextNode('');            celda7.appendChild(enca7); columna7.appendChild(celda7);
        let enca8 = document.createTextNode('');            celda8.appendChild(enca8); columna8.appendChild(celda8);
        let enca9 = document.createTextNode('');            celda9.appendChild(enca9); columna9.appendChild(celda9);
        let enca10 = document.createTextNode('');           celda10.appendChild(enca10); columna10.appendChild(celda10);

        hilera.appendChild(columna1);        hilera.appendChild(columna2);
        hilera.appendChild(columna3);        hilera.appendChild(columna4);
        hilera.appendChild(columna5);        hilera.appendChild(columna6);
        hilera.appendChild(columna7);        hilera.appendChild(columna8);
        hilera.appendChild(columna9);        hilera.appendChild(columna10);
        
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
      }else{

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
        let celda9 = document.createElement("td");        let celda10 = document.createElement("td");

        let numeroafiliado = document.createTextNode(arreglo[i].numeroafiliado);
        numeroafiliado.id = "numeroafiliado" + arreglo[i].idafiliacion;
        celda1.appendChild(numeroafiliado);        columna1.appendChild(celda1);
        celda1.id= "celdanu" + arreglo[i].idafiliacion;

        let usuario = document.createTextNode(arreglo[i].usuario);
        usuario.id = "usuario" + arreglo[i].idafiliacion;
        celda2.appendChild(usuario);        columna2.appendChild(celda2);
        celda2.id= "celda" + arreglo[i].idafiliacion;

        let nombres = document.createTextNode(arreglo[i].nombres);
        nombres.id = "nombres" + arreglo[i].idafiliacion;
        celda3.appendChild(nombres);        columna3.appendChild(celda3);

        let apellidos = document.createTextNode(arreglo[i].apellidos);
        apellidos.id = "apellidos" + arreglo[i].idafiliacion;
        celda4.appendChild(apellidos);        columna4.appendChild(celda4);

        let email = document.createTextNode(arreglo[i].email);
        email.id = "email" + arreglo[i].idafiliacion;
        celda5.appendChild(email);        columna5.appendChild(celda5);
        
        //Ver los datos en el panel superior
        let botonver = document.createElement("button");
        botonver.id = "Ver" + arreglo[i].idafiliacion;
        botonver.innerHTML = "Ver";
        botonver.classList.add("btn");
        botonver.classList.add("btn-info");
        botonver.onclick = (e)=>{e.preventDefault();Ver(e.target.id,arreglo);}
        celda6.appendChild(botonver);        columna6.appendChild(celda6);
        
          //Ocultar la fila encontrada
          let botonocultar = document.createElement("button");
          botonocultar.id = "Ocultar" + arreglo[i].idafiliacion;
          botonocultar.innerHTML = "Ocultar";
          botonocultar.classList.add("btn");
          botonocultar.classList.add("btn-primary");
          botonocultar.onclick = (e)=>{e.preventDefault();Ocultar(e.target.id,arreglo);}
          celda7.appendChild(botonocultar);        columna7.appendChild(celda7);

        //Aprobar un afiliado
        let botonaprobar = document.createElement("button");
        botonaprobar.id = "Aprobar" + arreglo[i].idafiliacion;
        arreglo[i].aprobado==1 ? botonaprobar.innerHTML = "Desaprobar" : botonaprobar.innerHTML = "Aprobar";
        botonaprobar.classList.add("btn");
        if(arreglo[i].numeroafiliado != '')
        {
          botonaprobar.classList.add("btn-success");
        }else
        {
          botonaprobar.classList.add("btn-warning");
        }

        botonaprobar.onclick = (e)=>{e.preventDefault();
          
          if(arreglo[i].numeroafiliado != '')
          {
            Aprobacion(e.target.id,arreglo,arreglo[i].aprobado);
          }
          else
          {
            CreacionAprobacion(e.target.id,arreglo,arreglo[i].aprobado,arreglo[i].codigoestado);
          }

        }
        celda8.appendChild(botonaprobar);        columna8.appendChild(celda8);

        //Bloquear un afiliado
        let botonbloquear = document.createElement("button");
        botonbloquear.id = "Bloquear" + arreglo[i].idafiliacion;
        arreglo[i].desactivado == 1 ? botonbloquear.innerHTML = "Desbloquear" : botonbloquear.innerHTML = "Bloquear";
        botonbloquear.classList.add("btn");
        botonbloquear.classList.add("btn-warning");
        botonbloquear.onclick = (e)=>{e.preventDefault();Bloqueo(e.target.id,arreglo,arreglo[i].desactivado);}
        celda9.appendChild(botonbloquear);        columna9.appendChild(celda9);

        //Generar clave de un afiliado
        let botongenerar = document.createElement("button");
        botongenerar.id = "Generar" + arreglo[i].idafiliacion;
        botongenerar.innerHTML = "Usuario<span class='material-icons'>key</span>";
        
        botongenerar.classList.add("btn");
        botongenerar.classList.add("btn-info");
        
        botongenerar.onclick = (e)=>{
          e.preventDefault();
          
          let text = "¿Desea generar un usuario aleatorio?";
          if (confirm(text) == true) {
            Generar(e.target.id,arreglo);
          } 
        }
        celda10.appendChild(botongenerar);        columna10.appendChild(celda10);

 

        hilera.appendChild(columna1);        hilera.appendChild(columna2);
        hilera.appendChild(columna3);        hilera.appendChild(columna4);
        hilera.appendChild(columna5);        hilera.appendChild(columna6);
        hilera.appendChild(columna7);        hilera.appendChild(columna8);
        hilera.appendChild(columna9);        hilera.appendChild(columna10);
        
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