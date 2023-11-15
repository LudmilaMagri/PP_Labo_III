//import Personaje from "./scripts/personaje.js";
import Monstruo from "./scripts/monstruo.js"
import {personajes} from "./data/personajes.js";
import crearTabla from "./scripts/tabla.js";
import {
    getMonstruosFetch,
    getTiposMonstruosFetch,
    createMonstruoFetch,
    deleteMonstruoFetch,
    updateMonstruoFetch
} from "./scripts/bd.js";

console.log("APP");


// const $seccionTabla = document.getElementById("tabla");
// $seccionTabla.appendChild(crearTabla(personajes));


//Carga del STORAGE
// pjs = localStorage.getItem("pjs") ? JSON.parse(localStorage.getItem("pjs")) : [];

//traigo monstruos
const pjs =  await getMonstruosFetch();


console.log("Imprimiendo objetos:")
console.log(pjs);
actualizarTabla();

// ***************************************- SUBMIT -************************************************************

const frmPjs = document.forms[0];
frmPjs.addEventListener("submit", (e) =>
{
    const frmAlta = e.target;
    console.log(e);

    e.preventDefault(); //cancelo el evento

    console.log("Imprimo valores leidos:");

    console.log(frmAlta.Nombre.value);
    console.log(frmAlta.Alias.value);
    console.log(frmAlta.Defensa.value);
    console.log(frmAlta.Miedo.value);
    console.log(frmAlta.Tipo.value);

    let ID = Date.now();
    let Nombre = frmAlta.Nombre.value;
    let Alias = frmAlta.Alias.value;
    let Defensa = frmAlta.Defensa.value;
    let Miedo = frmAlta.Miedo.value;
    let Tipo = frmAlta.Tipo.value;
    if(validarCampos(ID, Nombre, Alias, Defensa, Miedo, Tipo) == false){
        alert ("Error en validar campos del formulario.");
    }
    else{
        const newPersonaje = new Monstruo(ID, Nombre, Tipo, Alias, Defensa, Miedo);

        //LS
        //pjs.push(newPersonaje);
        //localStorage.setItem("pjs", JSON.stringify(pjs));

        //FETCH
        createMonstruoFetch(newPersonaje);

        actualizarTabla();
    }



    frmPjs.reset();

});
// ***************************************************************************************************
//----------------------------------------Captura del boton eliminar y desarrollo de su evento 'click'---------------------
const botonEliminar = document.getElementById("BtnEliminar");
botonEliminar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        //Recorro todos los elementos
        pjs.forEach((element, index) => 
        {
            //Si encuentro el elemento que quiero eliminar (coincidente con el ID)
            if (element.ID == idFilaClickeada) 
            {
                //Lo elimino del array.(Index es el indice y el 1 es la cantidad de elementos a eliminar.)
                //pjs.splice(index,1);
                // ------ Actualizo localStorage ------
                //localStorage.setItem("pjs", JSON.stringify(pjs));
                deleteMonstruoFetch(element.ID);


                //Dejo de tener en cuenta ese objeto ya modificado.
                if(flagFilaSeleccionada == true)
                {
                    //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
                    //tengo riesgo de modificar nada).
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }

                frmPjs.reset();
                //Actualizo la tabla.
                actualizarTabla();

                //Uso return xq break explota.
                return;
            }
        });   
    }
    else
    {
        alert("No se puede eliminar si no hay nada seleccionado en la tabla.");
    }
});



