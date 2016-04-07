var Link = require('react-router').Link
var DisplayAllUsers = React.createClass({

  render: function() {

    return (
      <Link to={`/chat/${this.props.fb_id}`}>
      <img src={this.props.profilepicture} height="200px" width="200px" />
      <h5> {this.props.firstname} {this.props.lastname} </h5>
      </Link>

    )
  }
})

module.exports = DisplayAllUsers
