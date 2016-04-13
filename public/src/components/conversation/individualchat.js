
var MessageStore= require('../../stores/messageStore')
var Question= require('../../stores/questionStore')
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
    console.log(this.sortComments(MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)))
    return {
      messages: this.sortComments(MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)),
      user: UserStore.getUserById(this.props.params.userid),
      friend: UserStore.getUserById(this.props.params.receiverid),
      profileInfo: ProfileinfoStore.getProfileInfo(this.props.params.receiverid),
      question: ProfileAnswersStore.getQuestion(this.props.params.userid, this.props.params.receiverid),
      renderChat: this.checkRender,
      smileysnake: false,
      quest: false,
      ninja: false,
  }
},
formSubmitted: function(event) {

  event.preventDefault()
  console.log('submitted');
  if (!this.state.question) {
    return toastr.warning('text field cannot be blank')
  }
  var answer = {
    question: this.state.question,
    asker_id: this.props.params.userid,
    answerer_id: this.props.params.receiverid
  }
  ProfileAnswersActions.addAnswers(answer)

  this.setState({chatRender: true})
  hashHistory.push(`/conversation/${this.props.params.receiverid}/${this.props.params.userid}`)

},
setQuestionChange: function(event) {
  var value = event.target.value;
  this.state.question = value
  return this.setState({question: this.state.question})

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
    console.log(fullComment.message);
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

checkRender: function() {
  if (this.state.question == [] && this.state.messages == []) {
    console.log('rendered from empty messages');
      return this.setState({renderChat: false})
  }
  for (var i = 0; i < this.state.messages.length; i++) {
          var iteration = this.state.messages[i]
      if(iteration.sender_id == this.props.params.userid && iteration.seen == false) {
        return this.setState({renderChat: true})
      }
    }
  return this.setState({renderChat: false})
},

generateQuestion: function(event) {
  event.preventDefault()
 this.setState({question: Question.getRandomQuestion()})
 console.log(this.state.question);
},

  render: function() {
    userpic = this.state.user.profilepicture
    friendpic = this.state.friend.profilepicture
    userid = this.props.params.userid
      if(this.state.chatRender){
        return (
          <div className='headerAndChat'>
            <div className="headerTemplate">
              <div className="navButtons home">
                <p onClick={this.toggleSmiley}>SmileySnake</p>
              </div>
              <div className="navButtons chat">
                <p onClick={this.toggleNinja}>Ninja</p>
              </div>
              <div className="navButtons profile">
                <p onClick={this.toggleQuest}>Quest</p>
              </div>
            </div>

            <div className="chatWrapper">
            <ToggleDisplay show={this.state.smileysnake}>
              { this.state.smileysnake ? <SmileySnake /> : null }
            </ToggleDisplay>

            <ToggleDisplay show={this.state.ninja}>
              { this.state.ninja ? <NinjaGame /> : null }
            </ToggleDisplay>
            <ToggleDisplay show={this.state.quest}>
              { this.state.quest ? <QuestGame /> : null }
            </ToggleDisplay>


            <div className="commentDisplay">
            <p className="question">{this.state.question}</p>
            <CommentDisplay key='derp' userprofilepicture={userpic} friendprofilepicture={friendpic} paramid={userid}
           messages={this.state.messages} />
            <CommentForm onCommentSubmit={this._onChange} />
            </div>
            </div>
          </div>
        )
      }
    else{
      return (
        <div className="fullQuestionPage">
        <InitiateChat question={this.state.question} getQuestion={this.generateQuestion} onSave={this.formSubmitted} onType={this.setQuestionChange} userinfo={this.state.friend} />
        </div>
      )
    }

  }
})

module.exports = IndividualChat
