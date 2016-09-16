var React = require('react');
var RecipeList = require('../components/RecipeList');
var AppHeader = require('../components/AppHeader');
var cacheHelper = require('../utils/cacheHelper');

// Stateful master component.
var AppContainer = React.createClass({

  getInitialState: function () {
    return {
      recipes: cacheHelper.getRecipesFromCache()
    }
  },

  handleRecipeDelete: function (recipeId, event) {
    event.stopPropagation();

    this.setState({
      recipes: this.state.recipes.filter(recipe => recipe.id !== recipeId)
    }, function() {
      /* Updating the cache is done in the callback, once the state has been
         truly updated. Otherwise, the deleted recipe would still be there. */
      cacheHelper.setCache('recipes', this.state.recipes);
    });
  },

  handleRecipeAdd: function (newRecipe) {
    this.setState({
      recipes: this.state.recipes.concat([newRecipe])
    }, function() {
      cacheHelper.setCache('recipes', this.state.recipes);
    })
  },

  // Activate (and deactivate) editing mode for individual or 'all' recipes:
  handleActivateEdit: function (recipeId, newEditingState, event) {
    event.stopPropagation();

    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if ((recipe.id === recipeId || recipeId === 'all')
          && recipe.editing !== newEditingState) {
          recipe.editing = newEditingState;
        }
        return recipe;
      })
    }, function() {
      cacheHelper.setCache('recipes', this.state.recipes);
    });
  },

  // Updates the state while typing (name or ingredients):
  handleInputChange: function (recipeId, field, event) {
    event.stopPropagation();
    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if (recipe.id === recipeId) {
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
    });
    // There is no setCache here, but only after the editing is finished.
  },


  render: function () {
    return (
      <div>
        <AppHeader
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
