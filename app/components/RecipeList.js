var React = require('react');
var Recipe = require('../components/Recipe');
require('../main.scss');

var RecipeList = function(props) {
  return (
    <ul className='recipe-list'>{props.recipes.map(recipe =>
      <Recipe
        key={recipe.id}
        recipe={recipe}
        onRecipeDelete={props.onRecipeDelete}
        onToggleEditAndCollapse={props.onToggleEditAndCollapse}
        onInputChange={props.onInputChange}
        onToggleExpand={props.onToggleExpand}
        onEnterCheck={props.onEnterCheck} />
    )}</ul>
  )
};

module.exports = RecipeList;
