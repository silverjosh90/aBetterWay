var Dispatcher = require('../dispatcher/appDispatcher')
var ActionType = require('../constants/actionTypes')
var EventEmitter = require('events').EventEmitter
var Assign = require('object-assign')
var CHANGE_EVENT = 'change';
var _profileinfo = [];
var _ = require('lodash');

var ProfileinfoStore = Assign({}, EventEmitter.prototype, {
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
    return _profileinfo;
  },

  getProfileInfo: function(id) {
    return _.find(_profileinfo, {fb_id: id})
    }

});



Dispatcher.register(function(action){
  switch(action.actionType){
    case ActionType.INITIALIZE:
      _profileinfo = action.initialData.profileinfo
      ProfileinfoStore.emitChange()
      break;
    case ActionType.CREATE_PROFILE:
      _profileinfo.push(action.profinfo)
      console.log(_profileinfo)
      ProfileinfoStore.emitChange()
      break;

  }

})


module.exports = ProfileinfoStore;
