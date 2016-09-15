var React = require('react');
require('../main.scss');

// Not used anymore
var App = function(props) {

  return (
    <div>
      <AppHeader />
      <RecipeList recipes={recipes}/>
    </div>
  )
};

module.exports = App;
