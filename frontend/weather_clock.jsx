var React = require('react');

var WeatherClock = React.createClass({

  getInitialState: function () {
    return {clockTime: new Date(), longitude: null, latitude: null, weather: "", temperature: ""};
  },

  componentDidMount: function () {
    this.intervalID = setInterval( function () {
      this.setState({clockTime: new Date()});
    }.bind(this), 1000);

    navigator.geolocation.getCurrentPosition(function (response) {
      this.setState({
        longitude: response.coords.longitude,
        latitude: response.coords.latitude
      });
      this.getWeather();
    }.bind(this));
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalID);
  },


  getWeather: function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE ) {
        if (request.status === 200) {
          var weatherObj = JSON.parse(request.responseText);
          var currentWeather = weatherObj.weather[0].description;
          var temp = weatherObj.main.temp.toString();
          this.setState({weather: currentWeather, temperature: temp});
        }
      }
    }.bind(this);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.latitude + "&lon=" + this.state.longitude;
    var appID = "645c5d39c7603f17e23fcaffcea1a3c1";
    url = url + "&appid=" + appID;
    request.open("GET", url, true);
    request.send();
  },

  render: function () {
    return(
      <div>
        <p>{this.state.clockTime.toString()}</p>
        <p>Longitude : {this.state.longitude}</p>
        <p>Latitude : {this.state.latitude}</p>
        <p>Weather : {this.state.weather}</p>
        <p>Kelvin Temperature : {this.state.temperature}</p>
      </div>
    );
  }
});

module.exports = WeatherClock;
