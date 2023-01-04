const dropArea  = document.querySelector(".drag-area");

const dragText  = dropArea.querySelector('h5');
const button    = dropArea.querySelector('button');
const input     = dropArea.querySelector("#input-file");
const idafiliacion  = document.getElementById('idafiliacion');
const fotoatleta  = document.getElementById('fotoatleta');
const fotodocumento  = document.getElementById('fotodocumento');
const fotopago  = document.getElementById('fotopago');

const misimagenes  = document.getElementById('misimagenes');
let files;

button.addEventListener('click',(e) =>{
    e.preventDefault();

    input.click();
});

input.addEventListener('change',(e) => {
    e.preventDefault();

    const file = input.files;
    dropArea.classList.add("active");
    showFile(file);
    dropArea.classList.remove('active');
});

// mientras se arrastra
dropArea.addEventListener('dragover',(e) => {
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = "Suelta para subir los archivos";
})

// arrastra pero esta fuera de la zona
dropArea.addEventListener('dragleave',(e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = "Arrastra y suelta las imagenes";
})

// cuando se suelta en la zona de archivos
dropArea.addEventListener('drop',(e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    showFile(files);
    dropArea.classList.remove('active');
    dragText.textContent = "Arrastra y suelta las imagenes";

})

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
                <div class='col-sm-12 col-md-3'>
                    <img src="${fileURL}" alt="${file.name}" width="50px">
                </div>
                <div class='col-sm-12 col-md-3'>
                    <div class="status"></div>
                    <span>${file.name}</span>
                    <span id="span${id}">Cargando...</span>
                </div>
                `;
                // <div class='col-sm-12 col-md-3'>
                //     <a href='#' id="botonmifoto${id}" onclick="SelectImage('',this)" class='btn btn-info'>Es mi foto</a>
                // </div>
                
                // <div class='col-sm-12 col-md-3'>
                // <a  href='#' id="boton${id}" onclick="DeleteImage(this)" class='btn btn-danger'>Eliminar</a>
                // </div>
            const html = document.querySelector('#preview').innerHTML ;
            document.querySelector('#preview').innerHTML = image + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file,id);
    }else{
        alert("No es un archivo válido")
    }
}



const uploadFile = async (file,id)=> {
    const formData = new FormData();
    formData.append("file",file);
    try {
        const response = await fetch('./controladores/subirimagen.php',{method:'POST', body:formData});
        const responseText = await response.text();

        //el boton que contiene la imagen toma el nombre de la imagen
        // const botonmifoto = document.querySelector(`#botonmifoto${id}`);
        // botonmifoto.id = "_"+responseText;

        //el boton que contiene la imagen toma el nombre de la imagen
        // const boton = document.querySelector(`#boton${id}`);
        // boton.id = responseText;

        //el div que contiene la imagen toma el nomrbe de la imagen mas un "div" adelante
        const divimagen = document.querySelector(`#${id}`);
        divimagen.id = responseText;
        divimagen.id="div"+ responseText.replace('.','-');

        document.querySelector(`#span${id}`).innerHTML = `<span class="success">Ok</span>`;

        GuardarImagen(idafiliacion.value,responseText);

    } catch (error) {
        document.querySelector(`#span${id}`).innerHTML = `<span class="failure">Error.</span>`;
    }
}

function DeleteImage(yo){
    eliminaImagen(yo.id);
}

function SelectImage(tipo,yo){

    if(tipo=='atleta')
        yo.id = yo.id.replace('a_','');
    if(tipo=='pago')
        yo.id = yo.id.replace('p_','');
    if(tipo=='documento')
        yo.id = yo.id.replace('d_','');
    else
        yo.id = yo.id.replace('_','');

    ActualizaImagen(tipo,idafiliacion.value,yo.id)
}

