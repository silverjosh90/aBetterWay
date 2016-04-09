var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes')

var UserActions = {
  createUser: function(user) {
    console.log('getting here to user actions');
    var checkOrCreate =
$.ajax({
  type: "POST",
  url: 'http://localhost:3000/users/create',
  data: user,
  dataType: 'json',
  cache: false,
  error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr);
          console.log(thrownError)

  },
  success: function(data){

    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_USER,
      user: data
    })
  }
})
  },
  findUserById: function(id) {
    $.ajax({
  type: "POST",
  url: 'http://localhost:3000/users/find',
  data:
  {userid: id },
  dataType: 'json',
  cache: false,
  error: function (request, error) {
    console.log(" Can't do because: " + error);
},
  success: function(rest){
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_USER,
      user: rest
    })
  }
})
}
}

module.exports = UserActions
