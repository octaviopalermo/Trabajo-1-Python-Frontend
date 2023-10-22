/* ------------------------------------------------------------------------------------ */
/*--------------------------Funcion de validacion de contacto-------------------------- */
/* ------------------------------------------------------------------------------------ */

function validacionContacto() {
    if (validarNombre_apellido(document.getElementById("nombre-c").value, "Homero").length>0) {
        alert(validarNombre_apellido(document.getElementById("nombre-c").value, "Homero"));
        document.getElementById("nombre-c").focus();
        return;
    };
    if(validarNombre_apellido(document.getElementById("apellido-c").value, "Simpson").length>0){
        alert(validarNombre_apellido(document.getElementById("apellido-c").value, "Simpson"));
        document.getElementById("apellido-c").focus();
        return;
    }
    if (validacionMail(document.getElementById("mail-c").value).length>0) {
        alert(validacionMail(document.getElementById("mail-c").value));
        document.getElementById("mail-c").focus();
        return;
    }

    if (document.getElementById("asunto-c").value==0) {
        alert("Debe elegir un asunto.");
        document.getElementById("mail-c").focus();
        return;
    }

    if (document.getElementById("consulta-c").value=="") {
        alert("Debe escribir una consulta.");
        document.getElementById("mail-c").focus();
        return;
    }
   

}

/* ------------------------------------------------------------------------------------ */
/* ----------------------------Funcion de validacion de registro ---------------------- */
/* ------------------------------------------------------------------------------------ */

function validacionRegistro(){
    if (validarNombre_apellido(document.getElementById("nombre").value, "Homero").length>0) {
        alert(validarNombre_apellido(document.getElementById("nombre").value, "Homero"));
        document.getElementById("nombre").focus();
        return;
    };
    if(validarNombre_apellido(document.getElementById("apellido").value, "Simpson").length>0){
        alert(validarNombre_apellido(document.getElementById("apellido").value, "Simpson"));
        document.getElementById("apellido").focus();
        return;
    };

    if (validarContrasenia(document.getElementById("contra").value).length>0) {
        alert(validarContrasenia(document.getElementById("contra").value));
        document.getElementById("contra").focus();
        return;
    };

    if (validarEdad(document.getElementById("nacimiento").value).length>0) {
        alert(validarEdad(document.getElementById("nacimiento").value));
        document.getElementById("nacimiento").focus();
        return;
    };

    if (validacionMail(document.getElementById("mail").value).length>0) {
        alert(validacionMail(document.getElementById("mail").value));
        document.getElementById("mail").focus();
        return;
    };

    if(!validarPais()){
        alert("Debe seleccionar un pais.")
        document.getElementById("nacionalidad").focus();
        return;
    }
}











/* ------------------------------------------------------------------------------------ */
/* Aqui empiezan las funciones particulares que usamos dentro de las validaciones */
/* ------------------------------------------------------------------------------------ */




/* Validacion de nombre y apellido */
/* ------------------------------------------------------------------------------------ */


/* Validacion de primera letra de una palabra (que sea mayuscula) */
function validarMayuscula(palabra) {
    let primeraMayuscula = true;
    if (palabra.charAt(0) == palabra.charAt(0).toLowerCase()) {
        primeraMayuscula = false;
    }
    return primeraMayuscula;
}

/* Validacion de las demas letras de una palabra (que sean minusculas) */
function validarMinusculas(palabra) {
    let letrasMinusculas = true;
    for (let i = 1; i < palabra.length; i++) {
        if (palabra.charAt(i) == palabra.charAt(i).toUpperCase()) {
            letrasMinusculas = false;
        }
    }
    return letrasMinusculas;
}

/* Validacion de numeros. Si algun caracter es un numero tira false. */
function validarNumeros(palabra){
    let numerosAusentes=true;
    for (let i = 0; i < palabra.length; i++) {
        if (!isNaN(palabra.charAt(i))) {
            numerosAusentes = false;
            return numerosAusentes;
        }
    }
    return numerosAusentes;
}


