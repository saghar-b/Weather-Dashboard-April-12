let APIKey = "9d97653262c53faf62f6ba6d1a44813d";
let city = "seattle";
let currentTime = moment().format("MM/DD/yyy");
let requestUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
let requestUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
let currentEl = $("#currentWeather")
function getApiWeather(requestUrlWeather) {
    fetch(requestUrlWeather)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                console.log(response.status)
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentInformation(data);
        });
}
function getApiForcast(requestUrlForcast) {
    fetch(requestUrlForcast)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                console.log(response.status)
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            // currentInformation(data);
        });
}


getApiWeather(requestUrlWeather);
// getApiWeather(requestUrlForcast);
getApiForcast(requestUrlForcast);
function currentInformation(myData) {
    $("#cityname").text(city + "(" + currentTime + ")" + myData.weather[0].description)
    $("#temp").text("Temp : " + myData.main.temp + "F")
    $("#wind").text("Wind : " + myData.wind.speed + " MPH")
    $("#humidity").text("Humidity : " + myData.main.humidity + " MPH")
}