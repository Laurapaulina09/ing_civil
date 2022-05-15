$("#parteSeis").click(function(){
    let $btn = $(this)
    let d={
        comparteMuro:validarRadio("comparteMuro"),
        comparteMuroPts:null,
        equiposGrandes:validarRadio("equiposGrandes"),
        equiposGrandesPts:null,
        otroEquipoGrande:$('#otroEquipoGrande')[0].value,
        cedula:localStorage.getItem('cedula')
    }
    if(d.comparteMuro != null && d.equiposGrandes != null){
        d.comparteMuroPts= d.comparteMuro.getAttribute("puntos")
        d.comparteMuro= d.comparteMuro.getAttribute("id")
        d.equiposGrandesPts=d.equiposGrandes.getAttribute("puntos")
        d.equiposGrandes=d.equiposGrandes.getAttribute("id")
        postSencilla('', d)
        .then(respuesta=>{
            cambio($btn)
        })
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hallas llenado todos los campos"></info-mensaje>`
        //cambio($btn)
    }
})