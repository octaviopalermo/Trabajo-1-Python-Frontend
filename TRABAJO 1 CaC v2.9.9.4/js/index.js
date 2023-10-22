
var botonCategoria = document.getElementById("cat");
var categorias = document.getElementById("categorias");

document.addEventListener('click', function(evento) {
    
    var botonObjetivo = evento.target; 
  
    if (botonObjetivo !== botonCategoria && botonObjetivo !== categorias) {
        categorias.style.display = "none";
    }
});

botonCategoria.addEventListener('click', function(evento){
    
    /* Para evitar que el click afecte a los elementos contenedores el stopPropagation*/
    evento.stopPropagation(); 
    if (categorias.style.display === "block") {
        categorias.style.display = "none";
    } else {
        categorias.style.display = "block";
    }
});




/* --------------------Para que el formulario de registro desaparezca-------**/
/* -------------------------------------------------------------------------*/


document.getElementById("cruz").addEventListener('click', function(evento) {
    evento.preventDefault();
    document.getElementById("contenedor-emergente-form").style.display="none";
})




  document.getElementById("desplegar-registro").addEventListener('click', function(evento){
    evento.preventDefault();
    document.getElementById("contenedor-emergente-form").style.display="block"
});



/* Provisionalmente hacemos que desaparezca el formulario sin volver a cargar la pagina */
document.getElementById("enviar").addEventListener('click', function(evento){
    evento.preventDefault();
    /* document.getElementById("contenedor-emergente-form").style.display="none" */
});





document.getElementById("electrodomesticosCocina").addEventListener("click", function() {
    sessionStorage.setItem('categoria','cocina')
});
document.getElementById("electrodomesticosLimpieza").addEventListener("click", function() {
    sessionStorage.setItem('categoria','limpieza')
});
document.getElementById("electrodomesticosTelevisores").addEventListener("click", function() {
    sessionStorage.setItem('categoria','televisor')
});

