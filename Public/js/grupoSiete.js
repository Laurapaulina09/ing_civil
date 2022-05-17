$("#parteSiete").click(function () {
    let $btn = $(this)
    let d = {
        alturaEntrePisos: validarRadio2('alturaEntrePisos'),
        alturaEntrePisosPts: null,
        materialDeConstruccion: validarRadio2('descripcionVivienda'),
        materialDeConstruccionPts: null,
        tipoMamposteriaConcretoPrefabricado: validarRadio2('tipo_select'),
        tipoMamposteriaConcretoPrefabricadoPts: null,
        cedula:localStorage.getItem('cedula')
    }
    if (d.alturaEntrePisos != null && d.materialDeConstruccion != null) {
        if ((d.materialDeConstruccion === 'B.Concreto' || d.materialDeConstruccion === 'Mamposteria' || d.materialDeConstruccion === 'Prefabricado') && d.tipoMamposteriaConcretoPrefabricado == null) {
            $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
        } else {
            if (d.tipoMamposteriaConcretoPrefabricado != null) {
                d.tipoMamposteriaConcretoPrefabricadoPts = validarRadio('tipo_select').getAttribute('puntos')
            }
            d.alturaEntrePisosPts = validarRadio('alturaEntrePisos').getAttribute('puntos')
            d.materialDeConstruccionPts = validarRadio('descripcionVivienda').getAttribute('puntos')
            if(d.materialDeConstruccion === "otro"){
                d.materialDeConstruccion = $("#otroDescripcionVivienda")[0].value
            }
            postSencilla('/parte7', d)
                .then(respuesta => {
                    cambio($btn)
                })

        }
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
    }
})

$("input[name=descripcionVivienda]").click(
    function (e) {
        let tp = e.target.getAttribute("id")
        if (tp === 'B.Concreto') {
            $('#concreto')[0].classList.remove('ocultarHijos')
            $('#prefabricado')[0].classList.add('ocultarHijos')
            $('#mamposteria')[0].classList.add('ocultarHijos')
        }
        else if (tp === 'Mamposteria') {
            $('#concreto')[0].classList.add('ocultarHijos')
            $('#prefabricado')[0].classList.add('ocultarHijos')
            $('#mamposteria')[0].classList.remove('ocultarHijos')
        }
        else if (tp === 'Prefabricado') {
            $('#concreto')[0].classList.add('ocultarHijos')
            $('#prefabricado')[0].classList.remove('ocultarHijos')
            $('#mamposteria')[0].classList.add('ocultarHijos')
        } else {
            $('#concreto')[0].classList.add('ocultarHijos')
            $('#prefabricado')[0].classList.add('ocultarHijos')
            $('#mamposteria')[0].classList.add('ocultarHijos')
        }
    })