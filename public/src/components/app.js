
var $ = require('jquery')
var jQuery = require('jquery');
var React = require('react')
var Link = require('react-router').Link

var App = React.createClass({
  render: function() {
    return (
      <div className="derp">
        <div className="splashImg">
          <div className="blurBackground">
            <h2 className="pageTitle">The Road Ahead</h2>
            <Link to="login"><button className="btn btn-primary"> Learn More </button></Link>
          </div>
        </div>
       </div>
    )
  }
})


module.exports = App
