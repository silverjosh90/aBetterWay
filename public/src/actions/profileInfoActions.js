var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes')

var ProfileInfoActions = {
  saveInfo: function(info) {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/profileinfo/submit',
      data: info,
      dataType: 'json',
      cache: false,
      error: function (xhr, ajaxOptions, thrownError) {
              console.log(xhr);
              console.log(thrownError)

      },
      success: function(data){
        Dispatcher.dispatch({
          actionType: ActionTypes.SAVE_PROFILEINFO,
          profileinfo: data

        })
      }

    })
  },
  createProfile: function(response) {
    var id= {fb_id: response}
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/profileinfo/create',
      data: id,
      dataType: 'json',
      cache: false,
      error: function (xhr, ajaxOptions, thrownError) {
              console.log(xhr);
              console.log(thrownError)

      },
      success: function(data){
        console.log(data);
        Dispatcher.dispatch({
          actionType: ActionTypes.CREATE_PROFILE,
          profinfo: data

        })
      }

    })
  }

}

module.exports= ProfileInfoActions
