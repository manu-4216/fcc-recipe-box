var React = require('react');
import uuid from 'uuid';
require('../main.scss');

var AppHeader = function({onRecipeAdd}) {

  const newRecipe = {
    id: uuid.v4(),
    name: 'New Recipe',
    ingredients: [],
    editing: true,
    expanded: true
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
