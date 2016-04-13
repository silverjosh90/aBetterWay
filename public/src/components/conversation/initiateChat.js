var ChatEditFields = require('./chatEditFields')

var InitiateChat = React.createClass({
  render: function() {

  return(
    <div>
    <h1> {this.props.userinfo.firstname} {this.props.userinfo.lastname} </h1>
    <img className="profPic" src={this.props.userinfo.profilepicture} />
    <form className='questionForm'>
    <button className="generateQuestionButton" onClick={this.props.getQuestion}> Generate Question </button>
      <ChatEditFields name="question" value={this.props.question} placeholder="enter some text" onChange={this.props.onType} />

      <input className='submitAnswers' type="submit" onClick={this.props.onSave} value="Submit Question" />

    </form>

    </div>
  )
  }
})

module.exports = InitiateChat
