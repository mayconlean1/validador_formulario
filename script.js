const validar = {
    envio: evento=>{
        evento.preventDefault()
        let postar = true
        let inputs = document.querySelectorAll('input')
        
        validar.limparErros()
        inputs.forEach(input =>{
            let checagem = validar.checar(input)

            if(!checagem[0]){
                postar = false
                validar.mostrarErro(input , checagem[1])
            }
        })
        if (postar){
            form.submit()
        }
    },

    checar: input=>{ //retorna true/false msgErro
        let tcheck = true // voltar true
        let tmsg = ''
        let regras = input.getAttribute('regras')

        if (regras != null){
            let regra = regras.split('|')
            regra.forEach(regra =>{
                if (regra === 'obrigatorio'){
                    if(input.value == ''){
                        tcheck = false
                        tmsg = 'Campo obrigatório'
                    }
                }else if (regra.match(/min/) !== null){
                    let detalheRegra = regra.split('=')
                    if(input.value.length < detalheRegra[1]){
                        tcheck = false
                        tmsg = tmsg == '' ? `minimo ${detalheRegra[1]} caracteres` : tmsg
                    }   
                }else if (regra === 'email'){
                    if(input.value != ''){
                        let regex = /\S+@\S+\.\S+/
                        if(!regex.test(input.value.toLowerCase())){
                            tcheck = false
                            tmsg = 'Email inválido'
                        }
                    }
                }

            })   
        }   
        return [tcheck , tmsg]
    },

    mostrarErro : (input , mensagemErro)=>{ // add erro na tela
        
        input.classList.add('bordaErro')

        let elementoErro = document.createElement('div')
        elementoErro.classList.add('msgErro')
        elementoErro.textContent = mensagemErro
        input.parentElement.appendChild(elementoErro)
    },

    limparErros : () =>{ 
        let inputs = document.querySelectorAll('input')
        inputs.forEach(input =>{
            input.classList.remove('bordaErro')
        })

        let elementosErro = document.querySelectorAll('.msgErro')
        elementosErro.forEach(erro =>{
            erro.remove()
        })    
    }
}

const form = document.querySelector('.formulario')
form.addEventListener('submit' , validar.envio)

