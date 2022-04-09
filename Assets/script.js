let APIKey = "9d97653262c53faf62f6ba6d1a44813d";
let city = "seattle";
let currentTime = moment().format("MM/DD/yyy");
let requestUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&exclude=daily&appid=" + APIKey;
let requestUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
let currentEl = $("#currentWeather")
let nextDaySection = $(".futureWeather");
let submitBtn = $(".btn");
let cityBtns = $(".citybtns")
let mapIcon= new Map();


getApiWeather(requestUrlWeather);
getApiForcast(requestUrlForcast);
setIcon();
// get the weather information for current day
function getApiWeather(requestUrlWeather) {
    fetch(requestUrlWeather)
        .then(function (response) {
            if (response.ok) {
            }
            else {
                alert("Please enter a vali city name");
                city = ""
                return;
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            if (city != "") {
                currentInformation(data);
            }
        });
}

// // get the weather information for future days
function getApiForcast(requestUrlForcast) {
    fetch(requestUrlForcast)
        .then(function (response) {
            if (response.ok) {
            }
            else {
                city = ""
                return;
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            if (city != "") {
                let index = -5;
                for (let i = 0; i < 5; i++) {
                    index = index + 8;
                    nextDayInformation(data.list[index]);
                }
            }
        });
}


// fill the current day information
function currentInformation(myData) {
      let iconEl=mapIcon.get(myData.weather[0].icon);
    $("#cityname").text(city + "(" + currentTime + ")" + myData.weather[0].description + "")
    $("#icon").attr("src", iconEl)
    let calvinToFaren = Math.floor((myData.main.temp) * (9 / 5) - 459.67);
    $("#temp").text("Temp : " + calvinToFaren + " F")
    $("#wind").text("Wind : " + myData.wind.speed + " MPH")
    $("#humidity").text("Humidity : " + myData.main.humidity + " %")
}

// / fill the next 5 days information
function nextDayInformation(nextData) {
    let futureDayDiv = $("<div>");
    futureDayDiv.addClass("days text-white m-2 pr-5 pl-2")
      
    let nextDayiconEl= $("<img>")
    let nextDateEL = $("<h5>");
    let nextSkyEL = $("<h6>");
    let nextTempEL = $("<h6>");
    let nextWindEL = $("<h6>");
    let nextHumidEL = $("<h6>");
    nextDateEL.text(moment().add(1, 'days').format('L'))

    console.log (nextData.weather[0].icon +"  " +nextData.weather[0].description)
   let ndIcon=mapIcon.get(nextData.weather[0].icon);
    nextDayiconEl.attr("src",ndIcon )

    nextSkyEL.text(nextData.weather[0].main)

    let fTemp = Math.floor((nextData.main.temp) * (9 / 5) - 459.67)
    nextTempEL.text("Tempreture: " + fTemp + " F")
    nextWindEL.text("Wind : " + nextData.wind.speed + " MPH")
    nextHumidEL.text("Humidity : " + nextData.main.humidity + " %")
    futureDayDiv.append(nextDateEL);
    futureDayDiv.append(nextDayiconEl);
    futureDayDiv.append(nextSkyEL);
    futureDayDiv.append(nextTempEL);
    futureDayDiv.append(nextWindEL);
    futureDayDiv.append(nextHumidEL);
    nextDaySection.append(futureDayDiv)

}

// search city button
submitBtn.on("click", function (event) {
    event.preventDefault();

    makeQuery($("#cityName").val())
    if (city != "") {

        addCitybutton(city);
    }
    else {
        return
    }
    $("#cityName").val("")

});

// creat city buttons
function addCitybutton(id) {
    let cityBtnEl = $("<button>")
    cityBtnEl.addClass("h-40  rounded-lg p-1 ml-3 mb-3")
    cityBtnEl.attr("id", "citybutton");
    cityBtnEl.attr("data-cityname", id);
    cityBtnEl.text(id)
    cityBtns.append(cityBtnEl)

}

// target on citty buttons click
cityBtns.on("click", "#citybutton", function (event) {
    event.preventDefault();
    console.log($(event.target).attr("data-cityname"))
    makeQuery($(event.target).attr("data-cityname"));

})

// creat the querry by the city name
function makeQuery(cityName) {
    city = cityName;
    nextDaySection.empty();
    requestUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&exclude=daily&appid=" + APIKey;
    requestUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    getApiWeather(requestUrlWeather);
    getApiForcast(requestUrlForcast);
}

// set the weather icons
function setIcon() {
mapIcon.set("04d","./icons/cloudy.webp")
mapIcon.set("03d","./icons/cloudy.webp")
mapIcon.set("03n","./icons/cloudy.webp")
mapIcon.set("04n","./icons/cloudy.webp")
mapIcon.set("11n","./icons/storm.webp")
mapIcon.set("10n","./icons/rainy.webp")
mapIcon.set("10d","./icons/rainy.webp")
mapIcon.set("01d","./icons/sunny.webp")
mapIcon.set("01n","./icons/sunny.webp")
mapIcon.set("13n","./icons/snow.webp")

    
}
