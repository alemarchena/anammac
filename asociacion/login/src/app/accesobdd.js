import {datos,LlenarFormulario, Info} from './formulario.js?a=14'
import {CerrarModal,MostarImagenLogin} from './modal.js?a=14'
import {ShowMessage} from './showmessage.js?a=14'
import {LoggMenu} from './logincheck.js?a=14'
import {DesActivarSistema, ActivarSistema,LoadURL} from './cargarsistema.js?a=14'
import {Salir} from './logout.js?a=14'
import './actualizador.js?a=14'

const espera  = document.querySelector("#espera");


export const LeerCodigoUsuarioBDD = ((codigo)=>{
    Ingresa('consultaxusuario','','',codigo)
    CerrarModal();
})

//Consulta la base de datos para ver si existe el alumno
export const LeerDatosUsuarioBDD = ((email)=>{
    Ingresa('consultaxemail','',email,'')
})

export function Ingresa(tipo,id,email,usuario)
{
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    espera.style.visibility = "visible";

    let datosconsulta = {tipo:tipo,id:id,email:email,usuario:usuario}
    fetch('./controladores/consultausuario.php?a=1',{method:'POST',body:JSON.stringify(datosconsulta),headers:{'Content-Type':'application/Json'}})
    .then(response=>
    {
        if(response.status==200)
        {
            return response.json();
        }
    })
    .then(data=>
    {
        if(data.length>0)
        {
            const formulario = new Info(data[0].idusuario,data[0].email,
                data[0].usuario,data[0].estaautorizado,data[0].esadministrador,data[0].idestado);

            LlenarFormulario(formulario);
            if(usuario!='' && email == '') //Entro con usuario
            { 
                MostarImagenLogin("avatarvacio.jpg",'');
            }

            LoggMenu(1);
            LoadURL('sistema.html?'+version)
            ActivarSistema();

        }else{

            LoggMenu(0);

            if(email != '')
            {
                CrearUsuarioBDD(email)
            }
            
            if(codigo != '')
            {
                DesActivarSistema();
                ShowMessage("El código ingresado no existe en el sistema.","error",3000);
            }
        }
        espera.style.visibility = "hidden";

    })
    .catch(function(error)
    {
        ShowMessage("No tiene acceso a la base de datos.","error",3000);

        espera.style.visibility = "hidden";
        console.log(error);
    });
}

//Crea el alumno en caso que no exista
export const CrearUsuarioBDD = ((emailnuevo)=>{
    GuardarDatos(emailnuevo);     
})

function GuardarDatos(email)    
{
    let datosconsulta = {usuario:'',email:email}

    fetch("./controladores/guardar.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1)
        {
            Salir();
            ShowMessage("Se ha creado el usuario, debe ser autorizado para ingresar al panel.","success",7000);
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
}






