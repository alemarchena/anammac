
import {Fotos, Info} from './formulario.js';
import {Ingresa,ABDD} from './accesobdd.js'
import {MostarImagenLogin} from './modal.js'

const input     = document.querySelector("#input-file");

const idafiliacion  = document.getElementById('idafiliacion');


const botonatleta = document.getElementById('botonatleta');
const botonpago = document.getElementById('botonpago');
const botondocumento = document.getElementById('botondocumento');

const fotoatleta        = document.getElementById('fotoatleta');
const fotodocumento     = document.getElementById('fotodocumento');
const fotopago          = document.getElementById('fotopago');

let quebotontoco;

botonatleta.addEventListener('click',(e)=>{
    e.preventDefault();
    quebotontoco='atleta';
    archivosubida = 'subirimagen.php';
    input.click();
})

botonpago.addEventListener('click',(e)=>{

    e.preventDefault();
    quebotontoco='pago';

    archivosubida = 'subirimagenpago.php';

    input.click();
})
botondocumento.addEventListener('click',(e)=>{

    e.preventDefault();
    quebotontoco='documento';

    archivosubida = 'subirimagen.php';
    input.click();
})

input.addEventListener('change',(e) => {

    e.preventDefault();
    const file = input.files;
    showFile(file);
});


function showFile(files){

    if(files === undefined)
    {
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}



function processFile(file)
{
    const tipo=file.type;
    const validExtentions = ['image/jpeg','image/jpg','image/png','image/gif'];

    if(validExtentions.includes(tipo) )
    {
        const fileReader = new FileReader();
        const id =  `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e => {
            const fileURL = fileReader.result;

                const image =`
                <div id="${id}" class="row container">
                <div class='col-sm-12 col-md-6'>
                    <img src="${fileURL}" alt="${file.name}" width="100px" heigth="auto">
                </div>
                <div class='col-sm-12 col-md-6'>
                    <div class="status"></div>
                    <span>${file.name}</span>
                    <span id="span${id}">Cargando...</span>
                </div>
                `;

            const html = document.querySelector('#preview').innerHTML ;
            document.querySelector('#preview').innerHTML = image + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file,id);
    }else{
        alert("No es un archivo válido")
    }
}

let archivosubida = '';

const uploadFile = async (file,id)=> {
    const formData = new FormData();
    formData.append("file",file);
    try 
    {
        const response = await fetch('./controladores/'+archivosubida,{method:'POST', body:formData});
        const responseText = await response.text();

        //el div que contiene la imagen toma el nomrbe de la imagen mas un "div" adelante
        const divimagen = document.querySelector(`#${id}`);
        divimagen.id = responseText;
        divimagen.id="div"+ responseText.replace('.','-');

        document.querySelector(`#span${id}`).innerHTML = `<span class="success">Ok</span>`;

        ActualizaImagen(quebotontoco,idafiliacion.value,responseText)

    } catch (error) {
        document.querySelector(`#span${id}`).innerHTML = `<span class="failure">Error.</span>`;
    }
}

function ActualizaImagen(tipo,idafiliacion,imagen)    
{
    let datosconsulta = {tipo:tipo,idafiliacion  : idafiliacion,imagen : imagen}

    fetch("./controladores/actualizarimagenalumno.php?a=33",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1)
        {
            if(tipo=='atleta'){
                MostarImagenLogin(imagen,'');
                let eliminarimagenatleta = Fotos.fotoatleta;
                
                Fotos.fotoatleta = imagen;
                fotoatleta.src    = "./imgafiliados/" + imagen;
                
                eliminaImagen(eliminarimagenatleta);

            }
            if(tipo=='documento'){
                let eliminarimagendocumento = Fotos.fotodocumento;

                Fotos.fotodocumento = imagen;
                fotodocumento.src    = "./imgafiliados/" + imagen;
                
                eliminaImagen(eliminarimagendocumento);
              
            }

            if(tipo=='pago'){

                const fechaactual = new Date();
                ABDD('fechapago',fechaactual,'texto');

                let eliminarimagenpago = Fotos.fotopago;

                Fotos.fotopago = imagen;
                fotopago.src = "./imgpagos/" + imagen;
                
                eliminaImagen(eliminarimagenpago);
               
            }
        }
    })
    .catch(function (error){ 
        console.log(error); 
        // alert("Error al actualizar la imagen");
    });
}

export function EliminaBotonCredencial(){
    const contenedorhtml = document.querySelector('#contentcre') ;

    while(contenedorhtml.firstChild){
        contenedorhtml.removeChild(contenedorhtml.firstChild);
    }
}
const eliminaImagen = async (imagen)=>
{
    //eliminar el archivo del atleta fisicamente
    let imagenobj = {
    imagen:imagen,
    }
    const eliminarjson = JSON.stringify(imagenobj);
    let archivo='';
    if(quebotontoco=='pago')
        archivo = "eliminarImagenpago.php";
    else
        archivo = "eliminarImagen.php";

    fetch("./controladores/"+archivo,{method:'POST',body:eliminarjson,headers:{'Content-Type':'application/json'}})
    .then(response => response.text())
    .then(data => {
    })
    .catch(function(error) {
    console.log(error)
    });
}
