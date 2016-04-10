var Dispatcher = require('../dispatcher/appDispatcher')
var ActionType = require('../constants/actionTypes')
var EventEmitter = require('events').EventEmitter
var Assign = require('object-assign')
var CHANGE_EVENT = 'change';
var _messages = [];
var _ = require('lodash');

var MessageStore = Assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllMessages: function() {
    return _messages;
  },

  getConvo: function(receiver, sender) {
    emptyArray = []
      var receiverMessages =  _.find(_messages, {receiver_id: receiver})
      for (var i = 0; i < _messages.length; i++) {
        var iteration = _messages[i]
        if (iteration.receiver_id == receiver && iteration.sender_id == sender) {
          emptyArray.push(iteration)
        }
        else if (iteration.receiver_id == sender && iteration.sender_id == receiver) {
          emptyArray.push(iteration)
        }
      }

      return emptyArray
    }

});



Dispatcher.register(function(action){
  switch(action.actionType){
    case ActionType.INITIALIZE:
      _messages = action.initialData.messages
      MessageStore.emitChange()
      break;
    case ActionType.SUBMIT_COMMENT:
      _messages.push(action.message)
      MessageStore.emitChange()
      break;
    case ActionType.COMMENT_SEEN:
      // Find all comments with sender id and receiver id and then change seen to true
  }

})


module.exports = MessageStore;
