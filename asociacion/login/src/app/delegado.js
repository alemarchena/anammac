import {Info} from './formulario.js';

let contenidoCredencial = document.querySelector('#contentcre');

export const Delegado = ((info)=>{

   while(contenidoCredencial.firstChild){
      contenidoCredencial.removeChild(contenidoCredencial.firstChild);
   }

    const boton =`
         <a id="verdelegado" class="btn btn-success mt-3" href="#">Ingreso delegado autorizado</a>
      `;

      const htmlcredencial = contenidoCredencial.innerHTML ;
      contenidoCredencial.innerHTML = boton + htmlcredencial;
})

let paquete = [];

export const RedirigirDelegado = ( async (info)=>{
    
   let direccion = '/asociacion/delegado/paneldelegado.php?a=8';

   let item = new Object();
   item.idusuario=info.idusuario;
   item.usuario=info.usuario;
   item.email=info.email;
   item.estaautorizado=info.estaautorizado;
   item.esadministrador=info.esadministrador;
   item.idestado=info.idestado;

   paquete.push(item);

   fetch('./controladores/puente.php?a=8',
   {method:'POST',body:JSON.stringify({paquete:paquete}),headers:{'Content-Type':'application/json'}})
   .then((response)=>{
      if(response.status==200)
      {
            window.open(direccion,'_self');
      }

   })
   .catch((e)=>{      
      console.log(e);
   })


   
});