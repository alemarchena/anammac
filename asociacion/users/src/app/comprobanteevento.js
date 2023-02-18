
import {ShowMessage} from './showmessage.js?a=66'
import {DatosAtleta} from './formulario.js?a=66;'
let paquete = [];
let esperando           = document.getElementById('esperando');

export const ConstruyePaquete = ((Info)=>{
    paquete = [...Info];
});

// ---------------------------------------- Clases ----------------------------------------
   export const Construircomprobante = ( ()=>{

        esperando.style.visibility = 'visible';

        let ctextopruebas='______________________\n';
        let cnombreevento='';

        for(let a=0;a<paquete.length;a++)
        {
            cnombreevento=paquete[a].nombre;
            ctextopruebas += paquete[a].nombreprueba + " " + paquete[a].nombredetalle + "\n";
        }
        ctextopruebas+='________________________________\n';

        let datosAtleta =[... DatosAtleta()];
        if(paquete.length > 0)
        {
            
        // e.preventDefault();
        // ------------------------------Datos ----------------------------
        const cfotoatleta   = datosAtleta[0]['fotoatleta'];

        let relacion=0;
        let canchofotoatleta=0;
        let caltofotoatleta=0;

        let imagentemp = new Image();
        imagentemp.src = datosAtleta[0].fotoatleta;
        imagentemp.onload = async function()
        {
            relacion =imagentemp.width / imagentemp.height;
            if(relacion>1)
            {
                canchofotoatleta = 180;
                caltofotoatleta = canchofotoatleta / relacion;
            }
            else{
                caltofotoatleta = 200;
                canchofotoatleta = caltofotoatleta * relacion;
            }

            const cfolio    =  datosAtleta[0]['numeroafiliado'];
            let cnombre     =  datosAtleta[0]['nombres'];
            const capellido =  datosAtleta[0]['apellidos'];

            cnombre = cnombre + " " + capellido;
            const dacre = new Datos(cnombreevento,cfolio,cnombre,ctextopruebas,cfotoatleta,canchofotoatleta,caltofotoatleta);

            const ticre = await CompletaTitulosCredencial();
            const cocre = await CompletaConfiguracionCredencial();
            const cucre = await CompletaCuerpoCredencial();
            await CredencialLista(ticre,cocre,cucre,dacre);
        };

        }else
        {
            ShowMessage("Aun no está aprobada su credencial","error",3000);
        }
    })

   
   class TitulosCredencial{
   
       constructor(titulo,subtitulo,anio,version,ruta){
   
           this.titulo = titulo;
           this.subtitulo = subtitulo;
           this.anio = anio;
           this.version = version;
           this.ruta = ruta;
       }
   }
   
   class CuerpoCredencial{
   
       constructor(ctipoatleta,cslogantitulo,cslogansubtitulo,cresponsable,ccargo,cpais,cfotoinstitucion,cinstitucion){
           this.ctipoatleta=ctipoatleta;
           this.cslogantitulo=cslogantitulo;
           this.cslogansubtitulo=cslogansubtitulo;
           this.cresponsable=cresponsable;
           this.ccargo=ccargo;
           this.cpais=cpais;
           this.cfotoinstitucion=cfotoinstitucion;
           this.cinstitucion=cinstitucion;
       }
   }
   
   class Configuracion{
   
       constructor(inicioalturatextos,interlineado,espacio,tamatextos,tamafecha,pageWidth,pageHeigth,mitadPagina){
   
           this.inicioalturatextos = inicioalturatextos;
           this. interlineado = interlineado;
           this. espacio = espacio;
           this. tamatextos =tamatextos;
           this. tamafecha = tamafecha;
           this. pageWidth = pageWidth;
           this. pageHeigth = pageHeigth;
           this. mitadPagina = mitadPagina;
       }
   }
   
   class Datos{
       constructor(cnombreevento,cfolio,cnombre,ctextopruebas,cfotoatleta,canchofotoatleta,caltofotoatleta)
       {
            this.cnombreevento =cnombreevento;
            this.cfolio=cfolio;
            this.cnombre=cnombre;
            this.ctextopruebas =ctextopruebas;
            this.cfotoatleta=cfotoatleta;
            this.canchofotoatleta=canchofotoatleta;
            this.caltofotoatleta=caltofotoatleta;
       }
   }
   // ------------------------------------ Funciones de clases ----------------------------------
   async function CompletaTitulosCredencial(){
   
       const titulo = 'ASOCIACIÓN NACIONAL DE';
       const subtitulo = 'ATLETISMO MÁSTER DE MÉXICO A.C';
       const anio  = '2023';
       const version = 5;
       const ruta = "https://www.anammac.com/asociacion/";
       // const ruta = "localhost/anammac/";
       const titulosCredencial = new TitulosCredencial(titulo,subtitulo,anio,version,ruta);
   
       return titulosCredencial;
   }
   
   async function CompletaConfiguracionCredencial(){
   
       const inicioalturatextos = 80;
       const interlineado = 25;
       const espacio = 10;
       const tamatextos =13;
       const tamafecha = 7;
       const pageWidth = 550;
       const pageHeigth = 580;
       const mitadPagina = (pageHeigth - pageHeigth/2) + 10;
   
       const configura = new Configuracion(inicioalturatextos,interlineado,espacio,tamatextos,tamafecha,pageWidth,pageHeigth,mitadPagina);
   
       return configura;
   }
   
   async function CompletaCuerpoCredencial(){
       const ctipoatleta = 'Atleta Máster Nacional';
       const cslogantitulo = 'ATENTAMENTE';
       const cslogansubtitulo = 'HONOR Y ESPÍRITU DEPORTIVO';
       const cresponsable = 'Mtra. María Guadalupe Dávila Aguilar';
       const ccargo = 'Presidente de la ANAMM A.C';
       const cpais = 'México';
       const cfotoinstitucion = 'anamaclogo.png';
       const cinstitucion = "ANAMM,A.C";
       const cuerpoCredencial = new CuerpoCredencial(ctipoatleta,cslogantitulo,cslogansubtitulo,cresponsable,ccargo,cpais,cfotoinstitucion,cinstitucion);
   
       return cuerpoCredencial;
   }
   
   // ------------------------------------- Credencial ----------------------------------------
   
   async function CredencialLista(ticre,cocre,cucre,dacre){
   
   
     document.getElementById("procesando").style.visibility = "visible";
   
       const fim = new Date();
       let mesimp = fim.getMonth();
       mesimp = parseInt(mesimp)  + 1;
       const fechaimpresa = fim.getDate() + "/" + mesimp + "/" + fim.getFullYear() + " Hora " + fim.getHours() + ":" +  fim.getMinutes();
   
       var docDefinition =
       {
           pageSize: {
                   width: cocre.pageWidth,
                   height: cocre.pageHeigth
               },
           pageMargins: [10, 10, 10, 10],
           background: [
               {
                   // image: 'data:image/jpeg;base64,/9j/4QAY...',
                   image: await getBase64ImageFromURL("../../imgcredenciales/banderamexicana.png?n="+ticre.version+"&auto=compress&cs=tinysrgb&dpr=1&w=100&h=auto"),
                   width: cocre.pageWidth,
                   absolutePosition:{x:0,y:0},
                   opacity:0.3,
               }
             ],
   
           content: [
               { text: ticre.titulo      , fontSize: 18,bold: true,color:'#088A08', absolutePosition: {x: 40,y: 15}  },
               { text: ticre.subtitulo   , fontSize: 18,bold: true,color:'#088A08', absolutePosition: {x: 15,y: 40}  },
               {
                   image: await getBase64ImageFromURL("../../imgcredenciales/"+cucre.cfotoinstitucion+"?auto=compress&cs=tinysrgb&dpr=1&w=100"),
                   width: 100,
                   height: 80,
                   absolutePosition: {x: 395,y: 5}
               },
               {
                   layout: 'lightHorizontalLines', // optional
                   table: {
   
                       widths: [ '*'],
                       body: [
                           // textos del frente
                           [ {text:'Folio Nº '+dacre.cfolio, fontSize: cocre.tamatextos,absolutePosition:{x:300,y:cocre.inicioalturatextos}}],
                           [ {text: dacre.cnombre, fontSize: cocre.tamatextos,absolutePosition:{x:300,y:cocre.inicioalturatextos+cocre.interlineado}}],
                           [ {text:'Evento : ' + dacre.cnombreevento, fontSize: cocre.tamatextos,absolutePosition:{x:300,y:cocre.inicioalturatextos+cocre.interlineado*3 }}],
                           [ {text: cucre.cslogantitulo, fontSize: cocre.tamatextos+1,absolutePosition:{x:300,y:cocre.inicioalturatextos+cocre.interlineado*4 + cocre.espacio}}],
                           [ {text: cucre.cslogansubtitulo, fontSize: cocre.tamatextos+1,absolutePosition:{x:300,y:cocre.inicioalturatextos+cocre.interlineado*5}}],
                           [ {text: cucre.cresponsable, fontSize: cocre.tamatextos,absolutePosition:{x:300,y:cocre.inicioalturatextos+cocre.interlineado*6+ cocre.espacio}}],
                           [ {text: cucre.ccargo, fontSize: cocre.tamafecha,absolutePosition:{x:300,y:cocre.inicioalturatextos+cocre.interlineado*7}}],
   
                           // texto parte posterior
                           [ {text:'Pruebas'      + dacre.ctextopruebas, fontSize: cocre.tamatextos,absolutePosition:{x:30,y:cocre.inicioalturatextos+cocre.interlineado*10.5}}],
                           [ {text:'COMPROBANTE '+ ticre.anio+' Descargado el '+fechaimpresa,color:'#D8D8D8', fontSize: cocre.tamatextos,absolutePosition:{x:30,y:cocre.inicioalturatextos+cocre.interlineado*18.5}}],
   
                       ]
                   },layout: 'noBorders',
               },
               {
                   image: await getBase64ImageFromURL(dacre.cfotoatleta+"?auto=compress&cs=tinysrgb&dpr=1&w=100&h=auto"),
                   opacity:0.7,
                   width: dacre.canchofotoatleta,
                   height: dacre.caltofotoatleta,
                   absolutePosition: {x: 30,y: 80}
               },
               { text: [ {text:cucre.cinstitucion,link: ticre.ruta + 'users/src/index.html', },{text:ticre.anio,color:'#8A0808',fontSize:23,bold: true } ],absolutePosition: { x: 30,y: 300}  },
               {
                   image: await getBase64ImageFromURL("../../imgcredenciales/qranammac.png?auto=compress&cs=tinysrgb&dpr=1&w=50&h=auto"),
                   width: 120,
                   height: 120,
                   absolutePosition: {x: 345, y: cocre.inicioalturatextos+cocre.interlineado*13}
               },
           ],
   
       };
   
       await pdfMake.createPdf(docDefinition).download('Comprobante de ' + dacre.cnombre);
       listo();
   }
   
   function listo(){
       setTimeout(() => {
           ShowMessage("El comprobante se ha descargado","success",3000);
           document.getElementById("procesando").style.visibility = "hidden";
            esperando.style.visibility = 'hidden';

       }, 1000);
   }
   
   
   
   
   // ArmaCredencial()
   
   function getBase64ImageFromURL(url) {
       return new Promise((resolve, reject) => {
           var img = new Image();
           img.setAttribute("crossOrigin", "anonymous");
           img.onload = () => {
           var canvas = document.createElement("canvas");
           canvas.width = img.width;
           canvas.height = img.height;
           var ctx = canvas.getContext("2d");
           ctx.drawImage(img, 0, 0);
           var dataURL = canvas.toDataURL("image/jpg");
           resolve(dataURL);
           };
           img.onerror = error => {
           reject(error);
           };
           img.src = url;
       });
   }