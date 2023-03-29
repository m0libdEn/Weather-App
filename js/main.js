const todayWeather = document.getElementsByClassName('tempToday')
const todayIcon = document.getElementsByClassName('1stDayIcon')
const wind = document.getElementById('wind')
const hum = document.getElementById('hum')
const rain = document.getElementById('rain')
const todayDate = document.getElementsByClassName('TodayDate')
const todayMonth = document.getElementsByClassName('TodayMonth')
const todayYear = document.getElementsByClassName('TodayYear')

const secondDayWeather = document.getElementsByClassName('2ndDayTemp')
const secondDayIcon = document.getElementsByClassName('2ndDayIcon')
const secondDate = document.getElementsByClassName('SecondDate')
const secondMonth = document.getElementsByClassName('SecondMonth')
const secondYear = document.getElementsByClassName('SecondYear')
const secondWind = document.getElementById('secondWind')
const secondHum = document.getElementById('secondHum')
const secondRain = document.getElementById('secondRain')

const thirdDayWeather = document.getElementsByClassName('3rdDayTemp')
const thirdDayIcon = document.getElementsByClassName('3rdDayIcon')
const thirdDate = document.getElementsByClassName('ThirdDate')
const thirdMonth = document.getElementsByClassName('ThirdMonth')
const thirdYear = document.getElementsByClassName('ThirdYear')
const thirdWind = document.getElementById('thirdWind')
const thirdHum = document.getElementById('thirdHum')
const thirdRain = document.getElementById('thirdRain')

const forthDayWeather = document.getElementsByClassName('4thDayTemp')
const forthDayIcon = document.getElementsByClassName('4thDayIcon')
const forthDate = document.getElementsByClassName('ForthDate')
const forthMonth = document.getElementsByClassName('ForthMonth')
const forthYear = document.getElementsByClassName('ForthYear')
const forthWind = document.getElementById('forthWind')
const forthHum = document.getElementById('forthHum')
const forthRain = document.getElementById('forthRain')

const fifthDayWeather = document.getElementsByClassName('5thDayTemp')
const fifthDayIcon = document.getElementsByClassName('5thDayIcon')
const fithDate = document.getElementsByClassName('FithDate')
const fithMonth = document.getElementsByClassName('FithMonth')
const fithYear = document.getElementsByClassName('FithYear')
const fithWind = document.getElementById('fifthWind')
const fithHum = document.getElementById('fifthHum')
const fithRain = document.getElementById('fifthRain')

const cityOfLocation = document.getElementById('cityName')
const countryOfLocation = document.getElementById('CountryName')

const search = document.getElementById('search')
const btn = document.getElementById('btn')
const wallpaper = document.getElementById('ibg')

const celcius = document.getElementById('celcius')
const farenheit = document.getElementById('farenheit')

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
        hum.innerHTML = Math.round(data.list[0].main.humidity)
        rain.innerHTML = Math.round(data.list[0].pop*100)
        changeDateInfo(todayDate,todayMonth,todayYear,day)
        updateInfo(secondDayWeather, secondDayIcon, data.list[14].main.temp, data.list[14].weather[0].main)
        changeDateInfo(secondDate,secondMonth,secondYear,day)
        secondWind.innerHTML =  Math.round(data.list[14].wind.speed*3.6)
        secondHum.innerHTML = Math.round(data.list[14].main.humidity)
        secondRain.innerHTML = Math.round(data.list[14].pop*100) 
        updateInfo(thirdDayWeather, thirdDayIcon, data.list[22].main.temp, data.list[22].weather[0].main)
        changeDateInfo(thirdDate,thirdMonth,thirdYear,day)
        thirdWind.innerHTML =  Math.round(data.list[22].wind.speed*3.6)
        thirdHum.innerHTML = Math.round(data.list[22].main.humidity)
        thirdRain.innerHTML = Math.round(data.list[22].pop*100)
        updateInfo(forthDayWeather, forthDayIcon, data.list[30].main.temp, data.list[30].weather[0].main)
        changeDateInfo(forthDate,forthMonth,forthYear,day)
        forthWind.innerHTML =  Math.round(data.list[30].wind.speed*3.6)
        forthHum.innerHTML = Math.round(data.list[30].main.humidity)
        forthRain.innerHTML = Math.round(data.list[30].pop*100)
        updateInfo(fifthDayWeather, fifthDayIcon, data.list[38].main.temp, data.list[36].weather[0].main)
        changeDateInfo(fithDate,fithMonth,fithYear,day)
        fifthWind.innerHTML =  Math.round(data.list[38].wind.speed*3.6)
        fifthHum.innerHTML = Math.round(data.list[38].main.humidity)
        fifthHum.innerHTML = Math.round(data.list[38].pop*100)
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
    for (let index = 0; index < day.length; index++) {
        if (celcius.classList.contains('active')) {
            day[index].innerHTML = Math.round(temperature - 273)
        }else{
            day[index].innerHTML = Math.round(temperature*(9/5)-459.67)
        }
        changeIconSetting(icon[index], weather)
    }
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
    console.log(day);
   for (let index = 0; index < whichDate.length; index++) {
    whichDate[index].innerHTML = changeNameOfDay(day.getDate())
    outputMonth(day.getMonth(), whichMonth[index])
    whichYear[index].innerHTML = day.getFullYear()
   }
   day.setDate(day.getDate()+1)
}

celcius.addEventListener('click', function(){
    switchTemp(celcius, farenheit)
    getWeather(cityOfLocation.textContent)
})

farenheit.addEventListener('click', function(){
    switchTemp(farenheit, celcius)
    getWeather(cityOfLocation.textContent)
})

function switchTemp(temp1, temp2){
    if (!(temp1.classList.contains('active'))) {
        temp2.classList.remove('active')
        temp1.classList.add('active')
    }
}