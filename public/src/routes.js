var Router = require('react-router').Router
var Redirect = require('react-router').Redirect;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory
var App = require('./components/app')


var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);


module.exports = routes;
