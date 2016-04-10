var ProfileEditFields = require('../profile/profileEditFields')

var InitiateChat = React.createClass({
  render: function() {

  return(
    <div>
    <h1> {this.props.userinfo.firstname} {this.props.userinfo.lastname} </h1>
    <img src={this.props.userinfo.profilepicture} />
    <form>
    <p> {this.props.profile.question1}</p>
    <ProfileEditFields />
    <p> {this.props.profile.question2}</p>
    <ProfileEditFields />
    <p> {this.props.profile.question3}</p>
    <ProfileEditFields />
    <p> {this.props.profile.question4}</p>
    <ProfileEditFields />
    <input type="submit" value="submitAnswers" />
    </form>

    </div>
  )
  }
})

module.exports = InitiateChat
