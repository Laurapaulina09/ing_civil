class InfoMensaje extends HTMLElement{
    constructor(){
        super()
    }
    static get observedAttributes(){
        return ['typeMessage', 'message', 'idElement', 'link']
    }
    get typeMessage(){
        let tipoMensaje = this.getAttribute('typeMessage')
        switch (tipoMensaje){
            case 'successfull':
                return '<i class="bi bi-check-circle-fill text-success"></i>'
            case 'warning':
                return '<i class="bi bi-exclamation-octagon-fill text-warning"></i>'
            case 'error':
                return '<i class="bi bi-exclamation-octagon-fill text-danger"></i>'
        }
    }
    get message(){
        return this.getAttribute('message')
    }
    get link(){
        if (this.getAttribute('link')){
            return `<div class="m-2"><button type="button" class="btn btn-success px-2 py-1" onclick="window.location.href='${this.getAttribute('link')}'">Ir a inicio</button></div>`
        }else{
            return ''
        }
    }
    get idElement(){
        return this.getAttribute('idElement')
    }
    eliminar(uno){
        document.getElementById(uno.idElement).innerHTML=''
        
    }
    connectedCallback(){
        this.render()
        var uno = this
        document.getElementById('btn-aceptar').addEventListener('click', function(){
            uno.eliminar(uno)
        })
        document.getElementById('btn-close').addEventListener('click', function(){
            uno.eliminar(uno)
        })
    }
    render(){
        this.innerHTML = `
        <style>
        .superior *{
            margin: 0px;
            padding: 0px;
            font-size: 16px;
            box-sizing: border-box;
        }
        .superior{
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 100000000;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(128, 128, 128, 0.4);
        }
        .mensaje{
            width: 300px;
            background-color: white;
            border-radius: 10px;
        }
        .body{
            padding: 10px;
        }
        .close{
            border-radius: 5px 10px 5px 5px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .close i{
            font-size: 30px;
            cursor: pointer;
        }
        .close:active{
            background-color: #dc3545;
        }
        .close i:active{
            color: #ffffff;
        }
        .icon-info{
            text-align: center;
        }
        .icon-info i {
            font-size: 48px;
        }
    </style>
    <div class="superior">
        <div class="mensaje shadow">
            <div class="header position-relative">
                <div class="icon-info">
                    ${this.typeMessage}
                </div>
                <div class="close position-absolute top-0 end-0" id="btn-close">
                    <i class="bi bi-x"></i>
                </div>
            </div>
            <hr>
            <div class="body">
                ${this.message}
            </div>
            <hr>
            <div class="footer">
                <div class="d-flex justify-content-end">
                    ${this.link}
                    <div class="m-2">
                        <button type="button" id="btn-aceptar" class="btn btn-primary px-2 py-1">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
    
}

customElements.define('info-mensaje', InfoMensaje)