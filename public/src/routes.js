var Router = require('react-router').Router
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory
var App = require('./components/app')
var PageNotFound = require('./components/common/pagenotfound')
var Login = require('./components/login')


var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="login" component={Login} />
    <Route path="*" component={PageNotFound} />
  </Router>
);


module.exports = routes;
