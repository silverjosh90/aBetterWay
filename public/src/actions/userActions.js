var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes')

var UserActions = {
  createUser: function(user) {
    var checkOrCreate =
    $.ajax({
  type: "POST",
  url: 'https://friendedfinder.herokuapp.com/users/create',
  data: user,
  dataType: 'json',
  cache: false,
  error: function (request, error) {
    console.log(" Can't do because: " + error);
},
  success: function(data){
    console.log(data)
  }
})
  }
}

module.exports = UserActions
