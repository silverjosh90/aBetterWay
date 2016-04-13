

UserInfo = React.createClass({
  render: function() {
    return (
    <div className='infoDiv'>
      <img src={this.props.profilepicture} />
      <h5> {this.props.location} </h5>
      <div className='profInfoDiv'>
        <h3 className='bio'>Bio</h3>
        <p> {this.props.Bio} </p>

      </div>
    </div>
  )
  }
})

module.exports = UserInfo
