import {SelectOption} from './select.js';
import {Credencial} from './credencial.js?a=66';
import {BuscarEventos} from './eventosdisponibles.js?a=66';
//--------------------------- Datos -------------------------------

const infopago = document.getElementById("infopago");
const infoeventos = document.getElementById("infoeventos");

class Datos{
    
    constructor(emailDatos){
        this.emailDatos= emailDatos;
    }

    get ConsultaDatos(){
       return this.emailDatos;
    };
}

export let datos;

export const Loguear = ((emaillogueado)=>{
    datos = new Datos(emaillogueado);
});

export class Info
{
    constructor(idafiliacion,numeroafiliado,usuario,nombres,apellidos,genero,fechanacimiento,email,
        codigoestado,direccion,whatsapp,codigosangre,codigoespecialidad,enfermedadcronica,
        codigotalla,fotoatleta,fotodocumento,fotopago,aprobado,desactivado,estester){
        
        this.idafiliacion=idafiliacion;
        this.numeroafiliado=numeroafiliado;
        this.usuario=usuario;
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.genero=genero;
        this.fechanacimiento=fechanacimiento;
        this.email=email;

        this.codigoestado=codigoestado;
        this.direccion=direccion;
        this.whatsapp=whatsapp;
        this.codigosangre=codigosangre;
        this.codigoespecialidad=codigoespecialidad;
        this.enfermedadcronica=enfermedadcronica;

        this.codigotalla=codigotalla;
        this.fotoatleta=fotoatleta;
        this.fotodocumento=fotodocumento;
        this.fotopago=fotopago;

        this.aprobado=aprobado;
        this.desactivado=desactivado;
        this.estester=estester;
    }

}

export class Fotos
{
    constructor(fotoatleta,fotodocumento,fotopago){
        this.fotoatleta     = fotoatleta;
        this.fotodocumento  = fotodocumento;
        this.fotopago       = fotopago;
        this.fotopagoevento = '';
    }
}

export const LlenarFormulario=((f)=>{
    
    Info.idafiliacion=f.idafiliacion;
    Info.numeroafiliado=f.numeroafiliado;
    Info.usuario=f.usuario;
    Info.nombres=f.nombres;
    Info.apellidos=f.apellidos;
    Info.genero=f.genero;
    Info.fechanacimiento=f.fechanacimiento;
    Info.email=f.email;

    Info.codigoestado=f.codigoestado;
    Info.direccion=f.direccion;
    Info.whatsapp=f.whatsapp;
    Info.codigosangre=f.codigosangre;
    Info.codigoespecialidad=f.codigoespecialidad;
    Info.enfermedadcronica=f.enfermedadcronica;

    Info.codigotalla=f.codigotalla;
    Info.fotoatleta=f.fotoatleta;
    Info.fotodocumento=f.fotodocumento;
    Info.fotopago=f.fotopago;
    Info.fotopagoevento='';

    Info.aprobado=f.aprobado;
    Info.desactivado=f.desactivado;
    Info.estester=f.estester;

    idafiliacion.value = f.idafiliacion;
    numeroafiliado.value = f.numeroafiliado;
    usuario.value =f.usuario;
    nombres.value=f.nombres;
    apellidos.value=f.apellidos;
    
    if(f.genero=='F')
        SelectOption(genero,1);
    else if(f.genero=='M')
        SelectOption(genero,2);
    else
        SelectOption(genero,0);

    calendario.value = f.fechanacimiento;
    fechanacimientotexto.innerText = ConvierteaDMAForm(f.fechanacimiento);
    
    email.value = f.email;
    
    // codigoestado.value = f.codigoestado;
    SelectOption(codigoestado,f.codigoestado);
    direccion.value = f.direccion;
    whatsapp.value = f.whatsapp;
    SelectOption(codigosangre,f.codigosangre);
    SelectOption(codigoespecialidad,f.codigoespecialidad);

    enfermedadcronica.value = f.enfermedadcronica;
    
    SelectOption(codigotalla,f.codigotalla);
    Fotos.fotoatleta = f.fotoatleta;
    f.fotoatleta!=''    ? fotoatleta.src    = "./imgafiliados/" + f.fotoatleta    : fotoatleta.src    = "./imgafiliados/avatarvacio.jpg";
    
    Fotos.fotodocumento = f.fotodocumento;
    f.fotodocumento!='' ? fotodocumento.src = "./imgafiliados/" + f.fotodocumento : fotodocumento.src = "./imgafiliados/avatarvacio.jpg";
    
    Fotos.fotopago = f.fotopago;
    f.fotopago!=''      ? fotopago.src      = "./imgpagos/" + f.fotopago      : fotopago.src      = "./imgafiliados/avatarvacio.jpg";

  
    fotopagoevento.src      = "./imgafiliados/avatarvacio.jpg";


    if(f.numeroafiliado !='' && f.aprobado == 1 && f.desactivado == 0)
    {
        estadocredencial.innerHTML = "Credencial aprobada";
        estadocredencial.style.color = 'green';

        Credencial(Info);
        DeshabilitaNombreApellido();
       
        infopago.style.display = "none";
        infoeventos.style.display = "visible";
        BuscarEventos(Info.numeroafiliado);
        
    }else
    {
        estadocredencial.innerHTML = "Pendiente de aprobación";
        estadocredencial.style.color = 'red';
        // Limpiarpantallas();
        infopago.style.display = "visible";
        infoeventos.style.display = "none";

    }

})

