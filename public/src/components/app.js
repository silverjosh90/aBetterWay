
var $ = require('jquery')
var PropTypes = require('react').PropTypes
var jQuery = require('jquery');
var React = require('react')
var Link = require('react-router').Link
var Router = require('react-router')
var hashHistory= Router.hashHistory
var UserStore = require('../stores/userStore')
var MessageStore = require('../stores/messageStore')
var ProfileinfoStore = require('../stores/profileInfoStore')
var UserActions = require('../actions/userActions')
var ProfileInfoActions = require('../actions/profileInfoActions')
var toastr = require('toastr')


var App = React.createClass({
  getInitialState: function() {
    return {
      users: {},
      messages: {}
    }
  },
  componentWillMount: function() {
    UserStore.addChangeListener(this._onChange)
    MessageStore.addChangeListener(this._onChange)
    ProfileinfoStore.addChangeListener(this._onChange)
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange)
    ProfileinfoStore.removeChangeListener(this._onChange)
    MessageStore.removeChangeListener(this._onChange)
    // this.setState({users: UserStore.getUserById(this.props.params.userid)})
  // console.log('hello there ' + this.state.users);
  },
  _onChange: function() {
    var getting_users = UserStore.getAllUsers()
    var message = MessageStore.getAllMessages()
    this.setState({users: getting_users})


  },
  responseFacebook: function(response) {
      ProfileInfoActions.createProfile(response.id)
      UserActions.createUser(response)
      hashHistory.push('/profile/' + response.id)
      toastr.success('Thanks for logging in ' + response.first_name + "!" )
    },

    propTypes: {

      xfbml: PropTypes.bool,
      cookie: PropTypes.bool,
      scope: PropTypes.string,
      textButton: PropTypes.string,
      autoLoad: PropTypes.bool,
      size: PropTypes.string,
      fields: PropTypes.string,
      cssClass: PropTypes.string,
      version: PropTypes.string,
      icon: PropTypes.string,
      language: PropTypes.string,
    },


    componentDidMount: function() {
      let fbRoot = document.createElement('div');
          fbRoot.id = 'fb-root';

      document.body.appendChild(fbRoot);

      window.fbAsyncInit = function() {
        FB.init({
          appId: 249945812017045,
          xfbml: true,
          cookie: false,
          version: 'v2.5',
        });

        if (true) {
          FB.getLoginStatus(this.checkLoginState);
        }
      }

      // Load the SDK asynchronously
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '249945812017045',
          xfbml      : true,
          version    : 'v2.5'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    },



    responseApi: function(authResponse){
      FB.api('/me', { fields: ["picture.width(400).height(400)", 'first_name', 'last_name'] }, (me) => {
        me.accessToken = authResponse.accessToken;
        this.responseFacebook(me);
      });
    },

    checkLoginState: function(response){
      if (response.authResponse) {
        this.responseApi(response.authResponse);
      } else {
        if (this.responseFacebook) {
          this.responseFacebook({ status: response.status });
        }
      }
    },

    click: function(e){
      FB.login(this.checkLoginState, { scope: 'public_profile, email'});
    },

  render: function() {
    return (
      <div className="derp">

        <div className="headerTemplate">
          <div className="navButtons home">home</div>
          <div className="navButtons chat">chat</div>
          <div className="navButtons profile">profile</div>
          <div className="navButtons logout">logout</div>
        </div>
        
        <div className="splashImg">
        <div className='logo'><i className="fa fa-map-o" aria-hidden="true"></i></div>
          <div className="blurBackground">
            <h2 className="pageTitle">new kid in town</h2>
            <button className="fbLoginButton btn btn-primary" onClick={this.click}>facebook login</button>
          </div>
        </div>
       </div>
    )
  }
})


module.exports = App
