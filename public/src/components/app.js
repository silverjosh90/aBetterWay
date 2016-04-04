
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
            <h2 className="pageTitle">The Road Ahead</h2>
            <Link to="login"   appId="249945812017045"
              autoLoad={true}
              callback={this.responseFacebook}
              icon="fa-facebook"><button className="btn btn-primary"> Learn More </button></Link>
          </div>
        </div>
       </div>
    )
  }
})


module.exports = App
