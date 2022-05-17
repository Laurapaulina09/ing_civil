$("#parteCuatro").click(function () {
    let d = {
        elementosCercanos: null,
        elementosCercanosPts: null,
        usoActualPredominanteVivienda: null,
        usoActualPredominanteViviendaPts: null,
        usoAnteriorDiferente: null, //Respuesta si o no
        usoAnterior: null,
        usoPrimerPiso: null,
        cedula:localStorage.getItem('cedula')
    }
    let $btn = $(this)
    d.elementosCercanos = validarRadio("elementosCercanos")
    d.usoActualPredominanteVivienda = validarRadio("usoVivienda")
    d.usoAnteriorDiferente = validarRadio("usoAnteriorDiferente")
    d.usoAnterior = validarRadio("usoAnterior")
    d.usoPrimerPiso = validarRadio("usoPisoUno")

    if (d.elementosCercanos != null && d.usoActualPredominanteVivienda != null && d.usoAnteriorDiferente && d.usoPrimerPiso != null) {
        d.elementosCercanosPts=d.elementosCercanos.getAttribute("puntos")
        d.elementosCercanos = d.elementosCercanos.getAttribute("id")
        d.usoActualPredominanteViviendaPts = d.usoActualPredominanteVivienda.getAttribute("puntos")
        d.usoActualPredominanteVivienda = d.usoActualPredominanteVivienda.getAttribute("id")
        d.usoAnteriorDiferente = d.usoAnteriorDiferente.getAttribute("id")
        d.usoPrimerPiso = d.usoPrimerPiso.getAttribute("id")
        if(d.usoActualPredominanteVivienda === "otro"){
            d.usoActualPredominanteVivienda=$('#otroUsoVivienda')[0].value
        }
        if (d.usoAnteriorDiferente === "Si" && d.usoAnterior == null){
            $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
            return
        }
        d.usoAnterior = d.usoAnterior==null? null : d.usoAnterior.getAttribute("id")
        console.log(d)
        postSencilla('', d)
        .then(respuesta=>{
            cambio($btn)
        })
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
        //cambio($btn)
    }
})
$("input[name=usoAnteriorDiferente").change(function (event) {
    if (event.target.getAttribute("id") === "Si") {
        $("#usoDiferenteSi")[0].classList.remove("ocultar")
    } else {
        $("#usoDiferenteSi")[0].classList.add("ocultar")
    }
})