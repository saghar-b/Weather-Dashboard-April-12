let APIKey = "9d97653262c53faf62f6ba6d1a44813d";
let city = "seattle";
let currentTime = moment().format("MM/DD/yyy");
let requestUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
let requestUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
let currentEl = $("#currentWeather")
let nextDaySection = $(".futureWeather");
let submitBtn=$(".btn");

// get the weather information for current day
function getApiWeather(requestUrlWeather) {
    fetch(requestUrlWeather)
        .then(function (response) {
            // console.log(response);
            if (response.ok) {
                console.log(response.status)
            }
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            currentInformation(data);
        });
}

// // get the weather information for future days
function getApiForcast(requestUrlForcast) {
    fetch(requestUrlForcast)
        .then(function (response) {
            // console.log(response);
            if (response.ok) {
                // console.log(response.status)
            }
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            let index = -5;
            for (let i = 0; i < 5; i++) {
                index = index + 8;
                nextDayInformation(data.list[index]);
            }
        });
}

getApiWeather(requestUrlWeather);
getApiForcast(requestUrlForcast);

// fill the current day information
function currentInformation(myData) {
    $("#cityname").text(city + "(" + currentTime + ")" + myData.weather[0].description)
    $("#temp").text("Temp : " + myData.main.temp + "F")
    $("#wind").text("Wind : " + myData.wind.speed + " MPH")
    $("#humidity").text("Humidity : " + myData.main.humidity + " %")
}

// / fill the next 5 days information
function nextDayInformation(nextData) {
    let futureDayDiv = $("<div>");
    futureDayDiv.addClass("days text-white m-2 pr-5 pl-2")
    let nextDateEL = $("<h5>");
    let nextSkyEL = $("<h6>");
    let nextTempEL = $("<h6>");
    let nextWindEL = $("<h6>");
    let nextHumidEL = $("<h6>");
    nextDateEL.text(moment().add(1,'days').format('L'))
    nextSkyEL.text(nextData.weather[0].main)
    nextTempEL.text("Tempreture: " + nextData.main.temp)
    nextWindEL.text("Wind : " + nextData.wind.speed + " MPH")
    nextHumidEL.text("Humidity : " + nextData.main.humidity + " %")
    futureDayDiv.append(nextDateEL);
    futureDayDiv.append(nextSkyEL);
    futureDayDiv.append(nextTempEL);
    futureDayDiv.append(nextWindEL);
    futureDayDiv.append(nextHumidEL);
    nextDaySection.append(futureDayDiv)

}

submitBtn.on("click",function(event){
    event.preventDefault();
   city= $("#cityName").val();
   nextDaySection.empty();
    requestUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
     requestUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
     getApiWeather(requestUrlWeather);
     getApiForcast(requestUrlForcast);

console.log("submit"+$("#cityName").val())
});