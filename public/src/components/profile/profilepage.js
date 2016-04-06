var Link = require('react-router').Link
var UserActions = require('../../actions/userActions')
var UserStore = require('../../stores/userStore')
var UserInfo = require('./userinfo')
var Profile = React.createClass({

getInitialState: function() {
  return {
      person: {},
      otherUsers: {}
  }
    // UserActions.findUserById(this.props.params)
    // {
    // name: 'Josh',
    // profilePicture: '',
    // bio: ''
    // }
  },

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
    this.setState({otherUsers: UserStore.getAllUsers()})

},

render: function() {
  var usersID = this.state.person.fb_id
return(

  <div>
  <h1>Welcome to the road Ahead {this.state.person.firstname}</h1>
    <UserInfo profilepicture={this.state.person.profilepicture} otherPeople={this.state.otherUsers} firstname={this.state.person.firstname} lastname={this.state.person.lastname}  />
    <Link to="chat" query={{userid: usersID}}> Chat with friends~~! </Link>
   </div>
)
}
});

module.exports = Profile
