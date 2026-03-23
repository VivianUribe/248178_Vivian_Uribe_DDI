////////////////// CONTENEDOR ////////////////
const contenedor = document.querySelector("#contenedor_productos");

// //////////////// DATOS ////////////////
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuario = JSON.parse(localStorage.getItem("usuarioActual"));

// SI NO HAY USUARIO = FUERA
if (!usuario) {
    window.location.href = "index.html";
}

////////////////// MOSTRAR USUARIO ////////////////
document.querySelector("#foto_perfil").src = usuario.foto || "https://via.placeholder.com/40";

if (usuario.admin) {
    document.querySelector("#nombre_admin").textContent = usuario.nombre;
    document.querySelector("#nombre_admin").style.display = "inline";

    document.querySelector("#nombre_usuario").style.display = "none";
    document.querySelector("#titulo").textContent = "Panel Administrador";

} else {
    document.querySelector("#nombre_usuario").textContent = usuario.nombre;
    document.querySelector("#nombre_usuario").style.display = "inline";

    document.querySelector("#nombre_admin").style.display = "none";
    document.querySelector("#titulo").textContent = "Panel Visitante";

    document.querySelector("#zona_admin").style.display = "none";
}
////////////////// MOSTRAR PRODUCTOS ////////////////
function mostrarProductos() {
    contenedor.innerHTML = "";

    productos.forEach((p, index) => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="${p.foto}" style="width:100%; height:120px; object-fit:cover;">
                <h3>${p.nombre}</h3>
                <p>$${p.precio}</p>
                <p>${p.descripcion}</p>
                ${
                    usuario.admin 
                    ? `<button onclick="eliminar(${index})">Eliminar</button>` 
                    : ""
                }
            </div>
        `;
    });
}

mostrarProductos();

////////////////// ELIMINAR (SOLO ADMIN) ////////////////
function eliminar(index) {
    if (!usuario.admin) return;

    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
}

////////////////// SUBIR JSON (SOLO ADMIN) ////////////////
if (usuario.admin) {
    document.querySelector("#subir_json")?.addEventListener("click", () => {
        const archivo = document.querySelector("#archivo_productos").files[0];

        if (!archivo) return alert("Selecciona un JSON");

        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const datos = JSON.parse(e.target.result);

                datos.forEach(p => {
                    if (p.nombre && p.precio && p.descripcion && p.foto) {
                        productos.push(p);
                    }
                });

                localStorage.setItem("productos", JSON.stringify(productos));
                mostrarProductos();

                alert("Productos cargados correctamente");

            } catch (error) {
                alert("Error en el JSON");
            }
        };

        reader.readAsText(archivo);
    });
}

////////////////// EDITAR PERFIL  ////////////////
document.querySelector("#guardar_perfil").addEventListener("click", () => {
    const nuevoNombre = document.querySelector("#nuevo_nombre").value.trim();
    const archivoFoto = document.querySelector("#nueva_foto").files[0];

    const index = usuarios.findIndex(u => u.correo === usuario.correo);

    if (index === -1) return alert("Usuario no encontrado");

    if (nuevoNombre) {
        usuario.nombre = nuevoNombre;
        usuarios[index].nombre = nuevoNombre;
    }

    if (archivoFoto) {
        const reader = new FileReader();

        reader.onload = function(e) {
            usuario.foto = e.target.result;
            usuarios[index].foto = e.target.result;

            localStorage.setItem("usuarioActual", JSON.stringify(usuario));
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            location.reload();
        };

        reader.readAsDataURL(archivoFoto);
    } else {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        location.reload();
    }
});

////////////////// LOGOUT ////////////////
document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "../index.html";
});