import './actualizador.js';
import {Credencial,Redirigir,RedirigirEventos} from './credencial.js?a=22'
import {Delegado,RedirigirDelegado} from './delegado.js?a=22'
//--------------------------- Datos -------------------------------

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
    constructor(idusuario,email,usuario,estaautorizado,esadministrador,idestado){
        
        this.idusuario      =idusuario;
        this.email          =email;
        this.usuario        =usuario;
        this.estaautorizado =estaautorizado;
        this.esadministrador=esadministrador;
        this.idestado=idestado;
    }

}

export const LlenarFormulario=((f)=>{
    
    Info.idusuario      = f.idusuario;
    Info.email          = f.email;
    Info.usuario        = f.usuario;
    Info.estaautorizado = f.estaautorizado;
    Info.esadministador = f.esadministrador;
    Info.idestado       = f.idestado;


    idusuario.value = f.idusuario;
    email.value = f.email;
    usuario.value = f.usuario;
    if(Info.email != undefined)
    {
        if(f.esadministrador==1)
            Credencial();
        
        if(f.estaautorizado==1)
            Delegado(Info);
    }
})

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

const id      = document.getElementById('id');

document.addEventListener('click',((e)=>{
    if(Info.email != undefined)
    {
        if(e.target.id == 'vercredencial')
        {
            Redirigir(Info);
        }
        
        if(e.target.id == 'vereventos')
        {
            RedirigirEventos(Info);
        }
         
        if(e.target.id == 'verdelegado')
        {
            RedirigirDelegado(Info);
        } 
    }
}))


const idusuario = document.getElementById('idusuario');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');