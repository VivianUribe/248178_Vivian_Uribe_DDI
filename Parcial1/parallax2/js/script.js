
const titulo= document.querySelector("#titulo");
const capa5 = document.querySelector("#capa5")
const capa4 = document.querySelector("#capa4")

window.addEventListener("scroll", (event)=>{
    titulo.style.right= window.scrollY * 3 + "px";
    capa5.style.bottom=window.scrollY * 2 + "px";
    capa4.style.bottom=window.scrollY * 1 + "px";
   

})