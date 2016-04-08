
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
      <DisplayAllUsers firstname={user.firstname} profilepicture={user.profilepicture} secondUser={parameter}  lastname={user.lastname} fb_id={user.fb_id} key={user.id} />
    )
  })

    return (
      <div>
      <p> hello </p>

      {individualUsers}
      </div>
    )

}
})

module.exports = Chat
