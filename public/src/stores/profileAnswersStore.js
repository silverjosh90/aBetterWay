var Dispatcher = require('../dispatcher/appDispatcher')
var ActionType = require('../constants/actionTypes')
var EventEmitter = require('events').EventEmitter
var Assign = require('object-assign')
var CHANGE_EVENT = 'change';
var _profileanswers = [];
var _ = require('lodash');

var ProfileAnswersStore = Assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllProfileAnswers: function() {
    return _profileanswers;
  },

  getQuestion: function(asker, answerer) {
    emptyArray = []
      for (var i = 0; i < _profileanswers.length; i++) {
        var iteration = _profileanswers[i]
        if(iteration.asker_id == asker && iteration.answerer_id == answerer) {
          emptyArray.push(iteration)
        }
      }

      return emptyArray
    }

});



Dispatcher.register(function(action){
  switch(action.actionType){
    case ActionType.INITIALIZE:
      _profileanswers = action.initialData.profileanswer
      ProfileAnswersStore.emitChange()
      break;
    case ActionType.ADD_PROFILE_QUESTION_ANSWER:
      _profileanswers.push(action.question)
      ProfileAnswersStore.emitChange()
      break;
  }

})


module.exports = ProfileAnswersStore;
