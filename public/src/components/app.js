"use strict";

var $ = require('jquery')
var jQuery = require('jquery');
var React = require('react')

var App = React.createClass({
  render: function() {
    return (
      <div>
       <h2>{this.props.name}</h2>
       </div>
    )
  }
})


module.exports = App
