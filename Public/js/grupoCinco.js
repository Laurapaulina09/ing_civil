$("#parteCinco").click(function(){
    let d={
        numPisos:validarRadio("numPisos"),
        numPisosPts:null,
        ubicacionPiso:validarRadio("ubicacionPiso"),
        ubicacionPisoPts:null,
        parqueadero:validarRadio("parqueadero"),
        parqueaderoPts:null,
        cedula:localStorage.getItem('cedula')
    }
    let $btn = $(this)

    if(d.numPisos != null && d.ubicacionPiso != null && d.parqueadero != null){
        d.numPisosPts=d.numPisos.getAttribute("puntos")
        d.ubicacionPisoPts=d.ubicacionPiso.getAttribute("puntos")
        d.parqueaderoPts=d.parqueadero.getAttribute("puntos")
        d.numPisos=d.numPisos.getAttribute("id")
        d.ubicacionPiso=d.ubicacionPiso.getAttribute("id")
        d.parqueadero=d.parqueadero.getAttribute("id")
        postSencilla('/parte5', d)
        .then(respuesta=>{
            cambio($btn)
        })
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
        //cambio($btn)
    }

    //
})