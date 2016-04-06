var DisplayAllUsers = React.createClass({

  render: function() {
    var allUsers = this.props.user
  
    var individualUsers = allUsers.map(function(user){
      return (<div>
        <p> {user.firstname} </p>
        </div>
      )
    })
    return (
      <div>
      {individualUsers}
      </div>
    )
  }
})

module.exports = DisplayAllUsers
