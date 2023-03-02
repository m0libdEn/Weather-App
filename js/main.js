const todayWeather = document.getElementById('tempToday')
const todayIcon = document.getElementById('1stDayIcon')
const wind = document.getElementById('wind')
const hum = document.getElementById('hum')
const rain = document.getElementById('rain')
const todayDate = document.getElementById('TodayDate')
const todayMonth = document.getElementById('TodayMonth')
const todayYear = document.getElementById('TodayYear')

const secondDayWeather = document.getElementById('2ndDayTemp')
const secondDayIcon = document.getElementById('2ndDayIcon')
const secondDate = document.getElementById('SecondDate')
const secondMonth = document.getElementById('SecondMonth')
const secondYear = document.getElementById('SecondYear')

const thirdDayWeather = document.getElementById('3rdDayTemp')
const thirdDayIcon = document.getElementById('3rdDayIcon')
const thirdDate = document.getElementById('ThirdDate')
const thirdMonth = document.getElementById('ThirdMonth')
const thirdYear = document.getElementById('ThirdYear')

const forthDayWeather = document.getElementById('4thDayTemp')
const forthDayIcon = document.getElementById('4thDayIcon')
const forthDate = document.getElementById('ForthDate')
const forthMonth = document.getElementById('ForthMonth')
const forthYear = document.getElementById('ForthYear')

const fifthDayWeather = document.getElementById('5thDayTemp')
const fifthDayIcon = document.getElementById('5thDayIcon')
const fithDate = document.getElementById('FithDate')
const fithMonth = document.getElementById('FithMonth')
const fithYear = document.getElementById('FithYear')

const cityOfLocation = document.getElementById('cityName')
const countryOfLocation = document.getElementById('CountryName')

const search = document.getElementById('search')
const btn = document.getElementById('btn')
const wallpaper = document.getElementById('ibg')




const getWeather = (city) =>{
    const day= new Date()
    day.setDate(day.getDate())
    const linkWeather = "https://api.openweathermap.org/data/2.5/forecast?q="
    fetch(`${linkWeather}${city}&appid=2be90a0b516a3da1e524047c4f37dad6`)
    .then((res) => res.json())
    .then((data) => {
        cityOfLocation.innerHTML = data.city.name
        const convertRegion = new Intl.DisplayNames(['en'], { type: 'region' });
        let country = convertRegion.of(data.city.country)
        countryOfLocation.innerHTML = country
        loadIbg(city, country)
        updateInfo(todayWeather, todayIcon, data.list[0].main.temp, data.list[0].weather[0].main)
        wind.innerHTML =  Math.round(data.list[0].wind.speed*3.6)
        hum.innerHTML = data.list[0].main.humidity
        rain.innerHTML = data.list[0].pop*100 
        changeDateInfo(todayDate,todayMonth,todayYear,day)
        updateInfo(secondDayWeather, secondDayIcon, data.list[12].main.temp, data.list[12].weather[0].main)
        changeDateInfo(secondDate,secondMonth,secondYear,day)
        updateInfo(thirdDayWeather, thirdDayIcon, data.list[20].main.temp, data.list[20].weather[0].main)
        changeDateInfo(thirdDate,thirdMonth,thirdYear,day)
        updateInfo(forthDayWeather, forthDayIcon, data.list[28].main.temp, data.list[28].weather[0].main)
        changeDateInfo(forthDate,forthMonth,forthYear,day)
        updateInfo(fifthDayWeather, fifthDayIcon, data.list[36].main.temp, data.list[36].weather[0].main)
        changeDateInfo(fithDate,fithMonth,fithYear,day)
    })
    .catch(function(){
        search.value = 'The name of city is incorrect or we dot have it in our base, try again!'
        search.style.color ='red'
    })
}
function loadIbg(city, country){
    const linkWallpaper = `https://api.unsplash.com/search/photos?&orientation=landscape&query=${city},${country} architecture&client_id=Df0YGgE3Ak3PvYe_0MIreDZm3ps2MMqb77gl0QvpQLQ`
    fetch(linkWallpaper)
    .then((res) => res.json())
    .then(data =>{
        data.results.forEach(el => {
            wallpaper.setAttribute('src', data.results[0].urls.regular)
        });
    })
}

function ibg(){
	$.each($('.ibg'), function(index, val) {
		if($(this).find('img').length>0){
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}

function changeIconSetting(icon, typeOfWeather){
    icon.src = `img/weather_icons/${typeOfWeather}.svg`
    icon.style.maxHeight = '160px';
}

search.addEventListener('keyup', function(el){
    if(el.key == 'Enter'){
        getWeather(search.value)
        search.value = ''
    }
})

search.addEventListener('click', function(el){
    search.style.color = 'black'
    search.value = ''
})

function updateInfo(day, icon, temperature, weather){
    day.innerHTML = Math.round(temperature - 273)
    changeIconSetting(icon, weather)
}

function outputMonth(number, month){
    switch(number){
        case 0: month.innerHTML = 'Jan'; break;
        case 1: month.innerHTML = 'Feb'; break;
        case 2: month.innerHTML = 'Mar'; break;
        case 3: month.innerHTML = 'Apr'; break;
        case 4: month.innerHTML = 'May'; break;
        case 5: month.innerHTML = 'Jun'; break;
        case 6: month.innerHTML = 'Jul'; break;
        case 7: month.innerHTML = 'Aug'; break;
        case 8: month.innerHTML = 'Sep'; break;
        case 8:month.innerHTML = 'Oct'; break;
        case 10:month.innerHTML = 'Nov'; break;
        case 11:month.innerHTML = 'Dec'; break;
    }
}

function changeNameOfDay(number){
    number = String(number)
    if (number === '11' || number === '12' || number === '13') {
        number+='th'
    } else {
        switch (number[number.length-1]) {
            case '1':number+='st';break;
            case '2':number+='nd';break;
            case '3':number+='rd';break;
            default: number+='th';break;
        }   
    }
    return number
}

function changeDateInfo(whichDate, whichMonth ,whichYear, day){
    whichDate.innerHTML = changeNameOfDay(day.getDate())
    outputMonth(day.getMonth(), whichMonth)
    whichYear.innerHTML = day.getFullYear()
    day.setDate(day.getDate()+1)
}
