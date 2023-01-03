const linkWeather = "https://api.openweathermap.org/data/2.5/weather?q="
const linkWallpaper = "https://api.unsplash.com/"
const city = document.getElementById('search')
const btn = document.getElementById('btn')
const log = document.getElementById('log')
const getWeather = (city) =>{
    fetch(`${linkWeather}${city}&appid=2be90a0b516a3da1e524047c4f37dad6`)
    .then((res) => res.json())
    .then((data) => {
        log.innerHTML = Math.round(data.main.temp - 273)
    })
}

const getWallpaper = (city) =>{
    fetch(`${linkWallpaper}`)
}
 
btn.addEventListener('click', ()=>{
    getWeather(city.value)
})
