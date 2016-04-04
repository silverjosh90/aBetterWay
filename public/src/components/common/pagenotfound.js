var Link = require('react-router').Link

var PageNotFound = React.createClass({
  render: function() {
    return (
      <div>
      {console.log('getting Here')}
      <h1> Page not found! </h1>
      <Link to="/"> Go Home </Link>
      </div>
    )
  }
})

module.exports = PageNotFound
