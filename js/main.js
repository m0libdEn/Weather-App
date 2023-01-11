const city = document.getElementById('search')
const btn = document.getElementById('btn')
const log = document.getElementById('log')
const wallpaper = document.getElementById('ibg')

const getWeather = (city) =>{
    const linkWeather = "https://api.openweathermap.org/data/2.5/weather?q="
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
    loadIbg(city.value)
})

function loadIbg(city){
    const linkWallpaper = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=Df0YGgE3Ak3PvYe_0MIreDZm3ps2MMqb77gl0QvpQLQ`
    fetch(linkWallpaper)
    .then((res) => res.json())
    .then(data =>{
        wallpaper.setAttribute('src', data.results[1].urls.raw)
    })
}

function ibg(){
	$.each($('.ibg'), function(index, val) {
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}