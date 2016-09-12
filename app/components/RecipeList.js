var React = require('react');
var Recipe = require('../components/Recipe');
require('../main.scss');

var RecipeList = function(props) {

  const recipes = [
    {
      name: "Apple Pie",
      preparation: "Take the apples and the pie, mix them and bake them for 25 min at medium temperature.",
      ingredients: ["apples", "pie"]
    },
     {
       name: "Cheese Pie",
       preparation: "Take the cheese and the pie, mix them and bake them for 25 min at medium temperature.",
       ingredients: ["cheese", "pie"]
     }
  ];

  return (
    <ul className="recipe-list">{recipes.map(recipe =>
      <Recipe recipe={recipe} key={recipe.name} />
    )}</ul>
  )
};

module.exports = RecipeList;
