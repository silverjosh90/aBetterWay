var Router = require('react-router').Router
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory
var App = require('./components/app')
var PageNotFound = require('./components/common/pagenotfound')
var Login = require('./components/login')


var responseFacebook = function(response) {
  console.log(response)
  console.log(response.picture);
}

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="login" component={Login}
    appId="249945812017045"
    autoLoad={true}
    callback={responseFacebook}
    icon="fa-facebook" />
    <Route path="*" component={PageNotFound} />
  </Router>
);


module.exports = routes;
