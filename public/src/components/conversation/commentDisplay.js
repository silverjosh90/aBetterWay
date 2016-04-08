var CommentDisplay = React.createClass({
  render: function() {
  userpic= this.props.userprofilepicture
  friendpic= this.props.friendprofilepicture
  userid = this.props.paramid

  var displayMessages = this.props.messages.map(function(comment){

    if (comment.sender_id == userid) {
      picture = userpic
    }
    else {
      picture = friendpic
    }
    return(

      <div className="chatMessage" key={comment.id}>
      <img className="chatPic" src={picture}/>
      <p className="chatComment">{comment.message}</p>
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
