var React = require('react');
var RecipeList = require('../components/RecipeList');
var AppHeader = require('../components/AppHeader');
require('../main.scss');

var App = function(props) {
  return (
    <div>
      <AppHeader />
      <RecipeList />
    </div>
  )
};

module.exports = App;
