

UserInfo = React.createClass({
  render: function() {
    return (
    <div>
      <img src={this.props.profilepicture} />
      <p> Hello {this.props.firstname} {this.props.lastname} </p>


      <h3>Bio</h3>
      <p> {this.props.profinfo.Bio} </p>
      <br />

      <h3>Question 1</h3>
      <p> {this.props.profinfo.question1} </p>
        <br />
      <h3>Question 2</h3>
      <p> {this.props.profinfo.question2} </p>
        <br />
      <h3>Question 3</h3>
      <p> {this.props.profinfo.question3} </p>
        <br />
      <h3>Question 4</h3>
      <p> {this.props.profinfo.question4} </p>

    </div>
  )
  }
})

module.exports = UserInfo
