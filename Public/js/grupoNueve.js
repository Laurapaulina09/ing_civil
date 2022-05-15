let imagenesHundimiento=[]
let imagenesGrietas=[]
$('#inputImageHundimiento').change(function(event){
    imagenesHundimiento.push(event.target.files[0])
    event.value=null
    if(imagenesHundimiento.length<=2){
        mostrarImagen('#imagenesHundimiento', imagenesHundimiento, 'imagenesHundimiento')
    }else{
        imagenesHundimiento.pop()
    }
    
})
$('#inputImageGrieta').change(function(event){
    console.log('rfefre')
    imagenesGrietas.push(event.target.files[0])
    event.value=null
    if(imagenesGrietas.length<=2){
        mostrarImagen('#imagenesGrietas', imagenesGrietas, 'imagenesGrietas')
    }else{
        imagenesGrietas.pop()
    }
    
})
function mostrarImagen(id, arregloImagenes, nombreArreglo){
    $(id)[0].innerHTML=''
    for(let i= 0; i<arregloImagenes.length; i++){
        let imageIndex = URL.createObjectURL(arregloImagenes[i])
        $(id)[0].innerHTML+=`<body>
        <div style="width:190px; height:180px; overflow:hidden; position:relative; border-radius:5px;box-shadow: 4px 4px 4px -3px rgba(168,165,168,1); margin:5px">
          <div style="position:absolute;right:5px;top:5px; cursor:pointer" onclick="quirarImagen('${nombreArreglo}',${i} )">
            <img width="40px" src="https://icon-library.com/images/close-icon-png/close-icon-png-9.jpg"/>
          </div>
          <img style="width:100%; height:100%; object-fit:contain;" src="${imageIndex}" alt="">
      </div>`
    }
}
function quirarImagen(arreglo, index){
    if(arreglo==='imagenesHundimiento'){
        imagenesHundimiento.splice(index,1)
        mostrarImagen('#imagenesHundimiento', imagenesHundimiento, 'imagenesHundimiento')
    }else{
        imagenesGrietas.splice(index,1)
        mostrarImagen('#imagenesGrietas', imagenesGrietas, 'imagenesGrietas')
    }
}

$("input[name=dañoHundimiento]").change(function(event){
    if(event.target.getAttribute('id') == 'si'){
        $('#contenedorHundimiento')[0].classList.remove('ocultarHijos')
    }else{
        $('#contenedorHundimiento')[0].classList.add('ocultarHijos')
    }
})
$("input[name=dañoGrietas]").change(function(event){
    if(event.target.getAttribute('id') == 'si'){
        $('#contenedorGrietas')[0].classList.remove('ocultarHijos')
    }else{
        $('#contenedorGrietas')[0].classList.add('ocultarHijos')
    }
})

$("#parteNueve").click(function(){
    let $btn = $(this)
    let d ={
        danoGrietas:validarRadio2('dañoGrietas'),
        danoGrietasPts:null,
        danoHundimiento:validarRadio2('dañoHundimiento'),
        danoHundimientoPts:null,
        cedula:localStorage.getItem('cedula')
    }
    if(d.danoGrietas != null && d.danoHundimiento != null){
        d.danoGrietasPts=validarRadio('dañoGrietas').getAttribute('puntos')
        d.danoHundimientoPts=validarRadio('dañoHundimiento').getAttribute('puntos')
        if((d.danoGrietas =='si' && imagenesGrietas.length == 0) || (d.danoHundimiento=='si' && imagenesHundimiento.length==0 )){
            $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hallas llenado todos los campos"></info-mensaje>`
        }else{
            var formData = new FormData();
            if(d.danoGrietas=='si'){
                formData.append("foto1Grietas", imagenesGrietas[0]);
                formData.append("foto2Grietas", imagenesGrietas[1]);
            }
            if(d.danoHundimiento=='si'){
                formData.append("foto1Hundimiento", imagenesHundimiento[0]);
                formData.append("foto2Hundimiento", imagenesHundimiento[1]);
            }
            if(d.danoGrietas=='no' && d.danoHundimiento=='no'){
                formData.append("foto1Grietas", null);
                formData.append("foto2Grietas", null);
                formData.append("foto1Hundimiento", null);
                formData.append("foto2Hundimiento", null);
            }
            envioFile('', formData, d).then(res => {
                localStorage.clear('cedula')
                cambio($btn)
            })
        }
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hallas llenado todos los campos"></info-mensaje>`
    }
    //cambio($btn)
})
