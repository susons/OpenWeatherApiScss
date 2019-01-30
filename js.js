function accessMyLocation() {
  getLanAndLon();
}

function denyaccessMyLocation() {
  getSearchMethod();
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.height){
      content.style.height = null;
    } else {
      content.style.height = "100px";
    }
  });
}

let appid = '305c52d0eaccce7e7a99318bd893addd';
let units = 'metric';
let searchMethod = "";
let searchMethod1 = "";
let searchTerm = "";
let searchTerm1 = "";

function getSearchMethod(){
  document.getElementById('promptButton').style.display = 'none';
  document.getElementById('show_content').style.display = 'flex';
  searchMethod = 'q';
  searchTerm = "Riga";
  searchWeather();
}

function getLanAndLon(){
  document.getElementById('lds-roller').style.display = "inline-block";
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
  document.getElementById('promptButton').style.display = 'none';
  document.getElementById('show_content').style.display = 'flex';
  searchTerm = position.coords.latitude;
  searchTerm1 = position.coords.longitude;
  searchMethod = 'lat';
  searchMethod1 = "&lon=";
  document.getElementById('lds-roller').style.display = "none";
  searchWeather();
}

function showError(error) {
  var x = document.getElementById('errorCode');
  document.getElementById('lds-roller').style.display = "none";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

function searchWeather() {
  var searchContainer = document.getElementById('show_content');
  searchContainer.style.visibility = 'visible';
  fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}${searchMethod1}${searchTerm1}&units=${units}&appid=${appid}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}

function init(result) {
  // console.log(result);
  // switch (result.list[0].weather[0].main) {
  //   case 'Clear':
  //     document.body.style.backgroundImage = 'url("clear.jpg")';
  //     document.body.style.backgroundSize = 'cover';
  //     document.body.style.backgroundRepeat = 'no-repeat';
  //     document.body.style.backgroundPosition = 'center center';
  //     break;

  //   case 'Clouds':
  //     document.body.style.backgroundImage = "url('clouds.jpg')";
  //     document.body.style.backgroundSize = 'cover';
  //     document.body.style.backgroundRepeat = 'no-repeat';
  //     document.body.style.backgroundPosition = 'center center';
  //     break;

  //   case 'Rain':
  //   case 'Drizzle':
  //   case 'Mist':
  //     document.body.style.backgroundImage = "url('rain.jpg')";
  //     document.body.style.backgroundSize = 'cover';
  //     document.body.style.backgroundRepeat = 'no-repeat';
  //     document.body.style.backgroundPosition = 'center center';
  //     break;

  //   case 'Thunderstorm':
  //     document.body.style.backgroundImage = "url('storm.jpg')";
  //     document.body.style.backgroundSize = 'cover';
  //     document.body.style.backgroundRepeat = 'no-repeat';
  //     document.body.style.backgroundPosition = 'center center';
  //     break;

  //   case 'Snow':
  //     document.body.style.backgroundImage = "url('snow.jpg')";
  //     document.body.style.backgroundSize = 'cover';
  //     document.body.style.backgroundRepeat = 'no-repeat';
  //     document.body.style.backgroundPosition = 'center center';
  //     break;

  //   default:
  //     break;
  // }
  putTemperatureUp(result);
}

// document.getElementById('searchBtn').addEventListener('click',() => {
//   let searchTerm = document.getElementById('searchInput').value;
//   if(searchTerm)
//     searchWeather(searchTerm);
// })

function putTemperatureUp(result) {
  var b = 0;
  var dayCycle;
  var firstDateValue = result.list[b].dt_txt;
  var firstDayConverted = new Date(firstDateValue.replace(/-/g,"/"));
  switch (firstDayConverted.getHours()) {
    case 21:
      dayCycle = 0;
      b = 1;
      break;
    case 18:
      dayCycle = 3;
      b = 0;
      break;
    case 15:
      dayCycle = 3;
      b = 1
      break;
    case 12:
      dayCycle = 2;
      b = 0;
      break;
    case 9:
      dayCycle = 2;
      b = 1;
      break;
    case 6:
      dayCycle = 1;
      b = 0;
      break;
    case 3:
      dayCycle = 1;
      b = 1;
      break;
    case 0:
      dayCycle = 0;
      b = 0;
      break;
  }
  getWeekDay(result, b);
  getHourTemperature(result, dayCycle, b);
  getDaysTemperature(result, dayCycle, b);
}

