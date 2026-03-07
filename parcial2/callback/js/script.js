//setTimeout(()=>{
    console.log("esto es un callback");
//},1000);

console.log("esto es el final")

class Usuario{
    constructor(nombre,correo){
        this.nombre = nombre;
        this.correo = correo;
    }
    callback(funcion){
        if(typeof funcion === "function"){
            funcion(this.nombre, this.correo)
        }

    }
}

const usuarioActual = new Usuario("Vivian Uribe Mendoza", "viv@gmail.com");

usuarioActual.callback((nombre, correo)=> {
    console.log("esta es la funcion que envio desde el objeto usuario actual", nombre, correo)
    
})