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
    console.log(stepIndex)
    if (stepIndex === 0 || stepIndex === 1 || stepIndex === 2 || stepIndex === 3 || stepIndex === 4 || stepIndex === 5 || stepIndex === 6 || stepIndex === 7 || stepIndex === 8 || stepIndex === 9) { step1($step, $pag); }
    else { step3($step, $pag); }
}

function validarRadio(name){
    let allElements=$("input[name="+name);
    let elemento=null
    for(let i=0; i<allElements.length;i++){
        if(allElements[i].checked){
            elemento=allElements[i]
            break
        }
    }
    return elemento
}
function validarRadio2(name){
    let elemento = validarRadio(name)
    if(elemento == null){
        return null
    }else{
        return elemento.getAttribute("id")
    }
}

$('.cajaMensaje').mouseover(function(){
    this.getElementsByClassName("mensajeOculto")[0].style.top='-'+this.getElementsByClassName("mensajeOculto")[0].clientHeight+'px'
})



function step1($step, $pag) {
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
/*
function mostrarMensaje(idElementoMostrar) {
    document.getElementById(idElementoMostrar).classList().remove('ocultar')
    alert('wdewdw')
}*/