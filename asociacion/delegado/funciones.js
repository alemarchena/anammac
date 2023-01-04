function mensaje(titulo,texto,icono,boton)
{
    
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: boton
    });
}

function getRandomString(largo)
{
    let texto = '';
    let posible = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let a=0;a < largo;a++)
    {
        texto += posible.charAt(Math.floor(Math.random() * posible.length));
    }
    return texto;
}

//------------------------------------------- convertidor de fecha -----------------------------

function CreaFechaBDD(){
    let fecha = new Date();
    anio = fecha.getFullYear();
    mes = fecha.getMonth() + 1;
    dia = fecha.getDate();
    if(dia<10)
        dia= "0"+dia;
    if(mes<10)
        mes = "0"+mes;
        
    return anio+"-"+mes+"-"+dia;
}

function creaHora(){
    let hoy = new Date();
    return hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
}

function deshabilitarboton(boton){
    document.getElementById(boton).disabled =true;
}

 function habilitarboton(boton){
    document.getElementById(boton).disabled =false;
}

 function DiasEntreFechas(finicio,ffin){
    fechaInicio = new Date(finicio).getTime();
    fechaFin    = new Date(ffin).getTime();
    cantidadDias =  Math.floor((fechaFin - fechaInicio)/(1000*60*60*24));
    return cantidadDias;
}

function SumarDiasAfecha(fechapasada,numero,como) {
  //la fecha
  fecha = new Date(fechapasada);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())

  var TuFecha = new Date(fecha);
  
  //dias a sumar
  var dias = parseInt(numero);
  
  //nueva fecha sumada
  TuFecha.setDate(TuFecha.getDate() + dias);

  nuevodia = TuFecha.getDate();
  nuevodia<10 ? nuevodia = "0"+nuevodia : nuevodia;
  
  nuevomes = TuFecha.getMonth() + 1;
  nuevomes <10 ? nuevomes = "0"+nuevomes : nuevomes;

  //formato de salida para la fecha
    if(como=="dmy")
    {
      return nuevodia + '/' + nuevomes + '/' + TuFecha.getFullYear();
    }else{
      return TuFecha.getFullYear() + "-" + nuevomes + "-" + nuevodia;
    }
}

 function FechamdaAamd(fec){

    dia = fec.substring(0, 2);
    mes = fec.substring(3, 5);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;
    anio = fec.substring(6, 10);
    fecha = anio+"-"+ mes+"-"+dia;

    return fecha;
}

 function conviertefechaparabdd(fecharecibidatexto) {
    fec = fecharecibidatexto;

    dia = fec.substring(0, 2);
    mes = fec.substring(3, 5);
    mes -= 1;//resto porque luego Date funciona como mes 0 a enero
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;
    anio = fec.substring(6, 10);
    fecha = new Date(anio, mes, dia);

    return fecha;
}

function conviertefechahispana(fecharecibidatexto) {
    fec = fecharecibidatexto;

    anio    = fec.substring(0, 4);
    mes     = fec.substring(5, 7);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;

    dia     = fec.substring(8, 10);
    if(dia.length < 2)
    dia = "0" + dia;

    fecha =dia+"-"+mes+"-"+anio;
    return fecha;
}

function conviertefechahispanayhora(fecharecibidatexto) {
    fec = fecharecibidatexto;
    anio    = fec.substring(0, 4);
    mes     = fec.substring(5, 7);
    mes = mes.toString();
    if(mes.length < 2)
    mes = "0" + mes;

    dia     = fec.substring(8, 10);
    if(dia.length < 2)
    dia = "0" + dia;

    hora = fec.substring(11,16);
    fecha =dia+"-"+mes+"-"+anio + " " + hora;
    return fecha;
}

function FechaActualddmmyyyy(){

  const tiempotranscurrido = Date.now();
  const hoy = new Date(tiempotranscurrido);
  hoy.toLocaleDateString();
  return FormatoFecha(hoy,"dd/mm/yyyy");
  
}

function FechaActual(){

    const tiempotranscurrido = Date.now();
    const hoy = new Date(tiempotranscurrido);
    return hoy.toLocaleDateString();
    
  
}

function FormatoFecha(fecha, formato){
    const map = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
    }
    return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
}

function DiaSemanaYMD(fecha){
    
    fecha = new Date(fecha);
    let fechaexacta = new Date(fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()));

    let dia=fechaexacta.getDay()
    let dialetra='';

    diasem=new Object();
    diasem.diavalor =dia;
    switch(dia)
    {
        case 0 :
            dialetra = "Domingo";
            break;
        case 1 :
            dialetra = "Lunes";
            break;
        case 2 :
            dialetra = "Martes";
            break;
        case 3 :
            dialetra = "Miércoles";
            break;
        case 4 :
            dialetra = "Jueves";
            break
        case 5 :
            dialetra = "Viernes";
            break
        case 6 :
            dialetra = "Sábado";
            break;
    }
    diasem.diatexto =dialetra;
    return diasem;
}

