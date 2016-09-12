var React = require('react');
require('../main.scss');

var AppHeader = function(props) {

  return (
    <h1 className="app-header">
      <button>
        +
      </button>
      <span>Recipe Box</span>
    </h1>
  )
};

module.exports = AppHeader;
