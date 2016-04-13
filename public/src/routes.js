var Router = require('react-router').Router
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory
var App = require('./components/app')
var PageNotFound = require('./components/common/pagenotfound')
var Login = require('./components/login')
var Profile = require('./components/profile/profilepage')   
var ProfileForm = require('./components/profile/profileForm')
var Chat = require('./components/conversation/alluserschat')
var IndividualChat = require('./components/conversation/individualchat')

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="profile/:userid" component={Profile} />
    <Route path="profile/edit/:userid" component={ProfileForm} />
    <Route path="conversation/:receiverid/:userid" component={IndividualChat} />
    <Route path="chat/all/:userid" component={Chat} />
    <Route path="*" component={PageNotFound} />
    <Route path="*/*" component={PageNotFound} />
  </Router>

);


module.exports = routes;
