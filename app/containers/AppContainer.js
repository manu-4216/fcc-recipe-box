var React = require('react');
var RecipeList = require('../components/RecipeList');
var AppHeader = require('../components/AppHeader');

// Stateful master component.
var AppContainer = React.createClass({

  getInitialState: function () {
    return {
      recipes: [
        {
          name: 'Apple Pie',
          ingredients: ['apples', 'pie'],
          editing: false
        },
         {
           name: 'Cheese Pie',
           ingredients: ['cheese', 'pie'],
           editing: false
         }
      ],
    }
  },

  handleRecipeDelete: function (recipeName, event) {
    event.stopPropagation();

    this.setState({
      recipes: this.state.recipes.filter(recipe => recipe.name !== recipeName)
    });
  },

  handleRecipeAdd: function (newRecipe) {
    this.setState({
      recipes: this.state.recipes.concat([newRecipe])
    })
  },

  // Activate (and deactivate) editing mode for individual or 'all' recipes
  handleActivateEdit: function (recipeName, newEditingState, event) {
    event.stopPropagation();

    this.setState({
      recipes: this.state.recipes.map(recipe => {
        //
        if (recipe.name === recipeName || recipeName === 'all') {
          recipe.editing = newEditingState;
        }
        return recipe;
      })
    });
  },

  // Updates the state while typing (name or ingredients):
  handleInputChange: function (recipeName, field, event) {
    event.stopPropagation();
    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if (recipe.name === recipeName) {
          if (field === 'name') {
            recipe.name = event.target.value;
          } else if (field === 'ingredients') {
            // Transform the input field 'text1,text2' from a string to an array ['text1', 'text2']:
            let ingredientsArray = event.target.value.split(',');
            recipe.ingredients = ingredientsArray;
          }
        }
        return recipe;
      })
    })
  },


  render: function () {
    return (
      <div>
        <AppHeader
          recipes={this.state.recipes}
          onRecipeAdd={this.handleRecipeAdd}
          />
        <RecipeList
          recipes={this.state.recipes}
          onRecipeDelete={this.handleRecipeDelete}
          onActivateEdit={this.handleActivateEdit}
          onInputChange={this.handleInputChange}
          />
      </div>
    )
  }
});

module.exports = AppContainer;
