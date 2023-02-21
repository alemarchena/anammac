import {EBDD, ABDDPI } from "./actualizador.js?a=19";

const fotoatleta        = document.getElementById('fotoatleta');
const fotopago          = document.getElementById('fotopago');
const descargaatleta        = document.getElementById('descargaatleta');
const descargapago          = document.getElementById('descargapago');

const idafiliacion = document.getElementById('idafiliacion');

const nombrecambia      = document.getElementById('nombrecambia');
const apellidocambia    = document.getElementById('apellidocambia');
const whatsapp          = document.getElementById('whatsapp');
const whatsappc          = document.getElementById('whatsappc');
const emailc             = document.getElementById('emailc');
const montopagado       = document.getElementById('montopagado');
const montopagadodolar  = document.getElementById('montopagadodolar');

const numeroafiliado      = document.getElementById('numeroafiliado');
const collapseOne       =  document.getElementById('collapseOne');

const ruta = '../users/src/imgafiliados/';
const rutapagos = '../users/src/imgpagosevento/';
let idpuro = '';




export function ConvierteaDMAForm(fecha){

    let anio = fecha.substring(0, 4);
    let mes = fecha.substring(5, 7);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;

    let dia = fecha.substring(8, 10);
    
    let fechanueva =dia+"-"+mes+"-"+ anio;

    return fechanueva;
}

export const Ver = ((id,arreglo)=>{

    if(!collapseOne.classList.contains('show')){
        collapseOne.classList.add('show');
        window.scrollTo(0, 300);
    }

    idpuro = id.replace('Ver','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idinscripcion == idpuro)
        {
            try {
                if(arreglo[i].fotopagoevento == '')
                {
                    fotopago.src        = ruta + 'avatarvacio.jpg';
                }else{
                    fotopago.src        = rutapagos + arreglo[i].fotopagoevento;
                }
            } catch (error) {
                
            }

            try {
                if(arreglo[i].fotoatleta == '')
                {
                    fotoatleta.src        = ruta + 'avatarvacio.jpg';
                }else{
                    fotoatleta.src        = ruta + arreglo[i].fotoatleta;
                }
            } catch (error) {
                    
            }

           
            descargaatleta.href      = ruta + arreglo[i].fotoatleta;
            descargapago.href        = rutapagos + arreglo[i].fotopagoevento;

            descargaatleta.download      = arreglo[i].apellidos;
            descargapago.download        = 'Pago ' + arreglo[i].apellidos;

            nombrecambia.value      = arreglo[i].nombres;
            apellidocambia.value    = arreglo[i].apellidos;
            idafiliacion.value      = arreglo[i].idafiliacion;
            numeroafiliado.value    = arreglo[i].numeroafiliado;

            montopagado.value          = "$ " + arreglo[i].montopagado;
            montopagadodolar.value     = "U$S " + arreglo[i].montopagadodolar;
            whatsappc.value          = arreglo[i].whatsapp;
            emailc.value             = arreglo[i].email;
        }
    }
});

export const Aprobacion = ( async (id,arreglo,estado)=>{

    let idpuro = id.replace('Aprobar','');

    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idinscripcion == idpuro)
        {
            //Cambia el estado del pago del evento
            estado == 1 ? estado = 0 : estado = 1;
            await ABDDPI('aprobado',estado,'numero',arreglo[i].idinscripcion,'Aprobación de pago ');
            

            const boton = document.getElementById("Aprobar"+arreglo[i].idinscripcion);
            estado == 1 ? boton.innerHTML = "Desaprobar" : boton.innerHTML = "Aprobar" ;
           
        }
    }
});

export const Blanquear = ( async (id,arreglo,estado)=>{

    idpuro = id.replace('Blanquear','');

    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idinscripcion == idpuro)
        {
            EBDD('apt_pagosinscripciones','idinscripcion',idpuro,"numero");
            const boton = document.getElementById("Ocultar"+idpuro);
            boton.click();
        }
    }
});

export const Ocultar = ((id,arreglo)=>{
    idpuro = id.replace('Ocultar','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idinscripcion == idpuro)
        {
            const boton = document.getElementById("Ocultar"+arreglo[i].idinscripcion);
            const filapadre = boton.parentElement.parentElement.parentElement;
            filapadre.remove();
            
        }
    }
});