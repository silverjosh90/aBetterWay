var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes')

var UserActions = {
  createUser: function(user) {
    var checkOrCreate =
    $.ajax({
  url: 'http://localhost3000.com/user/create',
  dataType: 'json',
  cache: false,
  success: function(data){
    console.log(data)
  }
})
  }
}

module.exports = UserActions
