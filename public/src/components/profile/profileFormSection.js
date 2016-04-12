var ProfileEditFields = require('./ProfileEditFields')
var ProfileFormSection = React.createClass({
// var name;
// var profile;
// var onchange;
// var value;

  render: function() {
    return (
      <form>
      <label htmlFor='Bio'> Bio </label>
      <br />
      <textarea name='Bio' value={this.props.profileinfo.Bio} onChange={this.props.onChange}> </textarea>
      // <ProfileEditFields name='question1' placeholder="Question 1" value={this.props.profileinfo.question1} onChange={this.props.onChange}/>
      // <ProfileEditFields name="question2" placeholder="Question 2" value={this.props.profileinfo.question2} onChange={this.props.onChange} />
      // <ProfileEditFields name="question3" placeholder="Question 3" value={this.props.profileinfo.question3} onChange={this.props.onChange}/>
      // <ProfileEditFields name="question4" placeholder="Question 4" value={this.props.profileinfo.question4} onChange={this.props.onChange}/>
      <input type="submit" onClick={this.props.onSave} className="btn btn-default" />
      </form>
    )
  }


})

module.exports= ProfileFormSection
