let contenidoCredencial = document.querySelector('#contentcre');

export const Credencial = (()=>{

   while(contenidoCredencial.firstChild){
      contenidoCredencial.removeChild(contenidoCredencial.firstChild);
   }

    const boton =`
         <a id="vercredencial" class="btn btn-success mt-3" href="#">Panel afiliados</a>
      `;

   const botoneventos =`
      <a id="vereventos" class="btn btn-success mt-3" href="#">Administrar eventos</a>
   `;

   const htmlcredencial = contenidoCredencial.innerHTML ;

   contenidoCredencial.innerHTML = boton + botoneventos + htmlcredencial;
     
})

let paquete = [];

export const Redirigir = ( async (info)=>{
    
   let direccion = '/asociacion/administracion/panel.php?a=24';

   let item = new Object();
   item.idusuario=info.idusuario;
   item.usuario=info.usuario;
   item.email=info.email;
   item.estaautorizado=info.estaautorizado;
   item.esadministrador=info.esadministrador;
   item.idestado=info.idestado;

   paquete.push(item);

   fetch('./controladores/puente.php?a=24',
   {method:'POST',body:JSON.stringify({paquete:paquete}),headers:{'Content-Type':'application/json'}})
   .then((response)=>{
      if(response.status==200){
            window.open(direccion,'_self');
      }
   })
   .catch((e)=>{      
      console.log(e);
   })
   
});

export const RedirigirEventos = ( async (info)=>{
    
   let direccion = '/asociacion/eventos/panel.php?a=24';
   // let direccion = '/anammac/asociacion/eventos/panel.php?a=24';

   let item = new Object();
   item.idusuario=info.idusuario;
   item.usuario=info.usuario;
   item.email=info.email;
   item.estaautorizado=info.estaautorizado;
   item.esadministrador=info.esadministrador;
   item.idestado=info.idestado;

   paquete.push(item);

   fetch('./controladores/puente.php?a=24',
   {method:'POST',body:JSON.stringify({paquete:paquete}),headers:{'Content-Type':'application/json'}})
   .then((response)=>{
      if(response.status==200){
            window.open(direccion,'_self');
      }
   })
   .catch((e)=>{      
      console.log(e);
   })
   
});