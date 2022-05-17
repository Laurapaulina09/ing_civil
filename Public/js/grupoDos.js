$("#parteDos").click(function(){
    let $btn = $(this)
    let d={
        nivelFormacion:validarRadio("formacion"),
        anoConstruccion:validarRadio("anio"),
        anoConstruccionPts:null,
        entidad:validarRadio("entidad"),
        entidadPts:null,
        constructora:$('#nameConstructora')[0].value,
        cedula:localStorage.getItem('cedula')
    }
    console.log(d)
    if(d.nivelFormacion != null && d.anoConstruccion != null && d.entidad != null){
        d.nivelFormacion=d.nivelFormacion.getAttribute("id")
        d.anoConstruccionPts=d.anoConstruccion.getAttribute("puntos")
        d.anoConstruccion=d.anoConstruccion.getAttribute("id")
        d.entidadPts=d.entidad.getAttribute("puntos")
        d.entidad=d.entidad.getAttribute("id")
        fetch('/parte2', {
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