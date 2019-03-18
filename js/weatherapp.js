const accessMyLocation = () => getLanAndLon();
const denyaccessMyLocation = () => getSearchMethod();
const coll = document.querySelectorAll(".collapsible");
let i;

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

const appid = '305c52d0eaccce7e7a99318bd893addd';
const units = 'metric';
let searchMethod = "";
let searchMethod1 = "";
let searchTerm = "";
let searchTerm1 = "";

const getSearchMethod = () => {
  document.getElementById('promptButton').style.display = 'none';
  document.getElementById('show_content').style.display = 'flex';
  searchMethod = 'q';
  searchTerm = "Riga";
  searchWeather();
}

const getLanAndLon = () => {
  document.getElementById('lds-roller').style.display = "inline-block";
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

const showPosition = position => {
  document.getElementById('promptButton').style.display = 'none';
  document.getElementById('show_content').style.display = 'flex';
  searchTerm = position.coords.latitude;
  searchTerm1 = position.coords.longitude;
  searchMethod = 'lat';
  searchMethod1 = "&lon=";
  document.getElementById('lds-roller').style.display = "none";
  searchWeather();
}

const showError = error => {
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

const searchWeather = () => {
  var searchContainer = document.getElementById('show_content');
  searchContainer.style.visibility = 'visible';
  fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}${searchMethod1}${searchTerm1}&units=${units}&appid=${appid}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}

const init = result => {
  console.log(result);
  switch (result.list[0].weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("assets/clear.jpg")';
      break;
    case 'Clouds':
      document.body.style.backgroundImage = "url('assets/clouds.jpg')";
      break;
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = "url('assets/rain.jpg')";
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage = "url('assets/storm.jpg')";
      break;
    case 'Snow':
      document.body.style.backgroundImage = "url('assets/snow.jpg')";
      break;
    default:
      break;
  }
  putTemperatureUp(result);
}

// part of code that is used if you want to acces place with search method
// document.getElementById('searchBtn').addEventListener('click',() => {
//   let searchTerm = document.getElementById('searchInput').value;
//   if(searchTerm)
//     searchWeather(searchTerm);
// })

const putTemperatureUp = result => {
  let b = 0;
  let dayCycle;
  let firstDateValue = result.list[b].dt_txt;
  let firstDayConverted = new Date(firstDateValue.replace(/-/g,"/"));
  switch (firstDayConverted.getHours()) {
    case 21:
      dayCycle = 1;
      b = 1;
      break;
    case 18:
      dayCycle = 4;
      b = 0;
      break;
    case 15:
      dayCycle = 4;
      b = 1
      break;
    case 12:
      dayCycle = 3;
      b = 0;
      break;
    case 9:
      dayCycle = 3;
      b = 1;
      break;
    case 6:
      dayCycle = 2;
      b = 0;
      break;
    case 3:
      dayCycle = 2;
      b = 1;
      break;
    case 0:
      dayCycle = 1;
      b = 0;
      break;
  }
  getWeekDay(result, b);
  getHourTemperature(result, dayCycle, b);
  getDaysTemperature(result, dayCycle, b);
  getDaysAverageHumidity(result, dayCycle, b)
}

const getDaysTemperature = (result, dayCycle, b) => {
  var weather_div = document.querySelectorAll(".weather_info");
  var day_hour = dayCycle % 2 ? b + 2 : b;
  var skip_1st;

  if (dayCycle == 3) {
    skip_1st = true;
  } else if (dayCycle == 4) {
    skip_1st = true;
  } else {
    skip_1st = false;
  }

  for (i = 0; i < weather_div.length; i++) {
    if (result.list[day_hour] === undefined || result.list[day_hour] === null) {
      weather_div[i].innerHTML = "Unknown &#x2103;";
      day_hour += 4;
    } else if (skip_1st == true) {
      weather_div[i].innerHTML = "Unknown &#x2103;";
      day_hour += 4;
      skip_1st = false;
    } else {
      weather_div[i].innerHTML = Math.round(result.list[day_hour].main.temp) + "	&#x2103;";
      day_hour += 4;
    }
  };
}

const getDaysAverageHumidity = (result, dayCycle, b) => {
  var averageHumidity = document.querySelectorAll(".average_humidity");
  var day_hour = dayCycle % 2 ? b + 2 : b;
  var skip_1st;

  if (dayCycle == 3) {
    skip_1st = true;
  } else if (dayCycle == 4) {
    skip_1st = true;
  } else {
    skip_1st = false;
  }

  for (i = 0; i < averageHumidity.length; i++) {
    if (result.list[day_hour] === undefined || result.list[day_hour] === null) {
      averageHumidity[i].innerHTML = "Unknown &#x2103;";
      day_hour += 8;
    } else if (skip_1st == true) {
      averageHumidity[i].innerHTML = 'Avg.Humidity ' + (result.list[day_hour+4].main.humidity) + ' %';
      day_hour += 8;
      skip_1st == false;
    } else {
      averageHumidity[i].innerHTML = 'Avg.Humidity ' + ((result.list[day_hour].main.humidity+result.list[day_hour+4].main.humidity)/2) + ' %';
      day_hour += 8;
    }
  };
}

const getWeekDay = (result, b) => {
  var dayNames = document.querySelectorAll(".day_container");
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

const getHourTemperature = (result, dayCycle, b) => {
  var temperature = document.querySelectorAll(".temperature_container");
  var time = document.querySelectorAll(".time_container");
  var i_index;

  if (dayCycle == 2) {
    i_index = 1;
  } else if (dayCycle == 3) {
    i_index = 2;
  } else if (dayCycle == 4) {
    i_index = 3;
  } else {
    i_index = 0;
  }

  for (i = i_index; i < temperature.length; i++) {
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
