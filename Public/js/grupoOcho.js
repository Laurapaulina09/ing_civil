$("#parteOcho").click(function () {
    let $btn = $(this)
    let d = {
        tipoEntrePiso: validarRadio2('entrepiso'),
        tipoEntrePisoPts: null,
        tipoTecho: validarRadio2('techo'),
        tipoTechoPts: null,
        cedula:localStorage.getItem('cedula')
    }
    if (d.tipoEntrePiso != null && d.tipoTecho) {
        d.tipoEntrePisoPts = validarRadio('entrepiso').getAttribute('puntos')
        d.tipoTechoPts = validarRadio('techo').getAttribute('puntos')
        postSencilla('', d)
            .then(respuesta => {
                cambio($btn)
            })
    } else {
        $("#mensaje")[0].innerHTML = `<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hallas llenado todos los campos"></info-mensaje>`
    }
    //cambio($btn)
})