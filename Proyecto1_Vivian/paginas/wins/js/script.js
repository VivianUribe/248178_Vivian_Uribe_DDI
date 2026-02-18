
// Seleccionamos elementos 
const bannerPromocional = document.querySelector(".banner_parallax");
const botonAplicarCodigo = document.querySelector(".boton_aplicar");
const campoCodigoDescuento = document.querySelector(".campo_codigo");
const mensajeResultado = document.querySelector(".mensaje_descuento");


///// PARALLAX CON JS /////


window.addEventListener("scroll", () => {

  // Guardamos posición del scroll
  const posicionScrollVertical = window.scrollY;

  // Movemos el fondo del banner
  bannerPromocional.style.backgroundPositionY =
    posicionScrollVertical * 0.4 + "px";
});


//// ESTRUCTURA DE CONTROL ////


botonAplicarCodigo.addEventListener("click", () => {

    // Valor escrito por el usuario
  const codigoIngresadoUsuario = campoCodigoDescuento.value;

 
  switch(codigoIngresadoUsuario) {

    case "WIN10":
      mensajeResultado.textContent = "Obtienes 10% de descuento";
      break;

    case "WIN20":
      mensajeResultado.textContent = "Obtienes 20% de descuento";
      break;

    default:

    // IF
      if (codigoIngresadoUsuario === "") {
        mensajeResultado.textContent = "Introduce un código";
      } else {
        mensajeResultado.textContent = "Código no válido";
      }

      break;
  }
});

