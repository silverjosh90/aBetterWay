var ChatEditFields = require('./chatEditFields')

var InitiateChat = React.createClass({
  render: function() {

  return(
    <div>
    <h1> {this.props.userinfo.firstname} {this.props.userinfo.lastname} </h1>
    <img src={this.props.userinfo.profilepicture} />
    <form>

      <p> {this.props.profile.question1}</p>
      <ChatEditFields name="question1" placeholder="Question 1" onChange={this.props.onType} />

      <p> {this.props.profile.question2}</p>
      <ChatEditFields name="question2" placeholder="Question 2" onChange={this.props.onType} />

      <p> {this.props.profile.question3}</p>
      <ChatEditFields name="question3" placeholder="Question 3" onChange={this.props.onType} />

      <p> {this.props.profile.question4}</p>
      <ChatEditFields name="question4" placeholder="Question 4" onChange={this.props.onType} />

      <input type="submit" onClick={this.props.onSave} value="Submit Answers" />

    </form>

    </div>
  )
  }
})

module.exports = InitiateChat