//-------------------------------------Captura del boton modificar y desarrollo de su evento 'click'---------------------
const botonModificar = document.getElementById("BtnModificar");
botonModificar.addEventListener("click", (e) =>
{
    if (idFilaClickeada != null && idFilaClickeada != undefined)
    {
        //Recorro todos los elementos
        pjs.forEach((element, index) => 
        {
            if (element.ID == idFilaClickeada) 
            {
                //Lo modifico del array pisando todos los valores de sus campos con los cargados en los controles
                pjs[index].Nombre = document.getElementById("txtBoxNombre").value;
                pjs[index].Alias = document.getElementById("txtBoxAlias").value;
                pjs[index].Miedo = document.getElementById("rangeMiedo").value;
                pjs[index].Tipo = document.getElementById("selectTipo").value;

                if (document.getElementById("radioBtnTipoEstaca").checked == true)
                {  
                    pjs[index].Defensa = "Estaca";
                }
                else if (document.getElementById("radioBtnTipoPlata").checked == true)
                {
                    pjs[index].Defensa = "Plata";
                }
                else if (document.getElementById("radioBtnTipoCrucifijo").checked == true)
                {
                    pjs[index].Defensa = "Crucifijo";
                }
                else if (document.getElementById("radioBtnTipoPosion").checked == true)
                {
                    pjs[index].Defensa = "Posion";
                }
                
                // -------------- Actualizo localStorage -----------------------
                localStorage.setItem("pjs", JSON.stringify(pjs));

                //Dejo de tener en cuenta ese objeto ya modificado.
                if(flagFilaSeleccionada == true)
                {
                    //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
                    //tengo riesgo de modificar nada).
                    idFilaClickeada = null;
                    ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                }
                
                frmPjs.reset();

                //Actualizo la tabla.
                actualizarTabla();

                return;
            }
        });   
    }
    else
    {
        alert("No se puede modificar si no hay nada seleccionado en la tabla.");
    }
});

//*************************************************************************************************
//---------------------------Captura del boton cancelar y desarrollo de su evento 'click'--------------------------------
const botonCancelar = document.getElementById("BtnCancelar");
botonCancelar.addEventListener("click",(e) =>
{
    if(flagFilaSeleccionada == true)
    {
        //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
        //tengo riesgo de modificar nada).
        idFilaClickeada = null;
        ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
    }

    frmPjs.reset();
});
// ***************************************************************************************************

function validarCampos(idRecibido,nombre,alias) 
{
    if (idRecibido == null || idRecibido == undefined || 
        nombre == null     || nombre == undefined     ||  nombre == ""  ||
        alias == null      || alias == undefined      ||  alias == ""   ) 
    {
        return false;
    }
    return true;
}

function actualizarTabla(arr)
{
    const datos = localStorage.getItem("pjs") ? JSON.parse(localStorage.getItem("pjs")) : [];
    const contenedor = document.querySelector(".table");
    console.log(contenedor);

    while(contenedor.children.length > 0 ){
        contenedor.removeChild(contenedor.firstChild);
    }
    if(datos.length > 0 ){
        contenedor.appendChild(crearTabla(pjs));
    }
}

// ********************************************************************

let flagFilaSeleccionada = false;
let ultimaFilaSeleccionada;
let idFilaClickeada;

const contenedorTabla = document.getElementById("table");
contenedorTabla.addEventListener("click", (e) => 
{
    //Me guardo la ubicacion clickeada y me fijo si es una fila y celda al mismo tiempo
    const ubicacionClickeada = e.target; 
    
    idFilaClickeada = e.target.parentElement.dataset.id;
    console.log(e.target.parentElement.dataset);
    if (ubicacionClickeada.matches("tr td") == true)
    {
        console.log("El ID del monstruo seleccionado: "+idFilaClickeada);
        const fila = ubicacionClickeada.parentElement;

        if (fila.matches("tr") == true && flagFilaSeleccionada == false && fila != null && fila != undefined)
        { 
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            fila.style.backgroundColor = 'antiquewhite';
            flagFilaSeleccionada = true;
            ultimaFilaSeleccionada = fila;
        }
        else if (fila.matches("tr") == true && flagFilaSeleccionada == true && fila != null && fila != undefined) 
        {
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            
            ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";

            fila.style.backgroundColor = 'antiquewhite';
            ultimaFilaSeleccionada = fila;
            flagFilaSeleccionada = true;
        }
    }
});

function mostrarEnControlesFilaSeleccionada(idRecibido) 
{
    pjs.forEach((element) => 
    {
    if (element.ID == idRecibido) 
    {
        document.getElementById("txtBoxNombre").value = element.Nombre;
        document.getElementById("txtBoxAlias").value = element.Alias;
        document.getElementById("rangeMiedo").value = element.Miedo;
        document.getElementById("selectTipo").value = element.Tipo;
    }
    });
}

//Simulacion de carga de tabla con el loader
setTimeout(() => 
{
    const divSpinner = document.getElementById("divSpinner");
    divSpinner.setAttribute("Hidden", true);

    const divPrincipal = document.getElementById("table");
    divPrincipal.removeAttribute("Hidden");
    const divBotones = document.getElementById("botones-tabla");
    divBotones.removeAttribute("Hidden");
},2000);