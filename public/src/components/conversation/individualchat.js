
var MessageStore= require('../../stores/messageStore')
var ProfileinfoStore= require('../../stores/profileInfoStore')
var UserStore= require('../../stores/userStore')
var MessageAction = require('../../actions/messageActions')
var CommentForm = require('./commentform')
var CommentDisplay = require('./commentDisplay')
var pollInterval = 100;
var InitiateChat = require('./initiateChat')
var hashHistory = require('react-router').hashHistory
var ProfileAnswersActions = require('../../actions/profileAnswersActions')

var IndividualChat= React.createClass({
  getInitialState: function() {

    return {
      messages: this.sortComments(MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)),
      user: UserStore.getUserById(this.props.params.userid),
      friend: UserStore.getUserById(this.props.params.receiverid),
      profileInfo: ProfileinfoStore.getProfileInfo(this.props.params.receiverid),
      questions: {
        question1: '',
        question2: '',
        question3: '',
        question4: ''
      }
  }
},
formSubmitted: function(event) {

  event.preventDefault()
  if (!this.state.questions.question1|| !this.state.questions.question2) {
    return toastr.warning('text fields cannot be blank')
  }
  var answer = {
    questions: this.state.questions,
    user_answering_id: this.props.params.userid,
    question_owner_id: this.props.params.receiverid
  }
  ProfileAnswersActions.addAnswers(answer)

  hashHistory.push(`/conversation/${this.props.params.receiverid}/${this.props.params.userid}`)

},
setQuestionChange: function(event) {
  var field = event.target.name;
  var value = event.target.value;
  this.state.questions[field] = value
  return this.setState({profileInfo: this.state.profileInfo})
},

componentWillMount: function() {
  MessageStore.addChangeListener(this._onChange)
},
componentWillUnmount: function() {
  MessageStore.removeChangeListener(this._onChange)
  clearInterval(interval)
  // this.setState({users: UserStore.getUserById(this.props.params.userid)})
// console.log('hello there ' + this.state.users);
},

sortComments: function(array) {
    for(var i =0; i < array.length; i++) {
        minIndx = i
        minVal = array[i].date
        var j = i + 1
        while(j < array.length) {
            if(minVal > array[j].date) {
                minIndx = j
                minVal = array[j].date
            }
            j+=1
        }
        temp = array[i]
        array[i] = array[minIndx]
        array[minIndx] = temp

    }
    return array
},

loadCommentsFromServer() {
this.setState({messages: MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)})

},
componentDidMount: function() {
  this.scrolled()
  this.loadCommentsFromServer()
  var interval = setInterval(this.loadCommentsFromServer, pollInterval);
},
﻿
scrolled: function() {
  return window.scrollTo(0, 50000)
},

_onChange: function(comment) {
  fullComment = {
    message: comment,
    sender_id: this.props.params.userid,
    receiver_id: this.props.params.receiverid,
    date: Date.now()
  }

  if(fullComment.message !== '' && fullComment.message !== undefined) {
  MessageAction.submitComment(fullComment)
}
  MessageAction.commentSeen(fullComment.sender_id, fullComment.receiver_id)

  var messaged = MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)
  this.setState({messages: messaged})

  window.setTimeout(this.scrolled , 120)

},

  render: function() {
    userpic = this.state.user.profilepicture
    friendpic = this.state.friend.profilepicture
    userid = this.props.params.userid
    if(!this.state.messages.length) {
      return (
        <InitiateChat profile={this.state.profileInfo} onSave={this.formSubmitted} onType={this.setQuestionChange} userinfo={this.state.friend} />
      )
    }
    return (
      <div>
      <div className="commentDisplay">
      <CommentDisplay key='derp' userprofilepicture={userpic} friendprofilepicture={friendpic} paramid={userid}
     messages={this.state.messages} />
      <CommentForm onCommentSubmit={this._onChange} />
      </div>
      </div>
    )
  }
})

module.exports = IndividualChat
