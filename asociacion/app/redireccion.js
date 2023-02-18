
const atletas = document.getElementById('atletas');
const administradores = document.getElementById('administradores');
const logo = document.getElementById('logo');

atletas.addEventListener('click',()=>{
    
    location.assign("users/src/index.html?a=22");
})

administradores.addEventListener('click',()=>{
    
    location.assign("login/src/index.html?a=22");
})

logo.addEventListener('click',()=>{
    
    location.assign("/");
})
