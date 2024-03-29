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
            $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
        }else{
            var formData = new FormData();
            if(d.danoGrietas=='si'){
                formData.append("foto", imagenesGrietas[0]);
                formData.append("foto", imagenesGrietas[1]);
            }else{
                formData.append("foto", null);
                formData.append("foto", null);
            }
            if(d.danoHundimiento=='si'){
                formData.append("foto", imagenesHundimiento[0]);
                formData.append("foto", imagenesHundimiento[1]);
            }else{
                formData.append("foto", null);
                formData.append("foto", null);
            }
            if(d.danoGrietas=='no' && d.danoHundimiento=='no'){
                let aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
                let oMyBlob = new Blob(aFileParts, {type : 'text/html'});
                formData.append("foto", null);
                formData.append("foto", null);
                formData.append("foto", null);
                formData.append("foto", null);
            }
            envioFile('/parte9A/'+ localStorage.getItem('cedula'), formData).then(res => {
                postSencilla('/parte9B', d)
                .then(resp=>{
                    cambio($btn)
                    buscarPuntaje()
                })
            })
        }
    }else{
        $("#mensaje")[0].innerHTML=`<info-mensaje typeMessage="error" idElement="mensaje" message="Verifica la información ingresada y/o que hayas llenado todos los campos"></info-mensaje>`
    }
    //cambio($btn)
})

function buscarPuntaje(){
    fetch('/gravedadVivienda/'+localStorage.getItem('cedula'), {
        method:'POST'
    })
    .then(response=>{
        return response.json()
    })
    .then(respuesta=>{
        console.log(respuesta)
        $('#resultado')[0].innerHTML=respuesta.respuestadb.puntaje
        $('#porcentaje')[0].innerHTML=Math.round(respuesta.respuestadb.escalaGravedad)+'%'
        //border: FA0B0B#F57F17;
        //color: #F57F17;
        if(respuesta.respuestadb.escalaGravedad <=30){
            //baja
            $('#gravedad')[0].innerHTML='baja'
            $('#resultado')[0].style.color='#6AF544'
            $('#resultado')[0].style.border='4px solid #6AF544'

        }else if(respuesta.respuestadb.escalaGravedad <=60){
            //media
            $('#gravedad')[0].innerHTML='media'
            $('#resultado')[0].style.color='#FEF60A'
            $('#resultado')[0].style.border='4px solid #FEF60A'
        }else if(respuesta.respuestadb.escalaGravedad <=80){
            //alta
            $('#gravedad')[0].innerHTML='alta'
            $('#resultado')[0].style.color='#FA7B0B'
            $('#resultado')[0].style.border='4px solid #FA7B0B'
        }else{
            //extrema
            $('#gravedad')[0].innerHTML='extrema'
            $('#resultado')[0].style.color='#FA0B0B'
            $('#resultado')[0].style.border='4px solid #FA0B0B'
        }
    })
}
