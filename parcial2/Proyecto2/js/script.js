////////////// CONTENEDOR PRINCIPAL ////////////
const contenedor = document.querySelector("#contenedor");

////////////// ARREGLO DE USUARIOS ////////////
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

////////////// MOSTRAR LOGIN AL INICIO ////////////
mostrarLogin();

function mostrarLogin() {
    contenedor.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <input type="email" id="correo" placeholder="Correo">
        <input type="password" id="password" placeholder="Contraseña">
        <button id="btn_login">Entrar</button>
        <span class="link" id="ir_registro">Registrarse</span>
        <p id="mensaje"></p>
    `;

    document.querySelector("#btn_login").addEventListener("click", login);
    document.querySelector("#ir_registro").addEventListener("click", mostrarRegistro);
}

function mostrarRegistro() {
    contenedor.innerHTML = `
        <h2>Registro</h2>
        <input type="text" id="nombre" placeholder="Nombre completo">
        <input type="email" id="correo" placeholder="Correo">
        <input type="password" id="password" placeholder="Contraseña">
        <input type="password" id="confirmar" placeholder="Confirmar contraseña">
        <input type="file" id="foto">
        <center>
        <img id="preview_foto" width="50" src="https://via.placeholder.com/50">
 </center>
        <label>
            <input type="checkbox" id="admin"> Administrador
        </label>

        <button id="btn_registro">Registrar</button>
        <span class="link" id="ir_login">Volver a login</span>
        <p id="mensaje"></p>

        <style>
        *{
        color: #7CFC00;
        }
        </style>
    `;

    const fotoInput = document.querySelector("#foto");
    const preview = document.querySelector("#preview_foto");

    fotoInput.addEventListener("change", () => {
        const archivo = fotoInput.files[0];

        if (archivo) {
            const reader = new FileReader();
            reader.onload = e => preview.src = e.target.result;
            reader.readAsDataURL(archivo);
        }
    });

    document.querySelector("#btn_registro").addEventListener("click", registrar);
    document.querySelector("#ir_login").addEventListener("click", mostrarLogin);
}

////////////// REGISTRO ////////////
function registrar() {
    const nombre = document.querySelector("#nombre").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const password = document.querySelector("#password").value;
    const confirmar = document.querySelector("#confirmar").value;
    const admin = document.querySelector("#admin").checked;
    const fotoInput = document.querySelector("#foto");
    const mensaje = document.querySelector("#mensaje");

    if (!nombre || !correo || !password || !confirmar) {
        mensaje.textContent = "Completa todos los campos";
        return;
    }

    if (password !== confirmar) {
        mensaje.textContent = "Las contraseñas no coinciden";
        return;
    }

    const archivoFoto = fotoInput.files[0];

    if (archivoFoto) {
        const reader = new FileReader();
        reader.onload = e => {
            guardarUsuario(nombre, correo, password, admin, e.target.result, mensaje);
        };
        reader.readAsDataURL(archivoFoto);
    } else {
        guardarUsuario(nombre, correo, password, admin, "", mensaje);
    }
}

function guardarUsuario(nombre, correo, password, admin, foto, mensaje) {
    const nuevoUsuario = { nombre, correo, password, admin, foto };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "Usuario registrado correctamente";
    setTimeout(mostrarLogin, 1000);
}

////////////// LOGIN ////////////
function login() {
    const correo = document.querySelector("#correo").value.trim();
    const password = document.querySelector("#password").value;
    const mensaje = document.querySelector("#mensaje");

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        if (usuario.admin) {
            mensaje.textContent = "Entrando como Administrador...";
            setTimeout(() => window.location.href = "1admin/admin.html", 1000);
        } else {
            mensaje.textContent = "Entrando como Visitante...";
            setTimeout(() => window.location.href = "1admin/admin.html", 1000);
        }
    } else {
        mensaje.textContent = "Datos incorrectos";
    }
}