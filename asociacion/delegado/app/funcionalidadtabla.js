import { ABDD } from "./actualizador.js";
import {GetRandomString} from './randomstring.js'

const fotoatleta        = document.getElementById('fotoatleta');
const fotodocumento     = document.getElementById('fotodocumento');
const fotopago          = document.getElementById('fotopago');

const descargaatleta        = document.getElementById('descargaatleta');
const descargadocumento     = document.getElementById('descargadocumento');
const descargapago          = document.getElementById('descargapago');

const nombreestado      = document.getElementById('nombreestado');
const direccion         = document.getElementById('direccion');
const whatsapp          = document.getElementById('whatsapp');
const numeroafiliado      = document.getElementById('numeroafiliado');
const nombresangre      = document.getElementById('nombresangre');
const nombreespecialidad= document.getElementById('nombreespecialidad');
const nombretalla       = document.getElementById('nombretalla');
const collapseOne       =  document.getElementById('collapseOne');

const ruta = '../users/src/imgafiliados/';
const rutapagos = '../users/src/imgpagos/';
let idpuro = '';

export const Ver = ((id,arreglo)=>{


    if(!collapseOne.classList.contains('show')){
        collapseOne.classList.add('show');
        window.scrollTo(0, 300);
    }

    idpuro = id.replace('Ver','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idafiliacion == idpuro)
        {

            if(arreglo[i].fotopago == '')
            {
                fotopago.src        = ruta + 'avatarvacio.jpg';
            }else{
                fotopago.src        = rutapagos + arreglo[i].fotopago;
            }

            if(arreglo[i].fotoatleta == '')
            {
                fotoatleta.src        = ruta + 'avatarvacio.jpg';
            }else{
                fotoatleta.src        = ruta + arreglo[i].fotoatleta;
            }

            if(arreglo[i].fotoatleta == '')
            {
                fotodocumento.src        = ruta + 'avatarvacio.jpg';
            }else{
                fotodocumento.src        = ruta + arreglo[i].fotodocumento;
            }

            descargaatleta.href      = ruta + arreglo[i].fotoatleta;
            descargadocumento.href   = ruta + arreglo[i].fotodocumento;

            descargapago.href        = rutapagos + arreglo[i].fotopago;

            descargaatleta.download      = arreglo[i].apellidos;
            descargadocumento.download   = 'IFE' + arreglo[i].apellidos;
            descargapago.download        = 'Pago' + arreglo[i].apellidos;

            numeroafiliado.value= arreglo[i].numeroafiliado;
            nombreestado.value  = arreglo[i].nombreestado;
            direccion.value     = arreglo[i].direccion;
            whatsapp.value      = arreglo[i].whatsapp;
            nombresangre.value  = arreglo[i].nombresangre;
            nombreespecialidad.value = arreglo[i].nombreespecialidad;
            nombretalla.value   = arreglo[i].nombretalla;
        }
    }
});

export const Ocultar = ((id,arreglo)=>{
    idpuro = id.replace('Ocultar','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idafiliacion == idpuro)
        {
            const boton = document.getElementById("Ocultar"+arreglo[i].idafiliacion);
            const filapadre = boton.parentElement.parentElement.parentElement;
            filapadre.remove();
            
        }
    }
});

export const Generar = ( async (id,arreglo)=>{

    idpuro = id.replace('Generar','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idafiliacion == idpuro)
        {
            
            let nuevaClave =GetRandomString(7);
            await ABDD('usuario',nuevaClave,'texto',idpuro);
            await AsignaNuevaClave(nuevaClave,arreglo[i].idafiliacion);
        }
    }
});

function AsignaNuevaClave(nuevaClave,idafiliacion){
    let usu = document.getElementById("celda" + idafiliacion);
    usu.innerHTML = nuevaClave;


}