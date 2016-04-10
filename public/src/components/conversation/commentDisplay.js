var moment = require('moment')


var CommentDisplay = React.createClass({
  render: function() {
  userpic= this.props.userprofilepicture
  friendpic= this.props.friendprofilepicture
  userid = this.props.paramid

  var displayMessages= this.props.messages.map(function(comment){

    if (comment.seen) {
      var seen = 'seen'
    }
    else {
      var seen = ''
    }

    if (comment.sender_id == userid) {
      picture = userpic
    }
    else {
      picture = friendpic
    }

    return(
      <div className="chatMessage" key={comment.id}>
      <img className="chatPic" src={picture}/>
      <p className="chatComment" key={comment.Date}>{comment.message}</p>
      <br />
      <p> {moment(Number(comment.Date)).fromNow()} {seen}</p>
     </div>

    )
  })
    return (
      <div>
        {displayMessages}
      </div>
    )
  }
})

module.exports = CommentDisplay
