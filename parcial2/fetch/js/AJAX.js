//crear objeto HTMLHttpRequest
//es el objeto principal que se ecarga
//de hacer las peticiones http de forma asincrona
const url="https://pokeapi.co/api/v2/pokemon";

const xhr = new XMLHttpRequest();

//configuramos que tipo  de peticion vamos a hacer
//parametro 1 esel tipo de peticion
//parametro 2 es el url a donde se hara la peticion
//parametro 3 es si sera asincrono

xhr.open('GET', url,true)

//establecemos la cabecera content-type para indicar que esperamos un JSON

xhr.setRequestHeader('Content-type', 'application/json');
//es definir la funcion que se ejecutara cuando el estado de la peticion cambie

xhr.onreadystatechange =()=>{
    //verificamos el estado de la peticion
    //0 = unset, 1 = opened, 2= header_recived
    //3 =loading, 4 = done
    if(xhr.status === 4){

        if(xhr.status >= 200 && xhr.status < 300){
            const respuesta =JSON.parse(xhr.responseText);

            console.log(respuesta);
        }
        else{
            console.error('Error HTTP: ', xhr.status, xhr.statusText);
        }

    }
}
xhr.onerror = ()=>{

}

xhr.ontimeout = ()=>{}

xhr.ontimeout = 2000;

xhr.send(null)