function getDaysTemperature(result, dayCycle, b) {
  var weather_div = document.getElementsByClassName("weather_container");
  var day_hour = b;
  if (dayCycle == 0) {
    for (i = 0; i < weather_div.length; i++) {
      if (i == 0) {
        weather_div[i].children[0].innerHTML = Math.round(result.list[day_hour = day_hour+2].main.temp) + "	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+4].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        day_hour = day_hour + 4;
      } else {
        weather_div[i].children[0].innerHTML = Math.round(result.list[day_hour].main.temp) + "	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+4].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        day_hour = day_hour + 4;
      }
    };
  } else if (dayCycle == 1) {
    for (i = 0; i < weather_div.length; i++) {
      if (i == 0) {
        weather_div[i].children[0].innerHTML = Math.round(result.list[day_hour].main.temp) + "	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+4].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        day_hour = day_hour + 4;
      } else {
        weather_div[i].children[0].innerHTML = Math.round(result.list[day_hour].main.temp) + "	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+4].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        day_hour = day_hour + 4;
      }
    };
  } else if (dayCycle == 2) {
    for (i = 0; i < weather_div.length; i++) {
      if (i == 0) {
        weather_div[i].children[0].innerHTML =  "Unknown	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+2].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + (result.list[day_hour].main.humidity) + ' %';
        day_hour = day_hour + 4;
      } else {
        weather_div[i].children[0].innerHTML = Math.round(result.list[day_hour].main.temp) + "	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+4].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        day_hour = day_hour + 4;
      }
    };
  } else {
    for (i = 0; i < weather_div.length; i++) {
      if (i == 0) {
        weather_div[i].children[0].innerHTML =  "Unknown	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour].main.temp) + " &#x2103;" + "</span>";
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        day_hour = day_hour + 4;
      } else {
        weather_div[i].children[1].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour-4].main.humidity+result.list[day_hour].main.humidity)/2) + ' %';
        weather_div[i].children[0].innerHTML = Math.round(result.list[day_hour].main.temp) + "	&#x2103; / " + "<span style='color:#c7cef5;font-weight:500;'>" + Math.round(result.list[day_hour = day_hour+4].main.temp) + " &#x2103;" + "</span>";
        day_hour = day_hour + 4;
      }
    };
  }
}

function getWeekDay(result, b) {
  var dayNames = document.getElementsByClassName("day_container");
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  for (i = 0; i < dayNames.length; i++) {
    var date_value = result.list[b].dt_txt;
    var dateConverter = new Date(date_value.replace(/-/g,"/"));
    var workDayNumber = dateConverter.getDay();
    var workDay = days[workDayNumber]
    var content1 = dayNames[i].children[0];
    content1.innerHTML = workDay;
    b=b+8;
  };
}

function  getHourTemperature(result, dayCycle, b){
  var temperature = document.getElementsByClassName("temperature_container");
  var time = document.getElementsByClassName("time_container");
  if (dayCycle == 0) {
    for (i = 0; i < temperature.length; i++) {
      if (result.list[b] === undefined || result.list[b] === null) {
        temperature[i].innerHTML = "Unknown &#x2103;";
        b=b+2;
      } else {
        var temperatureAmount = Math.round(result.list[b].main.temp);
        temperature[i].innerHTML = temperatureAmount + "&#x2103;";
        time[i].innerHTML = result.list[b].dt_txt.substr(11, 5);
        b=b+2;
      }
    };
  } else if (dayCycle == 1) {
    for (i = 0; i < temperature.length; i++) {
      if (result.list[b] === undefined || result.list[b] === null) {
        temperature[i].innerHTML = "Unknown &#x2103;";
        b=b+2;
      } else {
        var temperatureAmount = Math.round(result.list[b].main.temp);
        temperature[i].innerHTML = temperatureAmount + "&#x2103;";
        time[i].innerHTML = result.list[b].dt_txt.substr(11, 5);
        b=b+2;
      }
    };
  } else if (dayCycle == 2) {
    for (i = 1; i < temperature.length; i++) {
      if (result.list[b] === undefined || result.list[b] === null) {
        temperature[i].innerHTML = "Unknown &#x2103;";
        b=b+2;
      } else {
        var temperatureAmount = Math.round(result.list[b].main.temp);
        temperature[i].innerHTML = temperatureAmount + "&#x2103;";
        time[i].innerHTML = result.list[b].dt_txt.substr(11, 5);
        b=b+2;
      }
    };
  } else {
    for (i = 2; i < temperature.length; i++) {
      if (result.list[b] === undefined || result.list[b] === null) {
        temperature[i].innerHTML = "Unknown &#x2103;";
        b=b+2;
      } else {
        var temperatureAmount = Math.round(result.list[b].main.temp);
        temperature[i].innerHTML = temperatureAmount + "&#x2103;";
        time[i].innerHTML = result.list[b].dt_txt.substr(11, 5);
        b=b+2;
      }
    };
  }
}
