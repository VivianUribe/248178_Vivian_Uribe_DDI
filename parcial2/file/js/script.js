/*function LeerArchivo(event){
    console.log(event.EventTarget.files[0]);
    if (archivo){
        if(archivo.type === "image/jpeg" || archivo.type === "image/png" ||
            archivo.type === "image/webp"
        ){
    const lectorArchivo = new FileReader();

    lectorArchivo.onload= (elemento) => {
        const url_imagen = elemento.target.result;
        const imagen = new Image();
        imagen.src = url_imagen;

    }

    lectorArchivo.readAsDataURL(archivo);
    }
    else{
        console.log("el tipo de archivo es invalido");

    }
}else{
console.log("no se leyp el archivo ");


    }

}*/
document.querySelector("#input-image").addEventListener('change',(event)=>{
    const url= LeerArchivo(event.target.files[0]);
    url.then((dato) => {
        const image = document.querySelector("#imagen-seleccionada");
        image.src = dato;

    }).catch(
        ()=>{
            console.log("algo salio mal");
        }
    )
    
})

function LeerArchivo(archivo) {
    return new Promise((resolve, reject) => {
     if (archivo){
   if(archivo.type === "image/jpeg" || archivo.type === "image/png" ||
            archivo.type === "image/webp"
        ){
    const lectorArchivo = new FileReader();

    lectorArchivo.onload= (elemento) => {
        const url_imagen = elemento.target.result;
        resolve(url_imagen);
    }
    lectorArchivo.readAsDataURL(archivo);
    }
    else{
        reject();
    }
    }
    else{
        reject();
    }
});
}

