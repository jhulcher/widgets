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
      }, this.getWeather);
    }.bind(this));
  },

  componentWillUnmount: function () {
    clearInterval(this.intervalID);
  },

  render: function () {
    return(
      <div>
        <p>{this.state.clockTime.toString()}</p>
        <p>Longitude : {this.state.longitude}</p>
        <p>Latitude : {this.state.latitude}</p>
        <p>Weather : {this.state.weather}</p>
      </div>
    );
  },

  getWeather: function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE ) {
        if (request.status === 200) {
          var jobj = JSON.parse(request.responseText);
          var currentWeather = jobj.weather;
          var temp = JSON.parse(request.responseText).main.temp;
          this.setState({weather: currentWeather, temperature: temp});
          debugger
        }
      }
    }.bind(this);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.latitude + "&lon=" + this.state.longitude;
    var appID = "645c5d39c7603f17e23fcaffcea1a3c1";
    url = url + "&appid=" + appID;
    request.open("GET", url, true);
    request.send();
  }
});

module.exports = WeatherClock;
