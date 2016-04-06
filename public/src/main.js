var routes = require('./routes')
var InitializeActions = require('./actions/initializeActions')


InitializeActions.initApp()

ReactDOM.render(
  routes,
  document.getElementById('content')
)
