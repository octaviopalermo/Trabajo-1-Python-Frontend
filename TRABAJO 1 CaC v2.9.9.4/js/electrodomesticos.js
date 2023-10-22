/* ---------------------------------------------------------------------------------------------- */
/* ---------------------Traemos todos los datos del archivo json usando fetch-------------------- */
/* ---------------------------------------------------------------------------------------------- */


function obtenerDatos() {
    let datos = fetch("api.json")
        .then(respuesta => respuesta.json());
    return datos;
}

/* ---------------------------------------------------------------------------------------------- */
/* ----------------------Seleccionamos electrodomesticos segun la categoria---------------------- */
/* ---------------------------------------------------------------------------------------------- */

async function obtenerElectrodomesticos(categoria) {
    let datos = await obtenerDatos();
    let electrodomesticosSeleccionados=[];
    for (const electrodomestico of datos) {
        if (electrodomestico.categoria==categoria) {
            electrodomesticosSeleccionados.push(electrodomestico);
            
        }
    }
    
    return electrodomesticosSeleccionados;
}
/* ---------------------------------------------------------------------------------------------- */
/* ------------------------Listamos electrodomesticos segun la categoria------------------------- */
/* ---------------------------------------------------------------------------------------------- */
async function listarElectrodomesticos(categoria){
    document.getElementById("electrodomesticos").textContent='';
    console.log(categoria);
    categoria=categoria.toString();
    
    let electrodomesticos= await obtenerElectrodomesticos(categoria);
    for (const electrodomestico of electrodomesticos) {
        document.getElementById("electrodomesticos").innerHTML+=`
        <div>
            <h1>${electrodomestico.nombre}</h1>
            <img src="${electrodomestico.imagen}">
            <h2>Precio: ${electrodomestico.precio}</h2>
            <button>Añadir al carrito</button>
        </div>
        `
            
        }
    }




/* ------------------------------------------------------------------------------------ */
/* Usamos sessionStorage para setear la categoria de electrodomestico que queremos ver */
/* ------------------------------------------------------------------------------------ */

document.getElementById("electrodomesticosCocina").addEventListener("click", function() {
    sessionStorage.setItem('categoria','cocina')
});
document.getElementById("electrodomesticosLimpieza").addEventListener("click", function() {
    sessionStorage.setItem('categoria','limpieza')
});
document.getElementById("electrodomesticosTelevisores").addEventListener("click", function() {
    sessionStorage.setItem('categoria','televisor')
});

/* ---------------------------------------------------------------------------------------------- */
/* En caso de no hacer click desde electrodomesticos.html, el sessionStorage queda cargado
desde el html por el cual accedimos a la categoria especifica (costo pero se pudo :) */
/* ---------------------------------------------------------------------------------------------- */
let categoria=sessionStorage.getItem('categoria');
listarElectrodomesticos(categoria);