/* Validacion de persona prohibida (no se admiten homeros) */
function vetado(palabra, proscripto) {
    let admision = true;
    if (palabra == proscripto) {
        admision = false;
    }
    return admision;
}

/* Funcion de validación de nombre y apellido.*/
/* Devuelve un mensaje, que manejamos segun si tiene longitud nula o no */
function validarNombre_apellido(nombre, proscripto) {
    let mensaje = "";
    if (nombre.length == 0) {
        mensaje += "El campo nombre o apellido está vacío."
    } else {
        if (!validarNumeros(nombre)) {
            mensaje+= "No se admiten numeros en nombre o apellido. "
        }else if(!validarMinusculas(nombre)){
            mensaje += "No se admiten mayúsculas en letras que no sean la primera. Primera letra en mayúscula y el resto minusculas por favor. "
        }else if (!validarMayuscula(nombre)) {
            mensaje += "No se admiten minúsculas en la primera letra, los nombres propios empiezan con mayúscula. ";
        }else if (!vetado(nombre, proscripto)) {
            mensaje = "No se admiten " + proscripto + "'s.";
        }
    }

/*     if (nombre.length == 0 || !validarMayuscula(nombre) || !validarMinusculas(nombre) || !vetado(nombre, proscripto)) {
        alert(mensaje);
    } */
    return mensaje;
}




/* ------------------------------------------------------------------------------------ */
/* Validacion de mail */
/* ------------------------------------------------------------------------------------ */


/* Retorna la posicion del arroba. Si no hay ningun arroba retorna -1.
Si hay mas de un arroba retorna -2. */
function arroba(mail) {
    let posicionArroba;
    let cantidadArrobas = 0;
    let retorno;
    for (let i = 0; i < mail.length; i++) {
        if (mail.charAt(i) == "@") {
            posicionArroba = i;
            cantidadArrobas++;
        }
    }

    if (cantidadArrobas == 0) {
        retorno = -1;
    } else if (cantidadArrobas == 1) {
        retorno = posicionArroba;
    } else {
        retorno = -2;
    }
    return retorno;
}


/* Retorna verdadero si el dominio es aceptable, falso si no */
function validarDominio(mail) {

    /* Establecemos cuales seran los dominios aceptables */
    let dominiosValidos = ["hotmail.com", "hotmail.com.ar", "gmail.com", "yahoo.com"];

    /* Separamos el mail usando el arroba, y nos quedamos con la parte que viene despues de este */
    let dominio = mail.split("@")[1];

    /* Comprobamos que el dominio sea uno de los aceptables recorriendo el arreglo */
    let validez = false;
    for (const elemento of dominiosValidos) {
        if (dominio == elemento) {
            validez = true;
            break;
        }

    }

    return validez;
}



/* Funcion de validacion de mail */
/* Devuelve un mensaje, que manejamos segun si tiene longitud nula o no */
function validacionMail(mail) {
    let mensaje = "";
    if (mail.length == 0) {
        mensaje = "El campo de mail está vacío."
    } else {
        if (arroba(mail) == -1) {
            mensaje = "Mail no válido. No contiene el caracter @."
        } else if (arroba(mail) == -2) {
            mensaje = "Direccion de correo mal escrita. Debe tener un solo caracter @."
        } else {
            if (arroba(mail) < 3) {
                mensaje = "Direccion de correo no válida para este sitio. Debe contener al menos 3 caracteres antes del @."
            } else if (arroba(mail) > 20) {
                mensaje = "Direccion de correo no válida para este sitio. Debe contener como máximo 20 caracteres antes del @."
            } else {
                if (!validarDominio(mail)) {
                    mensaje = "Dominio de mail no válido."
                }
            }
        }
    }

/*     if (mensaje.length > 0) {
        alert(mensaje);
    } */
    return mensaje;
}




/*---------------------------Validacion de contraseña----------------------*/

