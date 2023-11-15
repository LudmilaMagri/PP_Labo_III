function crearTabla(data)
{ 
  
    console.log("crear tabla");
    if (data.length > 0)
    {
        const tabla = document.createElement("table");

        tabla.appendChild(crearCabecera(data[0]));
        console.log("crear cabecera");

        console.log(data);
        tabla.appendChild(crearCuerpo(data));
        console.log("crear cuerpo");
        return tabla;
    }
    else
    {
        return document.createElement("table");
    }
}

const crearCabecera = (elemento) =>{
    const tHead = document.createElement("thead");
    //Creo el elemento html "tr" (fila de tabla)
    const headRow = document.createElement("tr");

    for (const key in elemento){
        if(key === "ID") continue; // para omitir el id
        //Creo la celda cabecera y el nodo de texto que le voy a posteriormente agregar como campo
        const th = document.createElement("th");
       // th.textContent = key;
       const textNode = document.createTextNode(key); // esto es lo mismo que arriba
       th.appendChild(textNode); 

       headRow.appendChild(th);

    }
    tHead.appendChild(headRow);
    return tHead;
}

const crearCuerpo = (data)=>{

    console.log("Crear cuerpo");
    const tBody = document.createElement("tbody");
    console.log(tBody);

    data.forEach((element,index) => {
        const tr = document.createElement("tr");
        if(index % 2 == 0 ){
            tr.classList.add("rowPar");
        }
        for(const key in element){

        if(key === "ID"){
            tr.dataset.id = element[key];
        }
        else{

            const td = document.createElement("td");
            td.textContent = element[key];
            tr.appendChild(td);
        }
        }
        tBody.appendChild(tr);
    });

    return tBody;


};

export default crearTabla;