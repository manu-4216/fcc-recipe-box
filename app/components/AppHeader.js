var React = require('react');
require('../main.scss');

var AppHeader = function({recipes, onRecipeAdd}) {

  const newRecipe = {
    name: 'New Recipe',
    ingredients: [],
    editing: true
  }

  return (
    <div className='app--header'>
      <button className='header--add-button' onClick={onRecipeAdd.bind(null, newRecipe)}>
        +
      </button>
      <h1 className='header--title'>Recipe Box</h1>
    </div>
  )
};

module.exports = AppHeader;