/*---------------------------Retorna un mensaje que tratamos segun su longitud----------------------*/
function validarContrasenia(palabra){
    let mensaje="";
    if(palabra.length==0){
        mensaje+="Debe ingresar una contraseña. "
    }else if(palabra.length<6){
        mensaje+="La contraseña debe tener al menos 6 caracteres. "
    }else if (!algunaMinuscula(palabra)) {
        mensaje+="La contraseña debe contener al menos una minúscula. ";
    }else if(!algunaMayuscula(palabra)){
        mensaje+="La contraseña debe contener al menos una mayúscula. ";
    }else if(!algunNumero(palabra)){
        mensaje+="La contraseña debe contener al menos un número.";
    }
    return mensaje;
}

/*-----------------------Devuelve true si hay alguna minuscula----------------------*/
function algunaMinuscula(palabra){
    let minusculaPresente=false;
    for (let i = 0; i < palabra.length; i++) {
        if (palabra.charAt(i)==palabra.charAt(i).toLowerCase() && isNaN(palabra.charAt(i))) {
            minusculaPresente = true;
            return minusculaPresente;
        }
    }
    return minusculaPresente;
}



/*-----------------------Devuelve true si hay alguna mayuscula----------------------*/
function algunaMayuscula(palabra){
    let mayusculaPresente=false;
    for (let i = 0; i < palabra.length; i++) {
        if (palabra.charAt(i)==palabra.charAt(i).toUpperCase() && isNaN(palabra.charAt(i))) {
            mayusculaPresente = true;
            return mayusculaPresente;
        }
    }
    return mayusculaPresente;
}


/*-----------------------Devuelve true si hay algun numero----------------------*/
function algunNumero(palabra){
    let numeroPresente=false;
    for (let i = 0; i < palabra.length; i++) {
        if (!isNaN(palabra.charAt(i))) {
            numeroPresente = true;
            return numeroPresente;
        }
    }
    return numeroPresente;
}


/* ------------------------------------------------------------------------------------ */
/* Validacion de pais */
/* ------------------------------------------------------------------------------------ */

function validarPais(){
    let paisSeleccionado=true;
    let pais=document.getElementById("nacionalidad").value;
    if (pais==0) {
        paisSeleccionado=false;
    }
    return paisSeleccionado;
}

/* ------------------------------------------------------------------------------------ */
/* Validacion de edad */
/* ------------------------------------------------------------------------------------ */

function validarEdad(nacimiento){
    let mensaje="";
    let fechaActual=new Date(); 

    nacimiento=new Date(nacimiento); 

    /*Esto quedo super feo pero parece que funciona bien*/
    /* Funcionaba mal por un margen de un dia cuando en la ultima condicion le ponia < en vez de <=...no entiendo por que*/
    /* Si cumplo el 10 y hoy es 9, 9-10<0...y ahi el 10 deberia ser un dia valido, pero no*/
    /* Algo se me esta escapando con Date :P*/

    /* Primero verificamos que sea una fecha valida, para ver si se dejo sin elegir ese campo */
    if (isNaN(nacimiento.getFullYear())) {
        mensaje+="Debe ingresar una fecha de nacimiento."
    }else if(fechaActual.getFullYear() - nacimiento.getFullYear() < 18 || 
    (fechaActual.getFullYear() - nacimiento.getFullYear() == 18 && 
    (fechaActual.getMonth() - nacimiento.getMonth() < 0 || 
    (fechaActual.getMonth() - nacimiento.getMonth() == 0 &&
    fechaActual.getDate() - nacimiento.getDate() <= 0)))){
        mensaje+="Usted debe ser mayor de 18 años para registrarse en Electropoder.";
    }

    return mensaje;
}


/* ------------------------------------------------------------------------------------ */
/* Llamada a la funcion de validacion */
/* ------------------------------------------------------------------------------------ */

let formularioConsulta=document.getElementById("enviar-c");
if(formularioConsulta){
 document.getElementById("enviar-c").addEventListener("click", function (evento) {
    evento.preventDefault();
    validacionContacto();
}); 
}

let formularioRegistro=document.getElementById("enviar");
if(formularioRegistro){
document.getElementById("enviar").addEventListener("click", function (evento) {
    evento.preventDefault();
    validacionRegistro();
}); 
}