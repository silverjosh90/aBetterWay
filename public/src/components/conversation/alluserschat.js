
var DisplayAllUsers = require('./displayallusers')
var UserStore = require('../../stores/userStore')

var Chat = React.createClass({
  getInitialState: function() {
    return {users: UserStore.getAllUsers()}
  },


  render: function() {
    return (
      <div>
      <p> hello </p>
      <DisplayAllUsers user={this.state.users} />
      </div>
    )

}
})

module.exports = Chat
