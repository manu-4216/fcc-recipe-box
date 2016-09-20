var React = require('react');
var Recipe = require('../components/Recipe');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('../main.scss');

var RecipeList = React.createClass({
  render: function () {
    return (
      <ul className='recipe-list'>
        <ReactCSSTransitionGroup
          transitionName="transition"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={300}>
          {this.getItems()}
        </ReactCSSTransitionGroup>
      </ul>
    );
  },

  getItems: function () {
    return this.props.recipes.map(recipe =>
      <Recipe
        key={recipe.id}
        recipe={recipe}
        {...this.props} />
    )
  }
});

module.exports = RecipeList;
