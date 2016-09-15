var React = require('react');
var ReactDOM = require('react-dom');
var AppContainer = require('./containers/AppContainer');
require('./main.scss');

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app')
);
