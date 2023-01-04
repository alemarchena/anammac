
//--------------------------- Interfaz -------------------------------
export class UI{

    DetenerCarrusel(){
        const myCarouselElement = document.querySelector('#carrusel')
        const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: false,
        touch:true,//admite interacciones de dedo en dispositivos moviles
        ride:false,//cicla automaticamente
        wrap: false//permite loopear el slider
        })
    }
    
    VerificaLimitesCarrusel(cuenta,movimiento){
        const carrusel =document.querySelectorAll('.carousel-item');
        if(movimiento>0)
        {
            if(cuenta >= carrusel.length )
            cuenta =  carrusel.length;
        }else{
            if(cuenta < 0 )
            cuenta =  0;
        }
        return cuenta;
    }

    ControlaSiguientePrevio(cuenta){
        const carrusel =document.querySelectorAll('.carousel-item');

        //si llego al inicio previo
        if(cuenta<=0){
            previo.classList.remove('text-black');
            previo.classList.add('text-muted');
            
        }else
        {
            previo.classList.remove('text-muted');
            previo.classList.add('text-black');
        }

        //Si llego al final siguiente
        if(cuenta>=carrusel.length-1){
            siguiente.classList.remove('text-black');
            siguiente.classList.add('text-muted');
            
        }else
        {
            siguiente.classList.remove('text-muted');
            siguiente.classList.add('text-black');
        }
    }

    Mensajero(contador){

        const mensaje = document.getElementById('mensaje');
        let contenido = '';
        
        switch(contador)
        {
            case 0:
                contenido = 'El usuario puede ser usado para ingresar al sistema';
                break;
            case 1:
                contenido = '';
                break;
            
        }
        mensaje.innerHTML = contenido;
    }
    
}

let contador=0;
const ui = new UI();
ui.DetenerCarrusel();
ui.Mensajero(contador);

document.querySelector('#carrusel').addEventListener('slid.bs.carousel', event => {
    const ui = new UI();
    if(event.direction == 'left')
    {
        contador +=1;
        contador = ui.VerificaLimitesCarrusel(contador,1);
    }else{
        contador -=1;
        contador = ui.VerificaLimitesCarrusel(contador,-1);
    }
   
    ui.ControlaSiguientePrevio(contador);
    ui.Mensajero(contador);

    event.preventDefault();
})


const previo = document.querySelector('#previo');
const siguiente = document.querySelector('#siguiente');