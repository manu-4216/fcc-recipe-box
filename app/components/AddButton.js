var React = require('react');
import uuid from 'uuid';
require('../main.scss');

var AddButton = function({onRecipeAdd}) {

  const newRecipe = {
    id: uuid.v4(),
    name: 'New Recipe',
    ingredients: [],
    imageUrl:'',
    editing: true,
    expanded: true
  }

  return (
    <div className='add-button-band'>
      <button className='add-button-icon' onClick={onRecipeAdd.bind(null, newRecipe)}>
        +
      </button>
    </div>
  )
};

module.exports = AddButton;
