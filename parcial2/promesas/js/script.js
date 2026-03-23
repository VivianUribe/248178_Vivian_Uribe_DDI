const promesa= new Promise((resolve, reject) => {
let exito = true;
setTimeout(function(){
    if(exito){
        resolve("la tarea finalizo")
    }
    else{
        reject("la tarea fallo")
    }
}, 1000)    
});

promesa.then((resultado) =>{
    console.log(resultado)
}).catch((error) =>{
    console.log(error);
})

/*let peticionFetch = new Promise((resolve, reject) => {
    const url= "https://pokeapi.co/api/v2/pokemon";
    fetch(url).then(resultado =>{
        if(resultado.ok)
            return resultado.json()
    }).then(datos => {

    }).catch(error => {
        reject(error);
    })
});
peticionFetch.then(resultadoPeticion=>{
    console.log(resultadoPeticion);
}).catch(error =>{
    console.log(error);
})*/
//promesa para una pantalla de carga con espera de 1 o 2 segundos