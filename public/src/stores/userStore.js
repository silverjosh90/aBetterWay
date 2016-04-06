var Dispatcher = require('../dispatcher/appDispatcher')
var ActionType = require('../constants/actionTypes')
var EventEmitter = require('events').EventEmitter
var Assign = require('object-assign')
var CHANGE_EVENT = 'change';
var _users = [];
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

  getAllUsers: function() {

    return _users;
  },

  getUserById: function(id) {

      return _.find(_users, {fb_id: id})
    }

});



Dispatcher.register(function(action){

  switch(action.actionType){
    case ActionType.INITIALIZE:

      _users = action.initialData.users
      UserStore.emitChange()

      break;
    case ActionType.CREATE_USER:
      if(action.user!= 'success') {
        _users.push(action.user)
      }
      UserStore.emitChange();
      break;
  //   case ActionType.UPDATE_AUTHOR:
  //     var existingAuthor = _.find(_authors, {id: action.author.id});
  //     var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
  //     _authors.splice(existingAuthorIndex, 1 , action.author)
  //     AuthorStore.emitChange();
  //     break;
  //   case ActionType.DELETE_AUTHOR:
  //     _.remove(_authors, function(author){
  //       return action.id === author.id
  //     });
  //     AuthorStore.emitChange();
  //     break;
  //   default:
  }

})


module.exports = UserStore;
