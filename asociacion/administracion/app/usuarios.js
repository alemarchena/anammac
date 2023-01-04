import {ListaEstados} from './estados.js?a=10'
import {LlenarTablaUsuarios,LimpiarTablaUsuarios} from './tablausuarios.js?a=10'
import {ShowMessage} from './showmessage.js?a=10'

const codigoestado              = document.getElementById('codigoestado');
const verafiliadosxestado       = document.getElementById('verafiliadosxestado');
const guardarafiliadosxestado   = document.getElementById('guardarafiliadosxestado');
const usuariodelegado           = document.getElementById('usuariodelegado');
const emaildelegado             = document.getElementById('emaildelegado');
const opdelegado                = document.getElementById('opdelegado');
const opadministrador           = document.getElementById('opadministrador');

let arreglo = [];
verafiliadosxestado.addEventListener('click',()=>{
    BuscarUsuarios();
})

guardarafiliadosxestado.addEventListener('click',()=>{
    GuardarUsuario();
})

export const BuscarUsuarios = (()=>{

    if(codigoestado.value == 0)
    {
        ShowMessage("Seleccione un estado",'success',4000);
    }else{
        let publicacionlistaEstados = {
            tabla : "apt_usuarios",
            idestado : codigoestado.value,
        }
    
        arreglo = [];

        fetch("./controladores/leerusuarioestado.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaEstados ),headers:{'Content-Type':'application/json'}})   
    
        .then(response => response.json())
        .then(function(data){
            let cantidad = Object.keys(data).length;
            if(cantidad>0){
                for(let a = 0 ;a<cantidad;a++) //llenar la lista
                {
                    let item = new Object();
                    item.idusuario = data[a].idusuario;
                    item.email = data[a].email;
                    item.usuario = data[a].usuario;

                    if(data[a].estaautorizado==0)
                        item.estaautorizado = 'No';
                    else if(data[a].estaautorizado==1)
                        item.estaautorizado = 'Si';

                    if(data[a].esadministrador==0)
                        item.esadministrador = 'No';
                    else if(data[a].esadministrador==1)
                        item.esadministrador = 'Si';

                    item.idestado = data[a].idestado;
                    item.nombreestado = data[a].nombreestado;

                    arreglo.push(item);
                }

                LlenarTablaUsuarios(arreglo);
            }else
            {
                LimpiarTablaUsuarios(arreglo);
            }
        })
        .catch(function (error){
            ShowMessage("No tiene conexión a la base de datos.","error",3000);
            console.log(error);
        });
    }

})



export const GuardarUsuario = (()=>{

    if(codigoestado.value == 0)
    {
        ShowMessage("Seleccione un estado",'success',4000);
    }else{

        let opadm = 0;
        let opdel = 0;

        if(opdelegado.checked)
            opdel = 1;

        try{
            if(opadministrador.checked)
                opadm = 1;
        }catch{

        }

        let publicacionlistaUsuarios = {
            usuario : usuariodelegado.value,
            email : emaildelegado.value,
            idestado : codigoestado.value,
            esadministrador : opadm,
            estaautorizado : opdel,
        }

        fetch("./controladores/guardarusuario.php?a=1",{method:'POST',body: JSON.stringify( publicacionlistaUsuarios ),headers:{'Content-Type':'application/json'}})   
        .then(response => response.json())
        .then(function(data){
            if(data>0){
                ShowMessage('Guardado..','success',3000);
                BuscarUsuarios();
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }

})

ListaEstados();