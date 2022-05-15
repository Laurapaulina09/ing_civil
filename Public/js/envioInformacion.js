async function postSencilla(url, data={}){
    const respuesta = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    return respuesta.json()
}

async function getDatos(url){
    const respuesta = await fetch(url)
    return respuesta
}

async function envioFile(path, formData,cuerpo={}){
    let url = await new Promise((resolve, reject) => {
        axios.post(path, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body:JSON.stringify(cuerpo)
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    })
    return url
}