const url="https://pokeapi.co/api/v2/pokemon";

const contenedor = document.querySelector("#contenedor_pokemones");

//peticion fetch
fetch(url).then(
    //primer respuesta de la peticion
    respuesta => {
        if (respuesta.ok)
            return respuesta.json();
    }
    //desenvolviendo los datos obtenidos de la peticion
).then(
    datos => {
        
        //hacer otra peticion
        for(let i =0; i<datos.results.length; i++){
            console.log(datos.results[i].url);

            Peticion2(datos.results[i].url)

            
            

        }
        
    }
).catch(error => {
    console.error(error.message);
})

function Peticion2(url){
    fetch(url).then(respuesta =>{
        if(respuesta.ok)
            return respuesta.json()
    }).then(datos => {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    // Imagen
    const imagen = document.createElement("img");
    imagen.src = datos.sprites.front_default;

    // Nombre
    const nombre = document.createElement("h3");
    nombre.textContent = datos.name;

    // Altura
    const altura = document.createElement("p");
    altura.textContent = "Altura: " + datos.height;

    // Peso
    const peso = document.createElement("p");
    peso.textContent = "Peso: " + datos.weight;

    // Habilidades
    const habilidades = document.createElement("p");
    habilidades.textContent = "Habilidades: ";

    for(let i = 0; i < datos.abilities.length; i++){
        habilidades.textContent += datos.abilities[i].ability.name + " ";
    }

    // Armar tarjeta
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(altura);
    tarjeta.appendChild(peso);
    tarjeta.appendChild(habilidades);

    // Agregar al contenedor
    contenedor.appendChild(tarjeta);
})

}