var country =document.getElementById("country");
var search = document.getElementById("search");
var langs = document.querySelectorAll(".dropdown-menu li a");
var temp = document.getElementById("temp")
var weatherDescription = document.getElementById("weath-desc");
var weathericon = document.getElementById("weath-icon");
var currentTime = document.getElementById("current-time");
var hourlyForcast = document.getElementById("hourly-forcast");
var weeklyForcast = document.getElementById("weekly-forcast");
let language;


// default country
forcast("Alexandria","en");

search.addEventListener("keyup",function(){
    forcast(search.value, language);


})

async function forcast (location, language){
    var response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ecfb7d84f7ba4aa18c5202456221410&q=${location}&days=7&lang=${language}`);
    var result = await response.json();
    country.innerHTML =`${result.location.name}, ${result.location.region},${result.location.country}`;
    
    temp.innerHTML= `${result.current.temp_c} &#8451`;
    weatherDescription.innerHTML =`${result.current.condition.text}
                                    <img id="weath-icon" 
                                    class="count-icon fs-4" 
                                    src="${result.current.condition.icon}"/>`;
    currentTime.innerHTML = `${today()} ${result.location.localtime}`;
    var HourlyArray =  result.forecast.forecastday[0].hour ;
    var data=``;
        for (var i=0; i<HourlyArray.length; i=i+2){
            data += `<div class="forc-capt col justify-content-center align-items-center  d-flex flex-column">
                        <p class="mb-0">${i}:00</p>
                        <img class="count-icon mb-1" src="${HourlyArray[i].condition.icon}"/>
                        <p>${HourlyArray[i].condition.text}</p>
                        <p><i class="fa-solid pe-1 fa-umbrella"></i>${HourlyArray[i].humidity}%</p>
                        <p>${HourlyArray[i].temp_c}&#8451</p>
                        <p><i class="fa-solid fa-wind"></i>${HourlyArray[i].wind_kph}km/h</p>
                        <p><i class="fa-solid fa-compass"></i>${HourlyArray[i].wind_dir}</p>
                    </div>` 

        }
    hourlyForcast.innerHTML = data
    // console.log(result);
    var dailyArray = result.forecast.forecastday;
    var cont='';
    var date =new Date()
    var todayIndex = date.getDay()
    
    for(var i=0; i<dailyArray.length ; i++){
        if(todayIndex+i > 6){
            todayIndex =-1
        }
        // console.log(todayIndex+i)
        cont +=`<div class="forc-capt col justify-content-center align-items-center  d-flex flex-column">
                    <p class="mb-0">${days[todayIndex+i]}</p>
                    <img class="count-icon mb-1" src="${dailyArray[i].day.condition.icon}"/>
                    <p>${dailyArray[i].day.condition.text}</p>
                    <p><i class="fa-solid pe-1 fa-temperature-arrow-up"></i>${dailyArray[i].day.maxtemp_c}&#8451</p>
                    <p><i class="fa-solid pe-1 fa-temperature-arrow-down"></i>${dailyArray[i].day.mintemp_c}&#8451</p>
                    <p><i class="fa-solid pe-1 fa-umbrella"></i>${dailyArray[i].day.avghumidity}%</p>
                    <p><i class="fa-solid pe-1 fa-wind"></i>${dailyArray[i].day.maxwind_kph}km/h</p>
                    </div>`
    }
    weeklyForcast.innerHTML = cont;
    // console.log(dailyArray[0]);

}


for(let i =0 ; i<langs.length; i++){
    langs[i].addEventListener("click", function(){
        language = this.getAttribute("data-lang");
    })
}
var days=["Sunday", "Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"];

var today = function getCurrentDay(){
    var date =new Date();
    var today = days[date.getDay()]
    // console.log(date.getDay())
    return today;
}