function TraeValorDolar()
{
    archivodeconsulta = 'configuracion.php';
    tipoconsulta = 'cotizaciondolar';

    let datosconsulta = {tipo : tipoconsulta}

    fetch("./controladores/" + archivodeconsulta +"?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response => {return response.json();})
    .then(data => 
    {
        if(data!=undefined)
        {
            if(data[0] != "desconocido")
            {
                vd = data[0].valordolar;
                try{

                    ldvalordolar.value = vd;
                }catch(e){}
            }
        }
        else{
            return false;
        }
    })
    .catch(function(error){console.log(error);});
}


function TraeTerminosCondiciones()
{
    archivodeconsulta = 'configuracion.php';
    tipoconsulta = 'terminoscondiciones';

    let datosconsulta = {tipo : tipoconsulta}

    fetch("./controladores/" + archivodeconsulta +"?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response => {return response.json();})
    .then(data => 
    {
        if(data!=undefined)
        {
            if(data[0] != "desconocido")
            {
                teco = data[0].terminoscondiciones;
                try{
                    ldterminoscondiciones.value = teco;
                }catch(e){}
            }
        }
        else{
            return false;
        }
    })
    .catch(function(error){console.log(error);});
}

function exportTableToExcel(tableID, filename)
{
    if(filename != '')
    {
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';

        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }

        Swal.fire(
                'Excelente',
                'Ya tienes la descarga!!!',
        )
    }else{

        Swal.fire(
            'Atención!',
            'Seleccione primero una consulta.',
            )
    }
}

function Rellenar(texto,cantidad,caracter){

    cantidad = parseInt(cantidad);
    while(texto.length < cantidad)
    {
        texto = caracter+texto;
    }
    return texto;
}

class AleatorioMinSeg{
    
    constructor(){
        this.hoy= new Date();
    }
    
    static clave(){

        let hoy = new Date();
        let minutos = hoy.getMinutes();
        if(minutos<10) minutos= "0"+minutos;

        let segundos= hoy.getSeconds();
        if(segundos<10)segundos="0"+segundos;

        return minutos+segundos;
    }
}

class Aleatorio{

    constructor (longitud){
        this.cadena = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this.longitud =0;
        this.clave='';
    }

    static clave(longitud)
    {
        let clave='';
        const cadena = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i=0;i < longitud;i++)
        {
            let aleatorio = Math.floor(Math.random() * cadena.length);
            clave += cadena.substring(aleatorio,aleatorio+1);

        }
        return clave;
    }
}

class AleatorioNumeros{

    constructor (longitud){
        this.cadena = "123456789";
        this.longitud =0;
        this.clave='';
    }

    static clave(longitud)
    {
        let clave='';
        const cadena = "123456789";

        for(let i=0;i < longitud;i++)
        {
            let aleatorio = Math.floor(Math.random() * cadena.length);
            clave += cadena.substring(aleatorio,aleatorio+1);

        }
        return clave;
    }
}

function Modifica(tabla,campo,valor,tipovalor,campocriterio,valorcriterio,tipocriterio){
    archivodeconsulta = 'modifica.php';
    tipo = "modificar";
    let datosconsulta = {tipo : tipo,tabla:tabla,campo: campo,valor:valor,tipovalor:tipovalor,campocriterio:campocriterio,valorcriterio:valorcriterio,tipocriterio:tipocriterio}
    // console.log(datosconsulta);
    fetch("./controladores/" + archivodeconsulta +"?n="+ version,{method:'POST',body: JSON.stringify( datosconsulta ),headers:{'Content-Type':'application/json'}})   
    .then(response =>{if(response.statusText == 'OK'){}return response.text();
    }).then(data => {
        if(data == 1){
            
        }
    })
    .catch(function (error){ console.log(error); });
}

async function getBase64ImageFromURL(url)
{
    const data = await fetch(url);
    const blob = await data.blob();
    
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
            const base64data = reader.result;   
            resolve(base64data);
        }
    });
}  

function EliminarImagen(imagenpasada)
{
    datosconsulta = {imagen:imagenpasada}
    fetch('./controladores/eliminarimagen.php', {method: "POST", body:JSON.stringify( datosconsulta ) })
    .then((response)=>response.json())
    .then(data =>{
        console.log(data);
    })
    .catch(function (error){ console.log(error); });
}

function DiasDelMes(anio,mes){

    if ((mes === "Enero") ||
    (mes === "Marzo") ||
    (mes === "Mayo") ||
    (mes === "Julio") ||
    (mes === "Agosto") ||
    (mes === "Octubre") ||
    (mes === "Diciembre")
) { diasdelmes = 31;} 
else if (
    (mes === "Abril") |
    (mes === "Junio") |
    (mes === "Setiembre") |
    (mes === "Noviembre")
) { diasdelmes = 30;
} else {
    var bisiesto = new Date(anio, 1, 29).getMonth() == 1;
    bisiesto ? (diasdelmes = 29) : (diasdelmes = 28);
}
    return dias;
}

function BP(pantalla,tipopermiso){
    permitido = false;
    
    for(a=0;a<_arpe.length;a++)
    {
        if(_arpe[a].pantalla == pantalla)
        {
            if(tipopermiso=="X") if(_arpe[a].siacceso   == 1) permitido =   true;
            if(tipopermiso=="A") if(_arpe[a].siagrega   == 1) permitido =   true;
            if(tipopermiso=="E") if(_arpe[a].siedita    == 1) permitido =   true;
            if(tipopermiso=="B") if(_arpe[a].siborra    == 1) permitido =   true;
            if(tipopermiso=="C") if(_arpe[a].siconsulta == 1) permitido =   true;
        }
    }

    return permitido;
}

function EA(){
    permitido = false;
    
    for(a=0;a<_arpe.length;a++)
    {
        if(_arpe[a].esadministrador == 1)
        {
            permitido = true;
        }
    }

    return permitido;
}