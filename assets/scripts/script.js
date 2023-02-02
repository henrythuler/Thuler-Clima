//Pegando minha div que contém o resultado da pesquisa
let resultado = document.querySelector(".resultado")

//Ao ser enviado o meu input de busca, cancelamos a execução natural dele
document.querySelector('.busca').addEventListener('submit', async (event) => {

    event.preventDefault();

    //Pegando o valor digitado no meu campo de busca
    let inputValue = document.querySelector('#busca').value;

    //Pegando meu elemento de aviso de erro
    let aviso = document.querySelector('.aviso')

    //Se o valor digitado for diferente de vazio
    if(inputValue !== ''){

        //Escondemos o aviso
        aviso.style.display = 'none'

        //Escondemos o resultado
        resultado.style.display = 'none'

        //Exibimos o loading
        showLoading()

        //Montando a minha url para a requisição
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=5b90fb5cd931e1a08ef7052b9e92501d&units=metric&lang=pt_br`

        //Fazendo a requisição
        let req = await fetch(url)

        //Pegando o valor da requisição e transformando em JSON
        let res = await req.json()

        //Se a requisição deu certo
        if(res.cod === 200){

            //Exibimos as informações
            showInfo(res)
        
        //Caso contrário, mostramos o aviso de erro e escondemos o resultado
        }else{        

            resultado.style.display = 'none'

            aviso.style.display = 'block'
            
            aviso.innerHTML = "Não encontramos essa localização..."

        }

        //Resetando o valor do campo de busca
        document.querySelector('#busca').value = ''

        //Escondendo o loading
        showLoading()

    //Caso contrário, mantemos o resultado e o aviso escondidos
    }else{

        resultado.style.display = 'none'

        aviso.style.display = 'none'

    }

})

//Função para exibir o meu loading
function showLoading(){

    //Pegando o meu elemento de loading
    let loader = document.querySelector('.loader')

    //Se o elemento de loading está escondido, então exibimos
    if(loader.style.display == '' || loader.style.display == 'none'){

        loader.style.display = 'block'

    //Caso contrário, escondemos
    }else{

        loader.style.display = 'none'

    }

}

//Função para exibir as informações recebidas da requisição
function showInfo(res){

    //Exibindo o nome da cidade e país
    document.querySelector('.titulo').innerHTML = `${res.name}, ${res.sys.country}`

    //Exibindo a temperatura atual
    document.querySelector('.temp-info').innerHTML = `<strong>${parseInt(res.main.temp)}</strong><sup>ºC</sup>`

    //Exibindo a temperatura mínima
    document.querySelector('.temp-min').innerHTML = `Min: <strong>${parseInt(res.main.temp_min)}</strong><sup>ºC</sup>`

    //Exibindo a temperatura máxima
    document.querySelector('.temp-max').innerHTML = `Max: <strong>${parseInt(res.main.temp_max)}</strong><sup>ºC</sup>`

    //Exibindo a sensação térmica
    document.querySelector('.temp-sens').innerHTML = `Sensação Térmica: <strong>${parseInt(res.main.feels_like)}</strong><sup>ºC</sup>`

    //Exibindo o clima atual, transformando a primeira letra em maiúscula
    document.querySelector('.img-titulo').innerHTML = `${res.weather[0].description[0].toUpperCase()}${res.weather[0].description.substring(1)}`

    //Exibindo a imagem referente ao clima
    document.querySelector('.img-tempo img').src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`

    //Exibindo a velocidade do vento
    document.querySelector('.vento-info').innerHTML = `<strong>${res.wind.speed}</strong><span> km/h</span>`

    //Exibindo a angulação do vento
    document.querySelector('.vento-ponto').style.transform = `rotate(${res.wind.deg - 90}deg)`

    //Exibindo o meu resultado
    resultado.style.display = 'block'

}