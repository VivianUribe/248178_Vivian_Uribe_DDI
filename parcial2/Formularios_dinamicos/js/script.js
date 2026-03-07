const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido");
const boton_guardar = document.querySelector("#boton_guardar");

const formulario= document.querySelector("#form_2");

const Usuarios = [
    {
        nombre: "Carlos",
        apellido: "Chavez",
        correo: "carlos@gmail.com",
        constraseña: "carlos123",
    },
    {
        nombre: "Fernanda",
        apellido: "Lopez",
        correo: "Fernanda@gmail.com",
        constraseña: "Fernanda123",
    },
    {
        nombre: "Luis",
        apellido: "Martinez",
        correo: "luis@gmail.com",
        constraseña: "luis123",
    },
    {
        nombre: "Sofia",
        apellido: "Ramirez",
        correo: "sofia@gmail.com",
        constraseña: "sofia123",
    },
    {
        nombre: "Diego",
        apellido: "Hernandez",
        correo: "diego@gmail.com",
        constraseña: "diego123",
    },
    {
        nombre: "Valeria",
        apellido: "Torres",
        correo: "valeria@gmail.com",
        constraseña: "vale123",
    },
    {
        nombre: "Jorge",
        apellido: "Castro",
        correo: "jorge@gmail.com",
        constraseña: "jorge123",
    },
    {
        nombre: "Elena",
        apellido: "Morales",
        correo: "elena@gmail.com",
        constraseña: "elena123",
    },
    {
        nombre: "Pablo",
        apellido: "Vega",
        correo: "pablo@gmail.com",
        constraseña: "pablo123",
    },
    {
        nombre: "Mariana",
        apellido: "Cruz",
        correo: "mariana@gmail.com",
        constraseña: "mariana123",
    }
];



boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();
    const nuevoNombre = document.querySelector("input_txt_nombre");
    const nuevoApellido = document.querySelector("input_txt_apellido");
    const nuevoCorreo = document.querySelector("input_txt_correo");
    const nuevoContraseña = document.querySelector("input_txt_contraseña");



    console.log(e.target.value);
    //CREA UN OBJETO USUARIO
    const usuario = new Usuario(nombre.value, apellido.value);

    console.log(usuario);
    //METODO DE EL OBJETO DOCUMENT QUE SE ENCARGA DE CREAR ELEMENTOS 
    const nombre_info = document.createElement("h2");
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);

    guardarDatos(usuario);

    guardarDatos = ()=> {
        console.log("modificando funcion")
    };
    guardarDatos();
    Usuarios.push({
        nombre: nuevoNombre.value,
        apellido:nuevoApellido.value,
        correo: nuevoCorreo.value,
        constraseña: nuevoContraseña.value

    })

    
})

function cambiarNumero(event){
    const numeroElementos=event.target.value;
    const contenido = document.querySelector("#contenedor_correos")
      contenido.innerHTML="";//limpia la etiqueta y su contenido antes de agregar
    for(let i = 1; i <= event.target.value; i++){
        //se agrega contenido usando la insercion de html por medio del
        //inner html, que agrega todo lo que esta dentro del htmlAgregar
        //este metodo reemplaza todo o que esta dentro de la etiqueta por
        //lo nuevo que se quiere agregar

      
    const htmlAgregar = ` <label for="correo-${i}">Ingresa el correo ${i}</label>
            <input type="email" name="correo-${i}" id="correo-${i}">
            <br>`;
            contenido.innerHTML += htmlAgregar;
            }
}

//definimos una clase con sus propiedades y metodos
class Usuario{
    constructor(nom,ape, correo, contra){
        this.nombre = nom;
        this.apellido= ape;
        this.correo= correo;
        this.constraseña= contra;

    }
    MostrarDatos(){
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}
//creando un objeto y lo estamos asignando a una constat
let usuario2 ={
    Nombre : "Vivian",
    Apellido: "Uribe",
    Edad: 20,
    MostrarDatos: ()=>{
        console.log(`Nombre: ${usuario2.Nombre} Apellido: ${usuario2.Apellido} Edad:${usuario2.Edad}`)
    }
}

//nos permite guardar funciones dentro de una variable o constante
let guardarDatos= (usuario)=>{
    //llamamos un metodo definido en una clase
    usuario.MostrarDatos();
    usuario2.MostrarDatos();
    usuario2.Nombre= "nuevo nombre";
    usuario2.MostrarDatos();
}

document.addEventListener('DOMContentLoaded',()=>{
    const contenedor_usuarios = document.querySelector("#contenedor_usuarios");


    for(let i=0; i<Usuarios.length; i++){    
const contenedor_usuario = document.createElement("div");

    contenedor_usuario.id="contenedor_usuario";

    const nombre = document.createElement("label")
    nombre.textContent =" Nombre: ";
    contenidoNombre = document.createElement("span");
    contenidoNombre.textContent = Usuarios[i].nombre;
    
    

    const apellido = document.createElement("label"); 
    apellido.textContent=" Apellido: ";
    contenidoApellido = document.createElement("span");
    contenidoApellido.textContent= Usuarios[i].apellido;

   contenedor_usuario.onclick = (event) => {
    console.log("Correo:", Usuarios[i].correo);
    console.log("Contraseña:", Usuarios[i].constraseña);
};
    contenedor_usuario.appendChild(nombre);
    contenedor_usuario.appendChild(contenidoNombre);
     contenedor_usuario.appendChild(apellido);
    contenedor_usuario.appendChild(contenidoApellido);

    contenedor_usuarios.appendChild(contenedor_usuario);

    }

})

function leerDatos(){
    const datosFormulario = new FormData(formulario);

    const datos= Object.fromEntries(datosFormulario.entries());

   let usuarioNuevo= new Usuario(datos.nombre, datos.apellido, datos.correo, datos.constraseña);
    console.log(usuarioNuevo);
}

//crear un formulario de inicio de sesion y registro, usar el metodo de leer datos por el medio del FromData
//validar que se hayan ingresado todos los datos en los formularios
//y de ahi que aparezca un cuadro con un texto que diga sesion Iniciada correctamente