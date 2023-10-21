const apikey="46f80a02ecae410460d59960ded6e1c6";
const cityInputE1=document.getElementById("city-input");
const weatherDataE1=document.getElementById("weather-data");
const formE1=document.querySelector("form");

formE1.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue =cityInputE1.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("network failure");
        }

        const data= await response.json();

        const temperature= Math.round(data.main.temp);
        const description= data.weather[0].description;
        const icon= data.weather[0].icon;

        const details= [
            `feels-like: ${Math.round(data.main.feels_like)}`,
            `humidity : ${data.main.humidity}`,
            `wind speed : ${data.wind.speed}`
        ];

        weatherDataE1.querySelector(".icon").innerHTML= `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataE1.querySelector(".temperature").textContent= `${temperature}`;
        weatherDataE1.querySelector(".description").textContent= description;

        weatherDataE1.querySelector(".details").innerHTML= details.map((detail) => `<div>${detail}</div>`).join(" ");
    }catch (error){
        weatherDataE1.querySelector(".icon").innerHTML="";
        weatherDataE1.querySelector(".temperature").textContent="";
        weatherDataE1.querySelector(".description").textContent="cannont load the content";

        weatherDataE1.querySelector(".details").innerHTML="";



    }
}
