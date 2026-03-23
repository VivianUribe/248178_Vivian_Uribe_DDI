//promesa 
const pantallaCarga = new Promise((resolve, reject) => {
    let cargando = true;
    console.log("Cargando...");
    setTimeout(function(){
        if(cargando){
            resolve("La carga terminó");
        }
        else{
            reject("Error en la carga");
        }

    },2000); 

});
//cuando la promesa se cumple
pantallaCarga.then((resultado) => {
    console.log(resultado);
}).catch((error) => {

    console.log(error);

});