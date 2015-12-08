var React = require('react');

var Autocomplete = React.createClass({
  getInitialState: function () {
    return {searchString: ""};
  },

  render: function() {
    var currentString = this.state.searchString;
    console.log(this.state.searchString);
    var filteredNames = this.props.names.filter(function(name) {
      return name.match(currentString);
    });

    return(
      <div>
        <input
          type="text"
          onChange={this.addText}
          value={this.state.searchString}>
        </input>
        <ul>
          {filteredNames.map(function (name) {
            return (<li onClick={this.fillName}>{name}</li>);
          }.bind(this)
        )}
        </ul>
      </div>
    );
  },

  fillName: function (e) {
    var name = e.target.innerHTML;
    this.setState({searchString: name});
  },

  addText: function (e) {
    var value = e.target.value;
    this.setState({searchString: value});
  }

});


module.exports = Autocomplete;
