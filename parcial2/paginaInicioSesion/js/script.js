const contenedor = document.querySelector("#contenedor");

//arreglo donde se guardaran los usuarios
const Usuarios = [];

//cuando carga la pagina revisamos si hay sesion
if(localStorage.getItem("usuario")){
    mostrarInicio();
}else{
    mostrarLogin();
}


//FORMULARIO LOGIN
function mostrarLogin(){

contenedor.innerHTML = `
<h2>Iniciar Sesión</h2>

<input type="text" id="correo" placeholder="Correo">
<input type="password" id="password" placeholder="Contraseña">

<button id="btn_login">Entrar</button>

<p>No tienes cuenta? <a href="#" id="ir_registro">Registrarse</a></p>
`;

document.querySelector("#btn_login").addEventListener("click", iniciarSesion);
document.querySelector("#ir_registro").addEventListener("click", mostrarRegistro);

}


//FORMULARIO REGISTRO
function mostrarRegistro(){

contenedor.innerHTML = `
<h2>Registro</h2>

<input type="text" id="correo" placeholder="Correo">
<input type="password" id="password" placeholder="Contraseña">

<button id="btn_registro">Guardar</button>

<p>Ya tienes cuenta? <a href="#" id="ir_login">Iniciar sesión</a></p>
`;

document.querySelector("#btn_registro").addEventListener("click", registrarUsuario);
document.querySelector("#ir_login").addEventListener("click", mostrarLogin);

}


//GUARDAR USUARIO
function registrarUsuario(){

const correo = document.querySelector("#correo").value;
const password = document.querySelector("#password").value;

Usuarios.push({
    correo: correo,
    password: password
});

alert("Usuario registrado");

mostrarLogin();

}


//INICIAR SESION
function iniciarSesion(){

const correo = document.querySelector("#correo").value;
const password = document.querySelector("#password").value;

for(let i=0; i<Usuarios.length; i++){

    if(Usuarios[i].correo === correo && Usuarios[i].password === password){

        localStorage.setItem("usuario", correo);

        mostrarInicio();

        return;
    }
}

alert("Usuario incorrecto");

}


//PAGINA PRINCIPAL
function mostrarInicio(){

contenedor.innerHTML = `
<h2>Bienvenido</h2>

<button id="cerrar">Cerrar sesión</button>

<h3>Películas</h3>

<div id="tarjetas"></div>
`;

document.querySelector("#cerrar").addEventListener("click", cerrarSesion);

peticionAPI();

}


//CERRAR SESION
function cerrarSesion(){

localStorage.removeItem("usuario");

mostrarLogin();

}


//PETICION FETCH A OTRA API
function peticionAPI(){

const url = "https://api.tvmaze.com/shows";

fetch(url)
.then(respuesta=>{
    if(respuesta.ok)
        return respuesta.json();
})
.then(datos=>{

    for(let i=0; i<10; i++){

        crearTarjeta(datos[i]);

    }

})
.catch(error=>{
    console.error(error);
})

}


//CREAR TARJETAS
function crearTarjeta(serie){

const cont = document.querySelector("#tarjetas");

const card = document.createElement("div");

card.innerHTML = `
<h3>${serie.name}</h3>
<img src="${serie.image.medium}">
<p>${serie.language}</p>
`;

cont.appendChild(card);

}