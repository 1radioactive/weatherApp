import { relevantData } from "./relevantData";

const visibility = document.querySelector(".visibility span");
const humidiity = document.querySelector(".humidity span");
const city = document.getElementById("city");
const time = document.getElementById("time");
const weather = document.querySelector(".weather span");
const actualTemp = document.getElementById("actualtemp");
const feelsLike = document.querySelector(".feelslike p");
const sunrise = document.querySelector(".sunrise h3");
const sunset = document.querySelector(".sunset h3");
const weekinfo = document.querySelector(".weekinfo");
const background = document.getElementById("container");
const celsiusBtn = document.querySelector(".cel");
const fahrenheitBtn = document.querySelector(".fah");
fahrenheitBtn.classList.add("inactiveunit");
celsiusBtn.classList.add("activeunit");
let isCelsius = true;
const author = document.getElementById("author");


celsiusBtn.addEventListener("click",()=>{
    
    celsiusBtn.classList.add("activeunit");
    celsiusBtn.classList.remove("inactiveunit");
    fahrenheitBtn.classList.add("inactiveunit");
    fahrenheitBtn.classList.remove("activeunit");

    isCelsius = true;

    if (city.textcontent === ""){
        data();
    } else {
        data(city.textContent)
    };
});

fahrenheitBtn.addEventListener("click",()=>{
   
    fahrenheitBtn.classList.add("activeunit");
    fahrenheitBtn.classList.remove("inactiveunit");
    celsiusBtn.classList.add("inactiveunit");
    celsiusBtn.classList.remove("activeunit");

    isCelsius = false;

    if (city.textcontent === ""){
        data();
    } else {
        data(city.textContent)
    };

});

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

export default async function data(place = "mumbai"){
    author.textContent = "";
    author.href = "";

    const weatherdata = await relevantData(place);
    console.log(weatherdata);
    const currentHour = weatherdata.timeToCompare.currentTime.currentHour;
    const currentMinute = weatherdata.timeToCompare.currentTime.currentMinute;
    const sunriseHour = weatherdata.timeToCompare.sunrise.currentHour;
    const sunriseMinute = weatherdata.timeToCompare.sunrise.currentHour;
    const sunsetHour = weatherdata.timeToCompare.sunset.currentHour;
    const sunsetMinute = weatherdata.timeToCompare.sunset.currentHour;

    if ((currentHour > sunriseHour || (currentHour === sunriseHour && currentMinute >= sunriseMinute)) 
        && (currentHour < sunsetHour || (currentHour === sunsetHour && currentMinute < sunsetMinute))){
        background.classList.add("daytime");
        background.classList.remove("night");
    } else {
        background.classList.remove("daytime");
        background.classList.add("night")
    };

    if (background.classList.contains("night")){
        author.textContent = "Aron Visuals";
        author.href = "https://unsplash.com/@aronvisuals";
    } else {
        author.textContent = "Yns Plt";
        author.href = "https://unsplash.com/@ynsplt";
    };

    visibility.textContent = weatherdata.currentWeather.visibility;
    humidiity.textContent = weatherdata.currentWeather.humidity;
    city.textContent = weatherdata.address;
    time.textContent = weatherdata.currentWeather.time;
    weather.textContent = weatherdata.currentWeather.condition;
    actualTemp.textContent = isCelsius ? `${fahrenheitToCelsius(weatherdata.currentWeather.temperature).toFixed(1)} °C` : `${weatherdata.currentWeather.temperature} °F`;
    feelsLike.textContent = isCelsius ? `${fahrenheitToCelsius(weatherdata.currentWeather.feelslike).toFixed(1)} °C` : `${weatherdata.currentWeather.feelslike} °F`;
    sunrise.textContent = weatherdata.currentWeather.sunrise;
    sunset.textContent = weatherdata.currentWeather.sunset;
    weekinfo.innerHTML = "";
 
    weatherdata.upcomingDays.forEach((day,index)=>{
        const week = document.createElement("div");
        week.classList.add("day");
        if (index === (weatherdata.upcomingDays.length - 1)){
            week.classList.add("last");
        };
        const date = document.createElement("h4");
        date.classList.add("date");
        const weatherCondition = document.createElement("h2");
        const p1 = document.createElement("p");
        p1.classList.add("max");
        const p2 = document.createElement("p");
        p2.classList.add("min");

        date.textContent = day.day;
        weatherCondition.textContent = day.condition;
        p1.textContent = isCelsius ? `Max: ${fahrenheitToCelsius(day.maxTemp).toFixed(1)} °C` : `Max: ${day.maxTemp} °F`;
        p2.textContent = isCelsius ? `Min: ${fahrenheitToCelsius(day.minTemp).toFixed(1)} °C` : `Min: ${day.minTemp} °F`;
        week.appendChild(date);
        week.appendChild(weatherCondition);
        week.appendChild(p1);
        week.appendChild(p2);
        
        weekinfo.appendChild(week);
    });


}