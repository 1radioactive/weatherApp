import "./style.css";
import data from "./displayWeather";

const searchLocation = document.getElementById("searchbar");
const searchBtn = document.getElementById("searchButton");
const background = document.getElementById("container");


document.addEventListener("DOMContentLoaded",()=>{
    data();
});

searchBtn.addEventListener("click", ()=>{
    let location = searchLocation.value.toLowerCase();
    console.log(location);
    data(location);
});

