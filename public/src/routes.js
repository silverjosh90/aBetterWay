var Router = require('react-router').Router
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory
var App = require('./components/app')
var PageNotFound = require('./components/common/pagenotfound')
var Login = require('./components/login')
var Profile = require('./components/profile/profilepage')


var responseFacebook = function(response) {
  console.log(response)
  console.log(response.picture);
  // LoginActions.checkUser(response)
}

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="profile/:userid" component={Profile} />
    <Route path="*" component={PageNotFound} />
    <Route path="*/*" component={PageNotFound} />
  </Router>
);


module.exports = routes;
