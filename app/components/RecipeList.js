var React = require('react');
var PropTypes = React.PropTypes;
var Recipe = require('../components/Recipe');
var AddButton = require('../components/AddButton');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var FlipMove = require('react-flip-move');
require('../main.scss');

var RecipeList = React.createClass({
  propTypes: {
    recipes: PropTypes.array.isRequired,
    onRecipeAdd: PropTypes.func.isRequired
  },

  render: function () {
    return (
      <ul className='recipe-list'>
      {/* FlipMove will enable smooth animation of the items inside */}
      <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          { this.getItems() }
          <AddButton onRecipeAdd={this.props.onRecipeAdd} />
        </FlipMove>
      </ul>
    );
  },

  getItems: function () {
    return this.props.recipes.map(recipe =>
      <Recipe
        key={recipe.id}
        recipe={recipe}
        {...this.props}
      />
    )
  }
});

module.exports = RecipeList;
