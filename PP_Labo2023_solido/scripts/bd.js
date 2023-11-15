const miURL = "http://localhost:3000/monstruos";
const tipoMonstruosURL = "http://localhost:3000/tipoMonstruos";


// ********************* FETCH ****************************

export const getMonstruosFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
      
    });
};


export const getTiposMonstruosFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(tipoMonstruosURL) // El Fetch retorna una promesa.
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
        
    });
};

export const createMonstruoFetch = (monstruo) => 
{
    fetch(miURL, {    // Objeto como segundo parametro.
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(monstruo)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    
};

// DELETE
export const deleteMonstruoFetch = (id) => 
{
    fetch(miURL + "/" + id, {
        method: "DELETE"
    })
    .then((respuesta)=>{
        if(!respuesta.ok) return Promise.reject(respuesta);
        console.log("Borrado con exito");
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
   
};

// PUT
export const updateMonstruoFetch = (monstruo) => 
{
    fetch(miURL + "/" + monstruo.id, {    // Objeto como segundo parametro.
        method: "PUT",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(montruo)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
   
};