const DeshabilitaNombreApellido = (()=>{
    nombres.disabled = true;
    apellidos.disabled = true;
});


export function Limpiarpantallas(){
    const contehtml = document.querySelector('#contentcre') ;
    while(contehtml.firstChild){
        contehtml.removeChild(contehtml.firstChild);
    }

    
    const contpreview = document.getElementById('preview');
    while(contpreview.firstChild){
        contpreview.removeChild(contpreview.firstChild);
    }
}

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

export const DatosAtleta = (()=>{
    let datos = [];
    let informacion = new Object();
    informacion.nombres = nombres.value;
    informacion.apellidos = apellidos.value;
    informacion.fotoatleta = fotoatleta.src;
    informacion.numeroafiliado = numeroafiliado.value;
    datos.push(informacion);
    return datos;
})

const idafiliacion      = document.getElementById('idafiliacion');
const numeroafiliado    = document.getElementById('numeroafiliado');
const usuario           = document.getElementById('usuario');
const nombres           = document.getElementById('nombres');
const apellidos         = document.getElementById('apellidos');
const genero            = document.getElementById('genero');
const calendario        = document.getElementById('calendario');
const fechanacimientotexto= document.getElementById('fechanacimientotexto');
const email             = document.getElementById('email');

const codigoestado      = document.getElementById('codigoestado');
const direccion         = document.getElementById('direccion');
const whatsapp          = document.getElementById('whatsapp');
const codigosangre      = document.getElementById('codigosangre');
const codigoespecialidad= document.getElementById('codigoespecialidad');
const enfermedadcronica = document.getElementById('enfermedadcronica');

const codigotalla       = document.getElementById('codigotalla');
const fotoatleta        = document.getElementById('fotoatleta');
const fotodocumento     = document.getElementById('fotodocumento');
const fotopago          = document.getElementById('fotopago');
const fotopagoevento    = document.getElementById('fotopagoevento');


const estadocredencial = document.getElementById('estadocredencial'); 

document.addEventListener('click',((e)=>{

}))

nombres.addEventListener("click",()=>{
    if(Info.numeroafiliado && Info.aprobado == 1 && Info.desactivado == 0){
        nombres.disabled = true;
    }
})
apellidos.addEventListener("click",()=>{
    if(Info.numeroafiliado && Info.aprobado == 1 && Info.desactivado == 0){
        apellidos.disabled = true;
    }
})

nombres.addEventListener("focus",()=>{
    if(Info.numeroafiliado && Info.aprobado == 1 && Info.desactivado == 0){
        nombres.disabled = true;
    }
})
apellidos.addEventListener("focus",()=>{
    if(Info.numeroafiliado && Info.aprobado == 1 && Info.desactivado == 0){
        apellidos.disabled = true;
    }
})