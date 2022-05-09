/*$('.button').click(function () {
    var $btn = $(this),
        $step = $btn.parents('.modal-body'),
        stepIndex = $step.index(),
        $pag = $('.modal-header span').eq(stepIndex);

    if (stepIndex === 0 || stepIndex === 1 || stepIndex === 2 || stepIndex === 3 || stepIndex === 4 || stepIndex === 5 || stepIndex === 6 || stepIndex === 7 ) { step1($step, $pag); }
    else { step3($step, $pag); }

});*/
(function () {
    let departamento = $("#departamento")[0]
    departamentos.forEach(elemento => {
        departamento.innerHTML += `<option value="${elemento.id}">${elemento.departamento}</option>`
    })
})()
function selectMunicipio(){
    let departamento = $("#departamento")[0].value
    let muni = municipios.filter(ele=> ele.id_departamento == departamento)
    let municipio = $("#municipio")[0]
    municipio.innerHTML=`<option selected disabled>Selecciona el municipio</option>`
    muni.forEach(elemento=>{
        municipio.innerHTML+=`<option value="${elemento.id_municipio}">${elemento.nombre}</option>`
    })
    
}
function cambio($btn) {
    $step = $btn.parents('.modal-body'),
        stepIndex = $step.index(),
        $pag = $('.modal-header span').eq(stepIndex);

    if (stepIndex === 0 || stepIndex === 1 || stepIndex === 2 || stepIndex === 3 || stepIndex === 4 || stepIndex === 5 || stepIndex === 6 || stepIndex === 7) { step1($step, $pag); }
    else { step3($step, $pag); }
}

function validarRadio(name){
    let allElements=$("input[name="+name);
    let elemento=null
    for(let i=0; i<allElements.length;i++){
        console.log(allElements[i])
        if(allElements[i].checked){
            elemento=allElements[i]
            break
        }
    }
    return elemento
}

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
        cambio($btn)
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
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hallas llenado todos los campos"></info-mensaje>`
        console.log("No valido")
        //cambio($btn)
    }
})

$("#parteDos").click(function(){
    let $btn = $(this)
    let d={
        nivelFormacion:validarRadio("formacion"),
        anoConstruccion:validarRadio("anio"),
        entidad:validarRadio("entidad"),
        constructora:$('#nameConstructora')[0].value
    }
    
    if(d.formacion != null && d.anoConstruccion != null && d.entidad != null){
        d.formacion=d.formacion.getAttribute("id")
        d.anoConstruccion=d.anoConstruccion.getAttribute("id")
        d.entidad=d.entidad.getAttribute("id")
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
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hallas llenado todos los campos"></info-mensaje>`
        //cambio($btn)
    }
})


function step1($step, $pag) {
    console.log('step1');
    // animate the step out
    $step.addClass('animate-out');

    // animate the step in
    setTimeout(function () {
        $step.removeClass('animate-out is-showing')
            .next().addClass('animate-in');
        $pag.removeClass('is-active')
            .next().addClass('is-active');
    }, 600);

    // after the animation, adjust the classes
    setTimeout(function () {
        $step.next().removeClass('animate-in')
            .addClass('is-showing');

    }, 1200);
}


function step3($step, $pag) {
    console.log('3');

    // animate the step out
    $step.parents('.modal-wrap').addClass('animate-up');

    setTimeout(function () {
        $('.rerun-button').css('display', 'inline-block');
    }, 300);
}

$('.rerun-button').click(function () {
    $('.modal-wrap').removeClass('animate-up')
        .find('.modal-body')
        .first().addClass('is-showing')
        .siblings().removeClass('is-showing');

    $('.modal-header span').first().addClass('is-active')
        .siblings().removeClass('is-active');
    $(this).hide();
});

function mostrarMensaje(idElementoMostrar) {
    document.getElementById(idElementoMostrar).classList().remove('ocultar')
    alert('wdewdw')
}