function GuardarImagen(idafiliacion,imagen)    
{
    let datosconsulta = {tipo:'guardar',idafiliacion  : idafiliacion,imagen : imagen}

    fetch("./controladores/abmimagen.php?a=33",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data == 1){
            setTimeout(() => {
                
                LevantarImagenes(idafiliacion);
            }, 1000);
        }
    })
    .catch(function (error){ 
        console.log(error); 
        alert("Error al guardar la imagen");
    });
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
            if(tipo=='atleta')
                fotoatleta.src = "./imgafiliados/" + imagen;
            if(tipo=='documento')
                fotodocumento.src = "./imgafiliados/" + imagen;
            if(tipo=='pago')
                fotopago.src = "./imgpagos/" + imagen;
        }
    })
    .catch(function (error){ 
        console.log(error); 
        // alert("Error al actualizar la imagen");
    });
}

function EliminarImagenDBB(idafiliacion,imagen)    
{
    let datosconsulta = {tipo:'eliminar',idafiliacion  : idafiliacion,imagen : imagen}


    fetch("./controladores/abmimagen.php?a=33",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.text();
    }).then(data => {
        if(data == 1){
        }
    })
    .catch(function (error){ 
        console.log(error); 
        alert("Error al eliminar");
    });
}

const eliminaImagen = async (imagen)=>
{
      //eliminar el archivo del atleta fisicamente
      let imagenobj = {
        imagen:imagen,
      }
      const eliminarjson = JSON.stringify(imagenobj);
      fetch("./controladores/eliminarImagen.php",{method:'POST',body:eliminarjson,headers:{'Content-Type':'application/json'}})
      .then(response => response.text())
      .then(data => {

        EliminarImagenDBB(idafiliacion.value,imagen) 
        const encontrado = document.querySelector(`#div${imagen.replace('.','-')}`);
        while(encontrado.firstChild){
            encontrado.removeChild(encontrado.firstChild);
        }
      })
      .catch(function(error) {
        console.log(error)
      });

    
}

misimagenes.addEventListener('click',(e)=>{
    e.preventDefault()
    LevantarImagenes(idafiliacion.value);
})

function LevantarImagenes(idafiliacion)    
{
    const contenedorhtml = document.querySelector('#preview') ;

    while(contenedorhtml.firstChild){
        contenedorhtml.removeChild(contenedorhtml.firstChild);
    }

    let datosconsulta = {idafiliacion  : idafiliacion}

    fetch("./controladores/consultaimagenesalumnos.php?a=33",{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{
        return response.json();
    }).then(data => {
        if(data.length>0)
        {
            for(let a=0;a<data.length;a++)
            {
                let divima ="div"+ data[a].imagen.toString().replace('.','-');

                const image =`
                <div id="${divima}" class="col-sm-12 col-md-3 " style='margin-bottom: 2.5em;'>
                    <div class='row' style='align-items: center;text-align: center;'>
                        <div class='col-sm-6 col-md-4'>
                            <div class='row'>
                              <img src="${"./imgafiliados/"+data[a].imagen}" alt="${data[a].imagen}" width="50px">
                            </div>
                            <div class='row'>
                                <div class='col-sm-12'>
                                    <button id="${data[a].imagen}" onclick="DeleteImage(this)" class='btn btn-sm btn-danger'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class='col-sm-12 col-md-4'>
                            <div class='row' style='align-items: center;text-align: center;'>
                                <div class='col-sm-12' style='padding: 0.3em;'>
                                    <button id="a_${data[a].imagen}" onclick="SelectImage('atleta',this)" class='btn btn-sm btn-info'>Es mi foto</button>
                                </div>
                                <div class='col-sm-12' style='padding: 0.3em;'>
                                    <button id="d_${data[a].imagen}" onclick="SelectImage('documento',this)" class='btn btn-sm btn-warning'>Es mi IFE</button>
                                </div>
                                <div class='col-sm-12' style='padding: 0.3em;'>
                                    <button id="p_${data[a].imagen}" onclick="SelectImage('pago',this)" class='btn btn-sm btn-success'>Es mi pago</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                `;

                const html = document.querySelector('#preview').innerHTML ;
                document.querySelector('#preview').innerHTML = image + html;
            }
        }
    })
    .catch(function (error){ 
        console.log(error); 
        alert("Error al leer las imagenes en la base de datos");
    });
}
