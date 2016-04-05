
var UserActions = require('../../actions/userActions')
var Profile = React.createClass({

getInitialState: function() {
  return { user: ''
    // UserActions.findUserById(this.props.params)
    // {
    // name: 'Josh',
    // profilePicture: '',
    // bio: ''
    // }
  }
},

render: function() {
return(

  <div>
  <p> Joshua </p>
  <p> no</p>
   </div>
)
}
});

module.exports = Profile
