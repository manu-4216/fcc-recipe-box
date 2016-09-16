var React = require('react');
import uuid from 'uuid';
var RecipeList = require('../components/RecipeList');
var AppHeader = require('../components/AppHeader');

// Stateful master component.
var AppContainer = React.createClass({

  getInitialState: function () {
    return {
      recipes: this.getRecipesFromCache()
    }
  },

  getRecipesFromCache: function () {
    const mockRecipes = [
      {
        id: uuid.v4(),
        name: 'Apple Pie',
        ingredients: ['apples', 'pie'],
        editing: false,
        expanded: false
      },
       {
         id: uuid.v4(),
         name: 'Cheese Pie',
         ingredients: ['cheese', 'pie'],
         editing: false,
         expanded: false
       }
    ];

    // If no sopport, for localStorage, just return the mockRecipes:
    if (!this.checkLocalStorageSupport()) {
      console.log('LS no support!');
      return mockRecipes
    } else {
      // Now that the support is ok, get the stored recipes, if stored:
      if (localStorage.recipes) {
        console.log("recipes alredy stored:" + JSON.parse(localStorage.recipes));
        return JSON.parse(localStorage.recipes);
      } else {
        // If no recipes stored already, it means it is the 1st time:
        //localStorage.recipes = JSON.stringify(mockRecipes);
        console.log('1st time LS store');
        this.setCache('recipes', mockRecipes);
        return mockRecipes;
      }
    }
  },

  setCache: function (key, value) {
    if (this.checkLocalStorageSupport()) {
      localStorage[key] = JSON.stringify(value);
    }
    console.log("ls changed:" + JSON.stringify(value));
  },

  checkLocalStorageSupport: function () {
    try {
      return ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
      return false;
    }
  },


  handleRecipeDelete: function (recipeId, event) {
    event.stopPropagation();

    this.setState({
      recipes: this.state.recipes.filter(recipe => recipe.id !== recipeId)
    }, function() {
      /* Updating the cache is done in the callback, once the state has been
         truly updated. Otherwise, the deleted recipe would still be there. */
      this.setCache('recipes', this.state.recipes);
    });
  },

  handleRecipeAdd: function (newRecipe) {
    this.setState({
      recipes: this.state.recipes.concat([newRecipe])
    }, function() {
      this.setCache('recipes', this.state.recipes);
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
      this.setCache('recipes', this.state.recipes);
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
