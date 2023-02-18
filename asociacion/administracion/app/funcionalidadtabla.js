import { ABDD,EBDD } from "./actualizador.js?a=27";
import {ShowMessage} from './showmessage.js?a=27'
import {GetRandomString} from './randomstring.js?a=27'

const fotoatleta        = document.getElementById('fotoatleta');
const fotodocumento     = document.getElementById('fotodocumento');
const fotopago          = document.getElementById('fotopago');

const descargaatleta        = document.getElementById('descargaatleta');
const descargadocumento     = document.getElementById('descargadocumento');
const descargapago          = document.getElementById('descargapago');

const idafiliacion = document.getElementById('idafiliacion');

const nombrecambia      = document.getElementById('nombrecambia');
const apellidocambia    = document.getElementById('apellidocambia');
const calendario        = document.getElementById('calendario');
const fechanacimientotexto      = document.getElementById('fechanacimientotexto');

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
        if(arreglo[i].idafiliacion == idpuro)
        {
            try {
                if(arreglo[i].fotopago == '')
                {
                    fotopago.src        = ruta + 'avatarvacio.jpg';
                }else{
                    fotopago.src        = rutapagos + arreglo[i].fotopago;
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

            try {
                if(arreglo[i].fotodocumento == '')
                {
                    fotodocumento.src        = ruta + 'avatarvacio.jpg';
                }else{
                    fotodocumento.src        = ruta + arreglo[i].fotodocumento;
                }
            } catch (error) {
                        
            }
            descargaatleta.href      = ruta + arreglo[i].fotoatleta;
            descargadocumento.href   = ruta + arreglo[i].fotodocumento;

            descargapago.href        = rutapagos + arreglo[i].fotopago;

            descargaatleta.download      = arreglo[i].apellidos;
            descargadocumento.download   = 'IFE' + arreglo[i].apellidos;
            descargapago.download        = 'Pago' + arreglo[i].apellidos;

            nombrecambia.value      = arreglo[i].nombres;
            apellidocambia.value    = arreglo[i].apellidos;
            calendario.value        = arreglo[i].fechanacimiento;
            fechanacimientotexto.innerText = ConvierteaDMAForm(arreglo[i].fechanacimiento);

            idafiliacion.value = arreglo[i].idafiliacion;
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

export const CreacionAprobacion= ( async (id,arreglo,estado,estadorepresentado)=>{

    idpuro = id.replace('Aprobar','');

    let accion =true;

    for(let v=0;v<arreglo.length;v++)
    {
        if(arreglo[v].idafiliacion == idpuro)
        {
            if(arreglo[v].codigoestado == 0)
            {
                accion = false;
            }
        }
    }
    if(accion)
    {
        fetch('controladores/cuentaafiliados.php',{method:'POST',headers:{'Content-Type':'application/json'}})
        .then(response => response.json())
        .then(data =>{
            
            //Creacion del número de afiliado
            let canafi  = data[0].cantidad.toString().length;
            let cantidadafiliados= data[0].cantidad.toString();

            if(estadorepresentado.length < 2)
            estadorepresentado = "0" + estadorepresentado;
            
            while(canafi < 6)
            {
                cantidadafiliados = "0" + cantidadafiliados.toString();
                canafi = canafi+1;
            }
            
            let numeroafiliado = "MX" + estadorepresentado + cantidadafiliados;
        
            ABDD('numeroafiliado',numeroafiliado,'texto',idpuro);
            let celda1nu= document.getElementById("celdanu" + idpuro);
            celda1nu.innerHTML = numeroafiliado;
            //Aprobación del afiliado
            Aprobacion(id,arreglo,estado);
        })
        .catch(function(error) {
            ShowMessage('Se produjo un error al contar afiliados','error',3000);

        });
    }else
    {
        ShowMessage('El atleta no tiene completo el estado al cual representa','error',5000);
    }

});


export const Aprobacion = ( async (id,arreglo,estado)=>{

    idpuro = id.replace('Aprobar','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idafiliacion == idpuro)
        {
            // await ABDD('fechapago','0000-00-00','texto',idpuro);
                        
            //Cambia el estado
            estado == 1 ? estado = 0 : estado = 1;
            await ABDD('aprobado',estado,'numero',idpuro);
            arreglo[i].aprobado = estado;

            const boton = document.getElementById("Aprobar"+arreglo[i].idafiliacion);
            estado == 1 ? boton.innerHTML = "Desaprobar" : boton.innerHTML = "Aprobar" ;
            
        }
    }
});

export const Bloqueo = ( async (id,arreglo,estado)=>{

    idpuro = id.replace('Bloquear','');

    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idafiliacion == idpuro)
        {
            estado == 1 ? estado = 0 : estado = 1;

            await ABDD('desactivado',estado,'numero',idpuro);
            
            arreglo[i].desactivado = estado;

            const boton = document.getElementById("Bloquear"+arreglo[i].idafiliacion);
            estado == 1 ? boton.innerHTML = "Desbloquear" : boton.innerHTML = "Bloquear" ;
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

export const EliminarPermisoDelegado = (async (id,arreglo)=>{
    idpuro = id.replace('Eliminar','');
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].idusuario == idpuro)
        {
            await EBDD('apt_usuarios','idusuario',arreglo[i].idusuario,'numero');
        }
    }
});

function AsignaNuevaClave(nuevaClave,idafiliacion){
    let usu = document.getElementById("celda" + idafiliacion);
    usu.innerHTML = nuevaClave;
}

