
var DisplayAllUsers = require('./displayallusers')
var UserStore = require('../../stores/userStore')

var Chat = React.createClass({
  getInitialState: function() {
    return {users: UserStore.getAllUsers()}
  },
  render: function() {
    var parameter=this.props.params.userid
  var allUsers = this.state.users
  var individualUsers = allUsers.map(function(user){
    return (
      <div className="chatFriends">
      <DisplayAllUsers className="chatUsers" firstname={user.firstname} location={user.city} profilepicture={user.profilepicture} secondUser={parameter}  lastname={user.lastname} fb_id={user.fb_id} key={user.id} />
      </div>
    )
  })

    return (
      <div className="UsersDisplay">
      {individualUsers}
      </div>
    )

}
})

module.exports = Chat
