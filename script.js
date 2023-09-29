//flaticon  fontspace  pexels
const apiKey = "1c841832de0ffab834b1e6e6dde55765";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`



const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");
const temp = document.querySelector(".temperature");



function checkweather(city) {

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {

        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            const date = new Date(data.dt * 1000);
            console.log(data);

            document.querySelector(".city").innerHTML = data.name ;
            document.querySelector(".description").innerHTML =  data.weather[0].main + " : " + data.weather[0].description;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp)-273 + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
            document.querySelector(".pressure").innerHTML = data.main.pressure ;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp)-273 + "°C";

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "img/clouds.png";
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



// function getWeatherForCurrentLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const key = "AIzaSyBEKtIc93bWJHCMpeig6rE9oIwTTZOQxrk";
//             const url = `https://www.googleapis.com/geolocation/v1/?geolocatekey=${key}`
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;
//             const currentLocationURL = `${url}&lat=${latitude}&lon=${longitude}`;
//             checkweather(currentLocationURL);
//         });
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }

// // Initially load weather data for the user's current location
// getWeatherForCurrentLocation();




//on clicking search icon checkweather will be called with the input city value
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

