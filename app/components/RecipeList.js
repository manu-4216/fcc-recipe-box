var React = require('react');
var Recipe = require('../components/Recipe');
require('../main.scss');

var RecipeList = function(props) {

  return (
    <ul className='recipe-list'>{props.recipes.map(recipe =>
      <Recipe
        key={recipe.name}
        recipe={recipe}
        onRecipeDelete={props.onRecipeDelete}
        onActivateEdit={props.onActivateEdit}
        onInputChange={props.onInputChange} />
    )}</ul>
  )
};

module.exports = RecipeList;
