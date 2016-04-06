
var $ = require('jquery')
var PropTypes = require('react').PropTypes
var jQuery = require('jquery');
var React = require('react')
var Link = require('react-router').Link
var Router = require('react-router')
var hashHistory= Router.hashHistory
var UserStore = require('../stores/userStore')
var UserActions = require('../actions/userActions')


var App = React.createClass({
  getInitialState: function() {
    return {
      users: {}
    }
  },
  componentWillMount: function() {
    UserStore.addChangeListener(this._onChange)
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange)
    // this.setState({users: UserStore.getUserById(this.props.params.userid)})
  // console.log('hello there ' + this.state.users);
  },
  _onChange: function() {
    var derp = UserStore.getAllUsers()
    this.setState({users: derp})
    console.log(this.state.users);


  },
  responseFacebook: function(response) {

      UserActions.createUser(response)
      hashHistory.push('/profile/' + response.id)
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

        <div className="splashImg">
          <div className="blurBackground">
            <h2 className="pageTitle">The New Kid In Town</h2>
            <button className="btn btn-primary" onClick={this.click}> Log in with Facebook</button>
          </div>
        </div>
       </div>
    )
  }
})


module.exports = App
