
const contenedor = document.querySelector("#contenedor");

const Usuarios = [];

//boton login
document.querySelector("#btn_login").addEventListener("click", iniciarSesion);

//link para registro
document.querySelector("#ir_registro").addEventListener("click", mostrarRegistro);


//se muestra el form de registro
function mostrarRegistro() {

     //lo que pasa aqui es que reemplazamos el contenido del contenedor por el formulario de registro
     
    contenedor.innerHTML = `
        <h2>Registro</h2>
        <form id="form_registro">
            <input type="text" name="nombre" placeholder="Nombre">
            <input type="text" name="apellido" placeholder="Apellido">
            <input type="email" name="correo" placeholder="Correo">
            <input type="password" name="contrasena" placeholder="Contraseña">
            <input type="password" name="confirmar" placeholder="Confirmar contraseña">
            <button type="button" id="btn_registro">Registrarse</button>
        </form>

        <p>Ya tienes cuenta? <span id="ir_login">Iniciar sesión</span></p>
    `;

    document.querySelector("#btn_registro").addEventListener("click", registrarUsuario);
    document.querySelector("#ir_login").addEventListener("click", mostrarLogin);
}

//aqui se vuelve a mostrar el login
function mostrarLogin() {

    contenedor.innerHTML = `
        <h2>Iniciar sesión</h2>
        <form id="form_login">
            <input type="email" name="correo" placeholder="Correo">
            <input type="password" name="contrasena" placeholder="Contraseña">
            <button type="button" id="btn_login">Entrar</button>
        </form>

        <p>No tienes cuenta? <span id="ir_registro">Registrate</span></p>
    `;

    document.querySelector("#btn_login").addEventListener("click", iniciarSesion);
    document.querySelector("#ir_registro").addEventListener("click", mostrarRegistro);
}

////////////LOGIN///////////////
function iniciarSesion() {

    const form = document.querySelector("#form_login");
    const datosFormulario = new FormData(form);
    const datos = Object.fromEntries(datosFormulario.entries());

    if (!datos.correo || !datos.contrasena) {
        alert("Ingresa todos los datos");
        return;
    }

    let usuarioEncontrado = null;

    //recorremos el arreglo de usuarios
    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].correo === datos.correo) {
            usuarioEncontrado = Usuarios[i];
        }
    }

    if (!usuarioEncontrado) {
        alert("No estás registrado");
        return;
    }

    if (usuarioEncontrado.contrasena !== datos.contrasena) {
        alert("Contraseña incorrecta");
        return;
    }

    alert("Sesión iniciada correctamente");
}

////////REGISTRO/////////
function registrarUsuario() {

    const form = document.querySelector("#form_registro");
    const datosFormulario = new FormData(form);
    const datos = Object.fromEntries(datosFormulario.entries());

    if (!datos.nombre || !datos.apellido || !datos.correo || !datos.contrasena || !datos.confirmar) {
        alert("Ingresa todos los datos");
        return;
    }

    //contraseñas coincidan
    if (datos.contrasena !== datos.confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }
//se ve si el correo esta repetido
    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].correo === datos.correo) {
            alert("Este correo ya está registrado");
            return;
        }
    }

    Usuarios.push({
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        contrasena: datos.contrasena
    });

    alert("Registro exitoso");

    console.log(Usuarios);

    mostrarLogin();
}