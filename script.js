//flaticon  fontspace  pexels
const apiKey = "1c841832de0ffab834b1e6e6dde55765";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&cnt=3&q=`;


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");
const temp = document.querySelector(".temperature");
const forecastIcon = document.querySelector(".forecastIcon");


function checkweather(city) {

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {

        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            const date = new Date();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name + " | " + date;
            document.querySelector(".description").innerHTML = data.weather[0].main + " : " + data.weather[0].description;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) - 273 + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "miles/hr";
            document.querySelector(".pressure").innerHTML = data.main.pressure;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) - 273 + "°C";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "img/clouds.png";
            }
            if (data.weather[0].main == "Mist") {
                weatherIcon.src = "img/mist.png";
            }
            if (data.weather[0].main == "Rain") {
                weatherIcon.src = "img/rainStorm.png";
            }
            if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "img/rainEmoji.jpg";
            }
            if (data.weather[0].main == "Clear") {
                weatherIcon.src = "img/sun.png";
            }
            if (data.weather[0].main == "Thunderstorm") {
                weatherIcon.src = "img/cute.png";
            }
            if (data.weather[0].main == "Haze") {
                weatherIcon.src = "img/error-removebg-preview.png";
            }
        }

        else {
            console.error("unable to fetch data....");

            document.querySelector(".cityNotFound").style.display = "block";
            document.querySelector(".components").style.display = "none";
        }
    };
    xhr.onerror = function () {
        console.error("An error occurred.");
    };

    xhr.open("GET", apiURL + city);

    xhr.send();

}







//on clicking search icon checkweather will be called with the input city value
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
    foreCastweather(searchBox.value);
});





function foreCastweather(city) {

    const xhr = new XMLHttpRequest();

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    xhr.onload = function () {

        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            const date = new Date(data.dt * 1000);
            console.log(data);


            document.querySelector(".fcDate ").innerHTML =formatDate(data.list[0].dt);
            document.querySelector(".fcTemp ").innerHTML ="Temp : " + Math.round(data.list[0].main.temp) - 273 + "°C";
            document.querySelector(".fcWeather ").innerHTML ="Weather : " + data.list[0].weather[0].description ;
            document.querySelector(".fcHumidity ").innerHTML = "Humidity : " + data.list[0].main.humidity + "%"; 


            if (data.list[0].weather[0].main == "Clouds") {
                forecastIcon.src = "img/clouds.png";
            }
            else if (data.list[0].weather[0].main == "Mist") {
                forecastIcon.src = "img/mist.png";
            }
            else if (data.list[0].weather[0].main == "Rain") {
                forecastIcon.src = "img/rainStorm.png";
            }
            else if (data.list[0].weather[0].main == "Drizzle") {
                forecastIcon.src = "img/rainEmoji.jpg";
            }
            else if (data.list[0].weather[0].main == "Clear") {
                forecastIcon.src = "img/sun.png";
            }
            else if (data.list[0].weather[0].main == "Thunderstorm") {
                forecastIcon.src = "img/cute.png";
            }
            else if (data.list[0].weather[0].main == "Haze") {
                forecastIcon.src = "img/error-removebg-preview.png";
            }
        }

        else {
            console.error("unable to fetch data....");
            document.querySelector(".info").style.display = "none";

        }
    };
    xhr.onerror = function () {
        console.error("An error occurred.");
    };

    xhr.open("GET", forecastURL + city);

    xhr.send();

}