var React = require('react'),
    ReactDOM = require('react-dom'),
    AutoComplete = require('./autocomplete'),
    WeatherClock = require('./weather_clock');



var Widgets = React.createClass ({

  render: function () {
    return (
      <div>
        <AutoComplete names={["Bob", "Billy", "Harry", "Sally", "Sue"]}/>
      
        <WeatherClock/>
      </div>
    );
  }

});

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Widgets/>, document.getElementById('root'));
});
