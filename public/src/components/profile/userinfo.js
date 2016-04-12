

UserInfo = React.createClass({
  render: function() {
    return (
    <div className='infoDiv'>
      <img src={this.props.profilepicture} />
      <div className='profInfoDiv'>
        <h3 className='bio'>Bio</h3>
        <p> {this.props.profinfo.Bio} </p>
        <br />

        <h3 className='qOne'>Question 1</h3>
        <p> {this.props.profinfo.question1} </p>
          <br />
        <h3 className='qTwo'>Question 2</h3>
        <p> {this.props.profinfo.question2} </p>
          <br />
        <h3 className='qThree'>Question 3</h3>
        <p> {this.props.profinfo.question3} </p>
          <br />
        <h3 className='qFour'>Question 4</h3>
        <p> {this.props.profinfo.question4} </p>
      </div>
    </div>
  )
  }
})

module.exports = UserInfo
