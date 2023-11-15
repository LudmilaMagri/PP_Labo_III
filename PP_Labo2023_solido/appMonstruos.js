//import Monstruo from "./scripts/monstruo";

const pjs = localStorage.getItem("pjs") ? JSON.parse(localStorage.getItem("pjs")) : [];


console.log("Imprimiendo objetos:")
console.log(pjs);

//Simulacion de carga de tabla con el loader
// setTimeout(() => 
// {
//     const divSpinner = document.getElementById("divSpinner");
//     divSpinner.setAttribute("Hidden", true);

//     const divPrincipal = document.getElementById("table");
//     divPrincipal.removeAttribute("Hidden");
//     const divBotones = document.getElementById("botones-tabla");
//     divBotones.removeAttribute("Hidden");
// },2000);


const contenedorTarjetas = document.getElementById('contenedorTarjetas');

// Itera sobre el array y crea tarjetas para cada objeto
pjs.forEach(objeto => {
    // Crea elementos HTML para la tarjeta
    const tarjetas = document.createElement('div');
    tarjetas.classList.add('tarjetas'); // Puedes agregar clases para estilos
     // Crea un elemento de imagen y establece su fuente
  const imagenNombreElemento = document.createElement('img');
  imagenNombreElemento.classList.add("imgTarjeta");
  imagenNombreElemento.src = "./media/icons/nombre2.png"; 
  imagenNombreElemento.alt = 'Imagen del nombre'; 
  // Agrega la imagen al principio de la tarjeta
  tarjetas.appendChild(imagenNombreElemento);

  // Crea elementos para cada atributo del objeto
  const nombreElemento = document.createElement('p');
  nombreElemento.classList.add("txtBox");
  nombreElemento.textContent = 'Nombre: ' + objeto.Nombre;
  tarjetas.appendChild(nombreElemento);
  
  
  
  const imagenAliasElemento = document.createElement('img');
  imagenAliasElemento.classList.add("imgTarjeta");
  imagenAliasElemento.src = "./media/icons/alias.png"; 
  imagenAliasElemento.alt = 'Imagen del alias'; 
  // Agrega la imagen al principio de la tarjeta
  tarjetas.appendChild(imagenAliasElemento);
  
  const aliasElemento = document.createElement('p');
  aliasElemento.classList.add("txtBox");
  aliasElemento.textContent = 'Alias: ' + objeto.Alias;
  tarjetas.appendChild(aliasElemento);


  const imagenMiedoElemento = document.createElement('img');
  imagenMiedoElemento.classList.add("imgTarjeta");
  imagenMiedoElemento.src = "./media/icons/miedo.png"; 
  imagenMiedoElemento.alt = 'Imagen del miedo'; 
  // Agrega la imagen al principio de la tarjeta
  tarjetas.appendChild(imagenMiedoElemento);
  
  const miedoElemento = document.createElement('p');
  miedoElemento.classList.add("txtBox");
  miedoElemento.textContent = 'Miedo: ' + objeto.Miedo;
  tarjetas.appendChild(miedoElemento);



  const imagenTipoElemento = document.createElement('img');
  imagenTipoElemento.classList.add("imgTarjeta");
  imagenTipoElemento.src = "./media/icons/tipo.png"; 
  imagenTipoElemento.alt = 'Imagen del tipo'; 
  // Agrega la imagen al principio de la tarjeta
  tarjetas.appendChild(imagenTipoElemento);
  
  const tipoElemento = document.createElement('p');
  tipoElemento.classList.add("txtBox");
  tipoElemento.textContent = 'Tipo: ' + objeto.Tipo;
  tarjetas.appendChild(tipoElemento);

 const imagenDefensaElemento = document.createElement('img');
 imagenDefensaElemento.classList.add("imgTarjeta");
 imagenDefensaElemento.src = "./media/icons/defensa.png"; 
 imagenDefensaElemento.alt = 'Imagen de defensa'; 
 
 // // //   // Agrega la imagen al principio de la tarjeta
 tarjetas.appendChild(imagenDefensaElemento);
 
 const defensaElemento = document.createElement('p');
 defensaElemento.classList.add("txtBox");
 defensaElemento.textContent = 'Defensa: ' + objeto.Defensa;
 tarjetas.appendChild(defensaElemento);
 
  // Agrega la tarjeta al contenedor principal
  contenedorTarjetas.appendChild(tarjetas);
});