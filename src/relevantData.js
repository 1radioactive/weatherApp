import { createURL, fetchData } from "./fetchdata";

function convertTo12Hour(timeStr){
    let [hour, minute, second] = timeStr.split(":").map(Number);
    let period = hour>=12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;

};

function compareTime(timeStr){
    const [currentHour, currentMinute] = timeStr.split(":").map(num => parseInt(num, 10));
    return {currentHour, currentMinute};
};


export async function relevantData(place){
    let url = createURL(place);
    const data =  await fetchData(url);
    const timeToCompare = {
        currentTime: compareTime(data.currentConditions.datetime),
        sunrise: compareTime(data.currentConditions.sunrise),
        sunset: compareTime(data.currentConditions.sunset),
    };
    const address = data.resolvedAddress;
    const currentWeather = {
        condition: data.currentConditions.conditions, 
        time: convertTo12Hour(data.currentConditions.datetime),
        humidity: data.currentConditions.humidity,
        sunrise: convertTo12Hour(data.currentConditions.sunrise),
        sunset: convertTo12Hour(data.currentConditions.sunset),
        temperature: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        visibility: data.currentConditions.visibility,
    };
    const upcomingDays = [];
    for (let index = 0; index < 4; index++) {
        const day = data.days[index];
        const dayCondition = {
            condition: day.conditions,
            day: day.datetime,
            maxTemp: day.tempmax,
            minTemp: day.tempmin,
        }
        upcomingDays.push(dayCondition);
    };
    const weatherDescription = data.description;
     
    const relevantInfo = {address, currentWeather, upcomingDays, weatherDescription, timeToCompare};
    return relevantInfo;
};
