var Dispatcher = require('../dispatcher/appDispatcher')
var ActionTypes = require('../constants/actionTypes')

InitializeActions = {
  initApp: function() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/users/',
      dataType: 'json',
      cache: false,
      error: function (xhr, ajaxOptions, thrownError) {
              console.log(xhr);
              console.log(thrownError)

      },
      success: function(data) {
        $.ajax({
          type: "GET",
          url: 'http://localhost:3000/messages',
          dataType: 'json',
          cache: false,
          error: function (xhr, ajaxOptions, thrownError) {
                  console.log(xhr);
                  console.log(thrownError)
          },
          success: function(info) {
            $.ajax({
              type: "GET",
              url: 'http://localhost:3000/profileinfo',
              dataType: 'json',
              cache: false,
              error: function (xhr, ajaxOptions, thrownError) {
                      console.log(xhr);
                      console.log(thrownError)
              },
              success: function(profinfo) {
                $.ajax({
                  type: "GET",
                  url: 'http://localhost:3000/profileanswers',
                  dataType: 'json',
                  cache: false,
                  error: function (xhr, ajaxOptions, thrownError) {
                          console.log(xhr);
                          console.log(thrownError)

                  },
                  success: function(profanswer) {
                    console.log(profanswer);
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
            users: data,
            profileinfo: profinfo,
            messages: info,
            profileanswer: profanswer
          }
        })
      }
      })
      }
      })
      }
      })
      }
    })
  }
}

module.exports = InitializeActions
