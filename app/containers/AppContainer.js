var React = require('react');
var RecipeList = require('../components/RecipeList');
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

  // Activate (and deactivate) 'editing' mode and 'collapsed' mode for recipes:
  handleToggleEditAndCollapse: function (recipeId, newEditingState, event) {
    event.stopPropagation();

    // First updates the 'expanded' property:
    //  -a. EXPAND If: !expanded:
    if (!this.getRecipeValueById(recipeId, 'expanded')) {
      this.setRecipePropertyById(recipeId, 'expanded', true);
    //  -b. COLLAPSE If: expanded && !newEditingState && !editing:
  } else if (this.getRecipeValueById(recipeId, 'expanded')
          && !(newEditingState)
          && !(this.getRecipeValueById(recipeId, 'editing'))) {
        this.setRecipePropertyById(recipeId, 'expanded', false);
    }

    // Updates the 'editing' property:
    /* -a. first change the active recipe to 'editing' = newEditingState:
     *      - false: if click on the recipe itself (outside 'edit' or input fields)
     *      - true: if click on the 'edit' btn or an input field
     */
    this.setRecipePropertyById(recipeId, 'editing', newEditingState);

    /*  -b. Then change 'editing' to false for all the other recipes. This way,
     *      there will be no 2 recipes both being edited at the same time.
     */
    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if (recipe.id !== recipeId ) {
          this.setRecipePropertyById(recipe.id, 'editing', false);
        }
        return recipe;
      })
    }, function() {
      cacheHelper.setCache('recipes', this.state.recipes);
    });
  },

  // Returns the value of a recipe 'property' (eg. editing or expanded), with a given 'id' :
  getRecipeValueById: function (id, prop) {
    let targetedRecipeWithId = this.state.recipes.filter(recipe => {
      return (recipe.id === id);
    })[0];

    return targetedRecipeWithId[prop];
  },

  setRecipePropertyById: function (recipeId, prop, value) {
    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if (recipe.id === recipeId) {
          recipe[prop] = value;
        }
        return recipe;
      })
    })
  },


  // Checks if 'Enter' key has been pressed.
  handleEnterCheck: function (recipeId, field, event) {
    if (event.key === 'Enter') {
      // Disable the 'editing' state of the field:
      this.setRecipePropertyById(recipeId, 'editing', false);
      this.handleFinishEdit(recipeId, field, event);
    }
  },

  // This is called 'onBlur' or when pressing Enter:
  handleFinishEdit : function (recipeId, field, event) {
    event.stopPropagation();

    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if (recipe.id === recipeId) {
          if (field === 'name' || field === 'imageUrl') {
            recipe[field] = event.target.value;
          } else if (field === 'ingredients') {
            // Transform the input field 'text1,text2' from a string to an array ['text1', 'text2']:
            let ingredientsArray = event.target.value.split(',');
            recipe.ingredients = ingredientsArray;
          }
        }
        return recipe;
      })
    }, function() {
      cacheHelper.setCache('recipes', this.state.recipes);
    });
  },


  render: function () {
    return (
      <div>
        <div className='header--title'>Recipe Box</div>
        <RecipeList
          recipes={this.state.recipes}
          onRecipeDelete={this.handleRecipeDelete}
          onToggleEditAndCollapse={this.handleToggleEditAndCollapse}
          onEnterCheck={this.handleEnterCheck}
          onFinishEdit={this.handleFinishEdit}
          onRecipeAdd={this.handleRecipeAdd}
          />
      </div>
    )
  }
});

module.exports = AppContainer;
