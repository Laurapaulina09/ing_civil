
//Almacenado de información parte uno
$("#parteUno").click(function () {
    let $btn = $(this)
    let d = {
        primerNombre: $('#nombreUno')[0].value.trim(),
        segundoNombre: $('#nombreDos')[0].value.trim(),
        primerApellido: $('#apellidoUno')[0].value.trim(),
        segundoApellido: $('#apellidoDos')[0].value.trim(),
        celular: $('#celular')[0].value.trim(),
        email: $('#email')[0].value.trim(),
        cedula: $('#cedula')[0].value.trim(),
        direccion: $('#direccion')[0].value.trim(),
        nombreUnidad: $('#nombreUnidad')[0].value.trim(),
        departamento: $('#departamento')[0].value,
        municipio: $('#municipio')[0].value,
        barrio: $('#barrio')[0].value.trim(),
        tratamientoDatos: $('#tratamiento')[0].checked
    }
    let correo=new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    let nombres=new RegExp("^([A-ZÁÉÍÓÚ|a-záéíóú]{1}[a-zñáéíóú]+[\s]*)+$")
    let telefono=new RegExp("^[3]{1}[0-9]{9}$")
    let cc = new RegExp("^[1-9]{1}[0-9]{7,9}$")

    if(nombres.test(d.primerNombre) && nombres.test(d.segundoNombre) && nombres.test(d.primerApellido) && nombres.test(d.segundoApellido) && telefono.test(d.celular) && correo.test(d.email) && cc.test(d.cedula) && d.direccion.length >= 9 && d.departamento.length >= 1 && d.municipio.length >= 1 && d.barrio.length >= 4 && d.tratamientoDatos){
        localStorage.setItem('cedula', d.cedula)
        //cambio($btn)
        fetch('', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(d)
        })
        .then((response)=>{
            return response.json()
        })
        .then(()=>{
            cambio($btn)
        })
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
        //cambio($btn)
    }
})