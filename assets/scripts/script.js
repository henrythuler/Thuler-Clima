let resultado = document.querySelector(".resultado")

document.querySelector('.busca').addEventListener('submit', async (event) => {

    event.preventDefault();

    let inputValue = document.querySelector('#busca').value;

    let aviso = document.querySelector('.aviso')

    if(inputValue !== ''){

        aviso.style.display = 'none'

        resultado.style.display = 'none'

        showLoading()

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=5b90fb5cd931e1a08ef7052b9e92501d&units=metric&lang=pt_br`

        let req = await fetch(url)

        let res = await req.json()

        if(res.cod === 200){

            console.log(res)
            showInfo(res)

        }else{        

            resultado.style.display = 'none'

            aviso.style.display = 'block'
            
            aviso.innerHTML = "Não encontramos essa localização..."

        }

        document.querySelector('#busca').value = ''

        showLoading()

    }else{

        resultado.style.display = 'none'

        aviso.style.display = 'none'

    }

})

function showLoading(){
    let loader = document.querySelector('.loader')

    if(loader.style.display == '' || loader.style.display == 'none'){

        loader.style.display = 'block'

    }else{

        loader.style.display = 'none'

    }

}

function showInfo(res){

    document.querySelector('.titulo').innerHTML = `${res.name}, ${res.sys.country}`

    document.querySelector('.temp-info').innerHTML = `<strong>${parseInt(res.main.temp)}</strong><sup>ºC</sup>`

    document.querySelector('.temp-min').innerHTML = `Min: <strong>${parseInt(res.main.temp_min)}</strong><sup>ºC</sup>`

    document.querySelector('.temp-max').innerHTML = `Max: <strong>${parseInt(res.main.temp_max)}</strong><sup>ºC</sup>`

    document.querySelector('.temp-sens').innerHTML = `Sensação Térmica: <strong>${parseInt(res.main.feels_like)}</strong><sup>ºC</sup>`

    document.querySelector('.img-titulo').innerHTML = `${res.weather[0].description[0].toUpperCase()}${res.weather[0].description.substring(1)}`

    document.querySelector('.img-tempo img').src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`

    document.querySelector('.vento-info').innerHTML = `<strong>${res.wind.speed}</strong><span> km/h</span>`

    document.querySelector('.vento-ponto').style.transform = `rotate(${res.wind.deg - 90}deg)`

    resultado.style.display = 'block'

}