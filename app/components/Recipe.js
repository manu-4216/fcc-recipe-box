var React = require('react');
require('../main.scss');

var Recipe = function(props) {

  return (
    <li className="recipe">
      <h2 className="title">
        {props.recipe.name}
      </h2>

      <div>
        <span className="label">Preparation:</span>{props.recipe.preparation}
      </div>

      <span className="label">Ingredients:</span>
      <ul className="ingredient-list">
        {props.recipe.ingredients.map(ingredient =>
          <li className="ingredient" key={ingredient}>{ingredient}</li>
        )}
      </ul>

      <span className="right-side-buttons">
        <span>Edit</span>
        <span>Delete</span>
      </span>
    </li>
  )
};

module.exports = Recipe;
