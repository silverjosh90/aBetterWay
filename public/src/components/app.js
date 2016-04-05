
var $ = require('jquery')
var jQuery = require('jquery');
var React = require('react')
var Link = require('react-router').Link

var App = React.createClass({
  responseFacebook: function(response) {
    console.log(response)
    console.log(response.picture);
  },
  render: function() {
    return (
      <div className="derp">
        <div className="splashImg">
          <div className="blurBackground">
            <h2 className="pageTitle">The New Kid In Town</h2>
            <Link to="login"><button className="btn btn-primary"> Learn More </button></Link>
          </div>
        </div>
       </div>
    )
  }
})


module.exports = App
