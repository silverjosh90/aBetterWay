
var MessageStore= require('../../stores/messageStore')
var UserStore= require('../../stores/userStore')
var MessageAction = require('../../actions/messageActions')
var CommentForm = require('./commentform')
var CommentDisplay = require('./commentDisplay')
var pollInterval = 100

var IndividualChat= React.createClass({
  getInitialState: function() {
    return {
      messages: MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid),
      user: UserStore.getUserById(this.props.params.userid),
      friend: UserStore.getUserById(this.props.params.receiverid),
  }
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

loadCommentsFromServer() {

this.setState({messages:MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)})


},
componentDidMount: function() {
  this.scrolled()
  this.loadCommentsFromServer()
  var interval = setInterval(this.loadCommentsFromServer, pollInterval);
    // this.createSocket().emit('new comment', message)
},
// createSocket: function() {
//   var socket = io()
//   return socket
// },

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
  // var that = this;
  // this.socket = io();
  // this.socket.on(function(){
  //   that.setState({messages:MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)})
  // })
  MessageAction.submitComment(fullComment)
  // var newMessages = this.state.messages
  // console.log('this is the new message breh');
  // console.log(newMessages);
  // fullComment.id = Date.now()
  // console.log(JSON.stringify(fullComment));
  // var finalComment  = JSON.stringify(fullComment)
  // pushed = newMessages.push(finalComment)
  var messaged = MessageStore.getConvo(this.props.params.receiverid, this.props.params.userid)
  this.setState({messages: messaged})

  window.setTimeout(this.scrolled , 120)




  // var comments = this.state.data;
  // comment.id = Date.now()
  // var newComments = comments.concat([comment])
  // this.setState({data: newComments});
  // $.ajax({
  //   url: this.props.url,
  //   dataType: 'json',
  //   type: 'POST',
  //   data: comment,
  //   succes: function(data){
  //     this.setState({data: data});
  //   }.bind(this),
  //   error: function(xhr, status, err) {
  //     this.setState({data: comments});
  //     console.error(this.props.url, status, err.toString())
  //   }.bind(this)
  // });

},

  render: function() {
    userpic = this.state.user.profilepicture
    friendpic = this.state.friend.profilepicture
    userid = this.props.params.userid
    // var displayMessages = this.state.messages.map(function(comment){
    //   {displayMessages}
    //   if (comment.sender_id == userid) {
    //     picture = userpic
    //   }
    //   else {
    //     picture = friendpic
    //   }
    //   return(
    //
    //     <div className="chatMessage">
    //     <img className="chatPic" src={picture}/>
    //     <p className="chatComment">{comment.message}</p>
    //     </div>
    //
    //   )
    // })``
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
