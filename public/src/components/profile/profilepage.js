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

    // UserActions.findUserById(this.props.params)
    // {
    // name: 'Josh',
    // profilePicture: '',
    // bio: ''
    // }
  },

  // checkifBio: function() {
  //   if(!ProfileinfoStore.getProfileInfo(this.props.params.userid)) {
  //     return hashHistory.push(`/profile/${this.props.params.userid}`)
  //   }
  //   else return;
  // },
componentWillMount: function() {
  UserStore.addChangeListener(this._onChange)
  // this.setState({users: UserStore.getUserById(this.props.params.userid)})
// console.log('hello there ' + this.state.users);
},
componentWillUnmount: function() {
  UserStore.removeChangeListener(this._onChange)
  // this.setState({users: UserStore.getUserById(this.props.params.userid)})
// console.log('hello there ' + this.state.users);
},

_onChange: function() {
    this.setState({person: UserStore.getUserById(this.props.params.userid)})
    this.setState({profileInfo: ProfileinfoStore.getProfileInfo(this.props.params.userid)})
    this.setState({otherUsers: UserStore.getAllUsers()})

},

render: function() {
  var usersID = this.state.person.fb_id
  if(!ProfileinfoStore.getProfileInfo(this.props.params.userid)) {
    return(
      <div>
      <h1>Welcome to the road Ahead {this.state.person.firstname}</h1>

        <Link to={`profile/edit/${this.state.person.fb_id}`}> Create your profile! </Link>
      </div>

    )
  }
else {
return(
<div className='profPage'>
  <h1 className='welcomeMessage'>Welcome,<p className='yourName'>{this.state.person.firstname}</p></h1>
  <div className='profPic'><UserInfo profilepicture={this.state.person.profilepicture} firstname={this.state.person.firstname} lastname={this.state.person.lastname} profinfo={this.state.profileInfo} />
  </div>
  <Link className='editLink' to={`profile/edit/${this.state.person.fb_id}`}>edit profile</Link>
  <br />
  <Link className='chatLink' to={`chat/all/${this.state.person.fb_id}`}>chat with friends!</Link>
</div>
)
}
}

});

module.exports = Profile
