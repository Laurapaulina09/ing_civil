let fotoFrente = null;

$("#parteTres").click(function () {
    let $btn = $(this)
    let tercerGrupo = {
        areaVivienda: null,
        ubicacion: null,
        ubicacionPts: null,
        cedula:localStorage.getItem('cedula')
    }
    tercerGrupo.areaVivienda = validarRadio("area")
    tercerGrupo.ubicacion = validarRadio("ubicacionVivienda")
    if (tercerGrupo.areaVivienda != null && fotoFrente != null && tercerGrupo.ubicacion != null) {
        tercerGrupo.areaVivienda = tercerGrupo.areaVivienda.getAttribute("id")
        tercerGrupo.ubicacionPts = tercerGrupo.ubicacion.getAttribute("puntos")
        tercerGrupo.ubicacion = tercerGrupo.ubicacion.getAttribute("id")

        /*
            Se envia el tercer paquete de respuestas
            se envia un archivo con el key de "foto" y un JSON 
            con la siguiente infromación{
                areaVivienda: null,
                ubicacion: null
            }
        */
        var formData = new FormData();
        formData.append("foto", fotoFrente);
        postSencilla('/parte3A',tercerGrupo)
        .then(response=>{
            envioFile('/p3BsubirImagenFrente/'+localStorage.getItem('cedula'), formData).then(res => {
                cambio($btn)
            })
        })
    }else{
        //$("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
        cambio($btn)
    }
    //
})

$("#inputImageCasaFrente").change(function (event) {
    fotoFrente = event.target.files[0]
    $("#imagenFrenteVivienda")[0].innerHTML = '<img class="fotoImagenVienda" src=""/>'
    $(".fotoImagenVienda")[0].src = URL.createObjectURL(fotoFrente)
})


