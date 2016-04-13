var Link = require('react-router').Link
var UserActions = require('../../actions/userActions')
var UserStore = require('../../stores/userStore')
var ProfileinfoStore = require('../../stores/profileInfoStore')
var UserInfo = require('./userinfo')
var hashHistory = require('react-router').hashHistory

var Profile = React.createClass({

getInitialState: function() {
    return {
      person: UserStore.getUserById(this.props.params.userid),
      otherUsers: {},
      profileInfo: ProfileinfoStore.getProfileInfo(this.props.params.userid)
    }

  },

componentWillMount: function() {
  UserStore.addChangeListener(this._onChange)
},

componentWillUnmount: function() {
  UserStore.removeChangeListener(this._onChange)

},

_onChange: function() {
    this.setState({person: UserStore.getUserById(this.props.params.userid)})
    this.setState({profileInfo: ProfileinfoStore.getProfileInfo(this.props.params.userid)})
    this.setState({otherUsers: UserStore.getAllUsers()})

},

render: function() {
  if(this.state.person){
    return(
      <div className='profPage'>
      <div className="headerTemplate">
        <div className="navButtons home">home</div>
        <div className="navButtons chat">chat</div>
        <div className="navButtons profile">profile</div>
        <div className="navButtons logout">logout</div>
      </div>
      <h1 className='welcomeMessage'>Welcome,<p className='yourName'>{this.state.person.firstname}</p></h1>
      <div className='profPic'>
      <UserInfo profilepicture={this.state.person.profilepicture} firstname={this.state.person.firstname} lastname={this.state.person.lastname} location={this.state.person.city} Bio={this.state.profileInfo.Bio} />
      </div>
      <Link className='editLink' to={`profile/edit/${this.state.person.fb_id}`}>edit profile</Link>
      <br />
      <Link className='chatLink' to={`chat/all/${this.state.person.fb_id}`}>chat with friends!</Link>
      </div>
    )
  }else{
    return(
      <div>
      </div>
    )
  }
}

});

module.exports = Profile
