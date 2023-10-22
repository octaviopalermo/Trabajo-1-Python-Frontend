/* ------------------------------------------------------------------------------------ */
/* Funcionamiento del carrusel */
/* ------------------------------------------------------------------------------------ */
const contenedorImagenes=document.querySelector(".imagenes");
const punto=document.querySelectorAll(".punto");
const imagenes=document.querySelectorAll(".imagenes .img");

punto.forEach((cadaPunto,i)=>{
    punto[i].addEventListener('click', ()=>{
        let posicion=i;
        let operacion=posicion*(-20);
        contenedorImagenes.style.transform=`translateX(${operacion}%)`;

        punto.forEach((cadaPunto,i)=>{
            punto[i].classList.remove('activo');
        })

        punto[i].classList.add('activo');
    })
})

/* ------------------------------------------------------------------------------------ */
/* Imagenes del carrusel, que obtendremos de la api */
/* ------------------------------------------------------------------------------------ */

function obtenerDatos() {
    let datos = fetch("api.json")
        .then(respuesta => respuesta.json());
    return datos;
}


/* Dado un arreglo, selecciona un numero de componentes al azar igual a cantidad */
function componentesAleatorias(cantidad,arreglo){
    
    let arregloAleatorio=[];
    for (let i = 0; i < cantidad; i++) {
        /* Definimos un numero aleatorio que va entre 0 y la longitud del arreglo-1 */
        let numeroAleatorio=Math.floor(Math.random()*(arreglo.length));
        /* Concatenamos las componentes que extraemos en el vector arregloAleatorio */
        /* Esas componentes son elegidas al azar mediante numeroAleatorio */
        arregloAleatorio=arregloAleatorio.concat(arreglo.splice(numeroAleatorio,1));
        
    }
    return arregloAleatorio;
}


/* Usamos la funcion anterior para insertar imagenes de la api de manera aleatoria */
async function insertarImagenes(){
    let datos= await obtenerDatos();
    let datosAleatorios=componentesAleatorias(5,datos);
    for (let i = 1; i < 6; i++) {
        let imagencita=document.getElementById(`imagen${i}`);
        imagencita.src=datosAleatorios[i-1].imagen;
    }
}

insertarImagenes();