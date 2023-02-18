import {datos,LlenarFormulario, Info} from './formulario.js?a=66'
import {CerrarModal,MostarImagenLogin} from './modal.js?a=66'
import {ShowMessage} from './showmessage.js?a=66'
import {LoggMenu} from './logincheck.js?a=66'
import {DesActivarSistema, ActivarSistema,LoadURL} from './cargarsistema.js?a=66'
import {ListaEstados} from './estados.js?a=66'
import {ListaSangres} from './sangres.js?a=66'
import {ListaEspecialidades} from './especialidades.js?a=66'
import {ListaTallas} from './tallas.js?a=66'
import {ConvierteaDMA} from './clases.js?a=66'

let imagenlogueado  = document.querySelector("#imagenlogueado");
let numeroafiliado  = document.querySelector("#numeroafiliado");

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

    let datosconsulta = {tipo:tipo,idafiliacion:id,email:email,usuario:usuario}
    fetch('./controladores/consultaafiliado.php?a=66',{method:'POST',body:JSON.stringify(datosconsulta),headers:{'Content-Type':'application/Json'}})
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
            const formulario = new Info(data[0].idafiliacion,data[0].numeroafiliado,
                data[0].usuario,data[0].nombres,data[0].apellidos,data[0].genero,data[0].fechanacimiento,
                data[0].email,data[0].codigoestado,data[0].direccion,data[0].whatsapp,
                data[0].codigosangre,data[0].codigoespecialidad,data[0].enfermedadcronica,
                data[0].codigotalla,data[0].fotoatleta,data[0].fotodocumento,data[0].fotopago,
                data[0].aprobado,data[0].desactivado,data[0].estester);
            
            LlenarFormulario(formulario);
            if(usuario!='' && email == '') //Entro con usuario
            { 
                if(data[0].fotoatleta != '')
                   MostarImagenLogin(data[0].fotoatleta,'');
                else
                   MostarImagenLogin("avatarvacio.jpg",'');
            }else // Entro con email
            {
                if(data[0].fotoatleta != '')
                   MostarImagenLogin(data[0].fotoatleta,'');
                else
                   MostarImagenLogin('avatarvacio.jpg','');

            }

            LoggMenu(1);
            LoadURL('sistema.html?'+version)
            ActivarSistema();

        }else{

            if(email != '')
            {
                CrearUsuarioBDD(email)
                ShowMessage("Hemos registrado su primer ingreso.","success",4000);
                LoggMenu(1);
                LoadURL('sistema.html?'+version)
                ActivarSistema();
            }else
            {
                imagenlogueado.src = '';
                LoggMenu(0);
                DesActivarSistema();
                ShowMessage("El código ingresado no existe en el sistema.","error",3000);
            }
        }
    })
    .catch(function(error)
    {
        ShowMessage("No tiene conexión a la base de datos.","error",3000);
        console.log(error);
    });
}

//Crea el alumno en caso que no exista
export const CrearUsuarioBDD = ((emailnuevo)=>{
    GuardarDatos(emailnuevo);     
})

function GuardarDatos(email)    
{
    let datosconsulta = {numeroafiliado:'',usuario:'',nombres : '',apellidos:'',
    genero:0,fechanacimiento:'',email:email,codigoestado:0,direccion:'',whatsapp:'',codigosangre:0,
    codigoespecialidad:0,enfermedadcronica:'',codigotalla:0,fotoatleta:'',fotodocumento:'',fotopago:'',
    aprobado:0,desactivado  : 0}

    fetch("./controladores/guardarafiliacion.php?a=66",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1)
        {
            const formulario = new Info('','','','','','','',email,0,'','',0,0,'',0,'','','',0,0);
            LlenarFormulario(formulario);
            setTimeout(() => {
                ShowMessage("Ingresando por primera vez...","success",3000);
                Ingresa('consultaxemail','',email,'')
            }, 1000);
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
}



// ----------------------- Modificaciones de datos -----------------------
const idafiliacion = document.getElementById('idafiliacion');
const calendario = document.getElementById('calendario');
const fechanacimientotexto= document.getElementById('fechanacimientotexto');
const mensajecambios = document.getElementById("mensajecambios");
const crearcredencial= document.getElementById("crearcredencial");

//Actualiza los datos del alumno en la base de datos
export const ABDD = ((campo,valor,tipodato)=>{

    if(valor.toString().includes("'")){
        valor = valor.toString().replace("'",'`');
    }
    let datosconsulta = {idafiliacion  : idafiliacion.value,campo : campo,valor:valor,tipodato:tipodato}
    fetch("./controladores/actualizaafiliados.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1){
            ShowMessage("Guardado!","success",2000)
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });

    mensajecambios.innerHTML = "Elija SALIR e INGRESO, para actualizar CREDENCIAL";
    crearcredencial.style.display = "none";
})

export const ABDDPE = ((campo,valor,tipodato)=>{

    if(valor.toString().includes("'")){
        valor = valor.toString().replace("'",'`');
    }
    let datosconsulta = {numeroafiliado  : numeroafiliado.value,campo : campo,valor:valor,tipodato:tipodato}
    fetch("./controladores/actualizapagoevento.php?a=1",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1){
            ShowMessage("Guardado!","success",2000)
        }
    })
    .catch(function (error){ 
        console.log(error); 
        ShowMessage("Error al guardar en la base de datos","error",3000);
    });
})


document.addEventListener('change',function(e){

    e.preventDefault();
    e.stopImmediatePropagation();

    let uck = e.target.id;
    let valor = this.getElementById(uck).value;
    
    uck == 'nombres'     ? ABDD('nombres',valor,'texto')    :false;
    uck == 'apellidos'   ? ABDD('apellidos',valor,'texto')  :false;
    uck == 'usuario'    ? ABDD('usuario',valor,'texto')     :false;

    if(uck == 'genero'){
        if(valor==1)
            ABDD('genero','F','texto');
        else
            ABDD('genero','M','texto');
    }   

    uck == 'whatsapp'   ? ABDD('whatsapp',valor,'texto')    :false;
    uck == 'calendario' ? ABDD('fechanacimiento',valor,'texto') : false;
    if(uck == 'diaselect')
    {
        let fechavalida = new Date(calendario.value)
        if(fechavalida == 'Invalid Date')
            ShowMessage('Verifique la fecha','Error',3000)
        else{
            fechanacimientotexto.innerText = ConvierteaDMA(calendario.value);
            ABDD('fechanacimiento',fechavalida,'texto')
        }
    }

    uck == 'codigoestado'   ? ABDD('codigoestado',valor,'numero') : false;
    uck == 'direccion'      ? ABDD('direccion',valor,'texto')    :false;
    uck == 'codigosangre'   ? ABDD('codigosangre',valor,'numero')    :false;
    uck == 'codigoespecialidad'? ABDD('codigoespecialidad',valor,'numero')    :false;
    uck == 'enfermedadcronica'      ? ABDD('enfermedadcronica',valor,'texto')    :false;
    uck == 'codigotalla'   ? ABDD('codigotalla',valor,'numero')    :false;


    uck == 'email' ? ShowMessage('Se ha intentado cambiar el email','error') : false;
    uck == 'idafiliacion' ? ShowMessage('Se ha intentado cambiar el id del afiliado','error',3000) : false;
    uck == 'numeroafiliado' ? ShowMessage('Se ha intentado cambiar el número de afiliado','error',3000) : false;

    if(uck=='numeroafiliado' || uck == 'ideventoelegido' || uck == 'labeltotal' || uck == 'labeltotaldolar')
    {
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
});

