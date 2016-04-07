var Dispatcher = require('../dispatcher/appDispatcher')
var ActionType = require('../constants/actionTypes')
var EventEmitter = require('events').EventEmitter
var Assign = require('object-assign')
var CHANGE_EVENT = 'change';
var _messages = [];
var _ = require('lodash');

var UserStore = Assign({}, EventEmitter.prototype, {
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

  getMessagesById: function(id) {

      return _.find(_messages, {fb_id: id})
    }

});



Dispatcher.register(function(action){

  switch(action.actionType){
    case ActionType.INITIALIZE:
      console.log('looking!');
      _messages = action.initialData.messages
      UserStore.emitChange()
      break;

  }

})


module.exports = UserStore;
