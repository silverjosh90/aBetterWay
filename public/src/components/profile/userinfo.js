

UserInfo = React.createClass({
  render: function() {
    return (
    <div>
      <img src={this.props.profilepicture} />
      {console.log(this.props.profilepicture)}
      <p> Hello {this.props.firstname} {this.props.lastname} </p>
    </div>
  )
  }
})

module.exports = UserInfo
