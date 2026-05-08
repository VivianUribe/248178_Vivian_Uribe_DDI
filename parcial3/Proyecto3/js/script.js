import { Cuadrado, Linea, Sticker, Circulo, Estrella, Borrador } from "./figura.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

let historial = [];
let redoStack = [];
let filtroActivo = null;
let elementoPreview = null;

let stickerURL = "";

const config = {
    colorLinea: "#000000",
    colorRelleno: "#ff0000",
    grosor: 5,
    opacidad: 1,
    soloBorde: false,
    soloRelleno: false
};

const opciones = {
    pincel: false,
    linea: false,
    circulo: false,
    cuadro: false,
    estrella: false,
    borrador: false,
    sticker: false,
};

let presionado = false;
let inicio = { x: 0, y: 0 };

// CONTROLES
document.querySelector("#color_linea").oninput = e => config.colorLinea = e.target.value;
document.querySelector("#color_relleno").oninput = e => config.colorRelleno = e.target.value;
document.querySelector("#grosor").oninput = e => config.grosor = parseInt(e.target.value);
document.querySelector("#opacidad").oninput = e => config.opacidad = parseFloat(e.target.value);
document.querySelector("#solo_borde").onchange = e => config.soloBorde = e.target.checked;
document.querySelector("#solo_relleno").onchange = e => config.soloRelleno = e.target.checked;

function cambiarOpcion(opcion) {
    for (let clave in opciones) opciones[clave] = false;
    opciones[opcion] = true;
}

// BOTONES
document.querySelector("#btn_pincel").onclick = () => cambiarOpcion("pincel");
document.querySelector("#btn_linea").onclick = () => cambiarOpcion("linea");
document.querySelector("#btn_cuadro").onclick = () => cambiarOpcion("cuadro");
document.querySelector("#btn_circulo").onclick = () => cambiarOpcion("circulo");
document.querySelector("#btn_estrella").onclick = () => cambiarOpcion("estrella");
document.querySelector("#btn_borrador").onclick = () => cambiarOpcion("borrador");

document.querySelector("#btn_sticker").onclick = () => {
    cambiarOpcion("sticker");
    document.querySelector("#input_sticker").click();
};

// ELEGIR IMAGEN
document.querySelector("#input_sticker").addEventListener("change", e => {
    const archivo = e.target.files[0];

    if (archivo) {
        stickerURL = URL.createObjectURL(archivo);
    }
});

// EVENTOS
canvas.addEventListener("mousedown", e => {
    inicio = { x: e.offsetX, y: e.offsetY };
    presionado = true;
});

canvas.addEventListener("mousemove", e => {

    if (!presionado) return;

    const fin = { x: e.offsetX, y: e.offsetY };

    // PINCEL
    if (opciones.pincel) {
        const linea = new Linea(
            {inicio:{...inicio}, fin:{...fin}},
            config.colorLinea,
            config.grosor,
            config.opacidad
        );

        historial.push(linea);
        inicio = {...fin};
        dibujarTodo();
        return;
    }

    // BORRADOR REAL
    if (opciones.borrador) {

        const borrador = new Borrador(
            {inicio:{...inicio}, fin:{...fin}},
            config.grosor + 10
        );

        historial.push(borrador);

        inicio = {...fin};

        dibujarTodo();

        return;
    }

    // PREVIEW
    if (opciones.linea) {
        elementoPreview = new Linea(
            {inicio, fin},
            config.colorLinea,
            config.grosor,
            config.opacidad
        );
    }

    else if (opciones.cuadro) {
        elementoPreview = new Cuadrado({inicio, fin}, config);
    }

    else if (opciones.circulo) {
        elementoPreview = new Circulo({inicio, fin}, config);
    }

    else if (opciones.estrella) {
        elementoPreview = new Estrella({inicio, fin}, config);
    }

    else if (opciones.sticker && stickerURL) {
        elementoPreview = new Sticker({inicio, fin}, stickerURL);
    }

    dibujarTodo();

    if (elementoPreview) {
        elementoPreview.Dibujar(ctx);
    }
});

canvas.addEventListener("mouseup", () => {

    presionado = false;

    if (elementoPreview) {

        historial.push(elementoPreview);

        elementoPreview = null;

        redoStack = [];

        dibujarTodo();
    }
});

// DIBUJAR TODO
function dibujarTodo() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    historial.forEach(el => el.Dibujar(ctx));

    if (filtroActivo) aplicarFiltro(filtroActivo);
}

// FILTROS
function aplicarFiltro(tipo) {

    let img = ctx.getImageData(0,0,canvas.width,canvas.height);

    let d = img.data;

    for(let i=0;i<d.length;i+=4){

        let r=d[i], g=d[i+1], b=d[i+2];

        if(tipo==="bn"){
            let gris=(r+g+b)/3;
            d[i]=d[i+1]=d[i+2]=gris;
        }

        if(tipo==="rojo"){
            d[i+1]=0;
            d[i+2]=0;
        }

        if(tipo==="verde"){
            d[i]=0;
            d[i+2]=0;
        }

        if(tipo==="azul"){
            d[i]=0;
            d[i+1]=0;
        }

        if(tipo==="negativo"){
            d[i]=255-r;
            d[i+1]=255-g;
            d[i+2]=255-b;
        }

        if(tipo==="sepia"){
            d[i] = 0.393*r + 0.769*g + 0.189*b;
            d[i+1] = 0.349*r + 0.686*g + 0.168*b;
            d[i+2] = 0.272*r + 0.534*g + 0.131*b;
        }
    }

    ctx.putImageData(img,0,0);
}

// FILTROS
document.querySelector("#btn_bn").onclick = () => { filtroActivo="bn"; dibujarTodo(); }
document.querySelector("#btn_rojo").onclick = () => { filtroActivo="rojo"; dibujarTodo(); }
document.querySelector("#btn_verde").onclick = () => { filtroActivo="verde"; dibujarTodo(); }
document.querySelector("#btn_azul").onclick = () => { filtroActivo="azul"; dibujarTodo(); }
document.querySelector("#btn_sepia").onclick = () => { filtroActivo="sepia"; dibujarTodo(); }
document.querySelector("#btn_negativo").onclick = () => { filtroActivo="negativo"; dibujarTodo(); }
document.querySelector("#btn_sin_filtro").onclick = () => { filtroActivo=null; dibujarTodo(); }

// UNDO
document.querySelector("#btn_undo").onclick = () => {

    if (historial.length > 0) {

        redoStack.push(historial.pop());

        dibujarTodo();
    }
};

// REDO
document.querySelector("#btn_redo").onclick = () => {

    if (redoStack.length > 0) {

        historial.push(redoStack.pop());

        dibujarTodo();
    }
};

// LIMPIAR
document.querySelector("#btn_limpiar").onclick = () => {

    historial = [];

    redoStack = [];

    dibujarTodo();
};

// GUARDAR
document.querySelector("#btn_guardar").onclick = () => {

    const link = document.createElement("a");

    link.download = "canvas.png";

    link.href = canvas.toDataURL();

    link.click();
};