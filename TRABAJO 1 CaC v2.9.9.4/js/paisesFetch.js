
function obtenerDatos() {
   let datos = fetch("https://countriesnow.space/api/v0.1/countries/states")
        .then(respuesta => respuesta.json());
    return datos;
}

async function listarDatos(){
    let datos=await obtenerDatos();
    let i=1;
    for (const dato of datos.data) {
        document.getElementById("nacionalidad").innerHTML+=`<option value="${i}">${dato.name}</option>`
        i++;
    }
    
}

listarDatos();