var ProfileinfoStore = require('../../stores/profileInfoStore')
var UserStore = require('../../stores/userStore')
var ProfileFormSection = require('./profileFormSection')
var profileInfoActions = require('../../actions/profileInfoActions')
var toastr = require('toastr')
var hashHistory = require('react-router').hashHistory


var ProfileForm = React.createClass({
  getInitialState: function(){
    return {
      profileInfo: ProfileinfoStore.getProfileInfo(this.props.params.userid),
      user: UserStore.getUserById(this.props.params.userid)
    }
  },
  setQuestionChange: function(event) {
    var field = event.target.name;
    var value = event.target.value;
    this.state.profileInfo[field] = value
    return this.setState({profileInfo: this.state.profileInfo})
  },

  formSubmitted: function(event) {
  toastr.options={
    'preventDuplicates': true,
    "positionClass": "toast-bottom-left"
  }
  if (!this.state.profileInfo.question1|| !this.state.profileInfo.question2 || !this.state.profileInfo.Bio) {
    return toastr.warning('text fields cannot be blank')
  }
  event.preventDefault()
  profileInfoActions.saveInfo(this.state.profileInfo)
  hashHistory.push(`/profile/${this.state.profileInfo.fb_id}`)
  // AuthorActions.createAuthor(this.state.author)
  toastr.success('Info Saved')
  },
  render: function() {
    return (
    <div>
    <h1> {this.state.user.firstname} Profile </h1>
    <ProfileFormSection onChange={this.setQuestionChange} valued={this.state.profileInfo.Bio} onSave={this.formSubmitted} profileinfo={this.state.profileInfo} />


    </div>
  )

  }
})

module.exports = ProfileForm
