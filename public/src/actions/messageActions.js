var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes')

var MessageActions = {
  submitComment: function(comment) {
    var checkOrCreate =
$.ajax({  
  type: "POST",
  url: 'http://localhost:3000/messages/submit',
  data: comment,
  dataType: 'json',
  cache: false,
  error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr);
          console.log(thrownError)

  },
  success: function(data){
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBMIT_COMMENT,
      message: data
    })
  }
})
  },
  commentSeen: function(sendid, recid) {
    var id = {
      sender: sendid,
      receiver: recid
    }
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/messages/seen',
      data: id,
      dataType: 'json',
      cache: false,
      error: function (xhr, ajaxOptions, thrownError) {
              console.log(xhr);
              console.log(thrownError)

      },
      success: function(data){
        Dispatcher.dispatch({
          actionType: ActionTypes.COMMENT_SEEN,
          message: data
        })
      }
    })
  }

}

module.exports= MessageActions
