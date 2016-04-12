
var MessageStore= require('../../stores/messageStore')
var ProfileinfoStore= require('../../stores/profileInfoStore')
var ProfileAnswersStore= require('../../stores/profileAnswersStore')
var UserStore= require('../../stores/userStore')
var MessageAction = require('../../actions/messageActions')
var CommentForm = require('./commentform')
var CalendarForm = require('./calendarForm')
var CommentDisplay = require('./commentDisplay')
var pollInterval = 100;
var InitiateChat = require('./initiateChat')
var hashHistory = require('react-router').hashHistory
var ProfileAnswersActions = require('../../actions/profileAnswersActions')
var interval = setInterval(this.loadCommentsFromServer, pollInterval);
var ToggleDisplay = require('react-toggle-display')
var SmileySnake= require('./smileySnake')
var NinjaGame = require('./ninjaGame')
var QuestGame = require('./questGame')


var IndividualChat= React.createClass({
  getInitialState: function() {
    console.log(ProfileAnswersStore.getAnswers(this.props.params.userid, this.props.params.receiverid));
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
      },
      smileysnake: false,
      quest: false,
      ninja: false,
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
toggleSmiley: function() {
  this.setState({smileysnake: !this.state.smileysnake})
},
toggleNinja: function() {
  this.setState({ninja: !this.state.ninja})
},
toggleQuest: function() {
  this.setState({quest: !this.state.quest})
},

// <button className="calendarDisplay" onClick={this.toggleView}> Hello </button>
// <ToggleDisplay show={this.state.display}>
//   { this.state.display ? <CalendarForm/> : null }
// </ToggleDisplay>
// <embed className="calendar" base="http://external.kongregate-games.com/gamez/0021/0593/live/" src="http://external.kongregate-games.com/gamez/0021/0593/live/embeddable_210593.swf" type="application/x-shockwave-flash"></embed>
// <embed className="calendar" base="http://external.kongregate-games.com/gamez/0021/4044/live/" src="http://external.kongregate-games.com/gamez/0021/4044/live/embeddable_214044.swf" type="application/x-shockwave-flash"></embed>
// if(!ProfileAnswersStore.getAnswers(this.props.params.userid, this.props.params.receiverid).length) {
//   return (
//     <InitiateChat profile={this.state.profileInfo} onSave={this.formSubmitted} onType={this.setQuestionChange} userinfo={this.state.friend} />
//   )
// }

  render: function() {
    userpic = this.state.user.profilepicture
    friendpic = this.state.friend.profilepicture
    userid = this.props.params.userid

    if (this.state.messages) {
        return ( <InitiateChat profile={this.state.profileInfo} onSave={this.formSubmitted} onType={this.setQuestionChange} userinfo={this.state.friend} /> )
    }
    for (var i = 0; i < this.state.messages.length; i++) {
\      var iteration = this.state.messages[i]


    if(iteration.sender_id == this.props.params.userid && iteration.seen == false) {
        return (
          <InitiateChat profile={this.state.profileInfo} onSave={this.formSubmitted} onType={this.setQuestionChange} userinfo={this.state.friend} />
        )
      }
    }
    return (
      <div>
      <button  onClick={this.toggleSmiley}>SmileySnake</button>
      <ToggleDisplay show={this.state.smileysnake}>
        { this.state.smileysnake ? <SmileySnake /> : null }
      </ToggleDisplay>
      <button  onClick={this.toggleNinja}>Ninja</button>
      <ToggleDisplay show={this.state.ninja}>
        { this.state.ninja ? <NinjaGame /> : null }
      </ToggleDisplay>
      <button  onClick={this.toggleQuest}>Quest</button>
      <ToggleDisplay show={this.state.quest}>
        { this.state.quest ? <QuestGame /> : null }
      </ToggleDisplay>


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
