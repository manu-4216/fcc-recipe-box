import uuid from 'uuid';

var helpers = {
  getRecipesFromCache: function () {
    const mockRecipes = [
      {
        id: uuid.v4(),
        name: 'Blueberry cake',
        ingredients: ['blueberries', 'cake', 'milk'],
        imageUrl: 'http://images.bigoven.com/image/upload/t_recipe-256/besteverblueberrycoffeecake-dedc12.jpg',
        editing: false,
        expanded: false
      },
       {
         id: uuid.v4(),
         name: 'Apple Pie',
         ingredients: ['apples', 'pie crust', 'flour'],
         imageUrl: 'http://media-cache-ec0.pinimg.com/736x/e0/a1/b4/e0a1b42afab402274c09ad2fc53d25ee.jpg',
         editing: false,
         expanded: false
       },
       {
         id: uuid.v4(),
         name: 'Quinoa Salad',
         ingredients: ['quinoa', 'salad leafs', 'salt'],
         imageUrl: 'http://images.media-allrecipes.com/userphotos/720x405/1005880.jpg',
         editing: false,
         expanded: false
       }
    ];

    // If no sopport, for localStorage, just return the mockRecipes:
    if (!this.checkLocalStorageSupport()) {
      return mockRecipes
    } else {
      // Now that the support is ok, get the stored recipes, if stored:
      if (localStorage.recipes) {
        // First set 'expanded' to false:
        let recipes = JSON.parse(localStorage.recipes);
        recipes.map(recipe => {
          recipe.expanded = false;
          return recipe;
        });
        return recipes;
      } else {
        // If no recipes stored already, it means it is the 1st time:
        this.setCache('recipes', mockRecipes);
        return mockRecipes;
      }
    }
  },

  setCache: function (key, value) {
    if (this.checkLocalStorageSupport()) {
      localStorage[key] = JSON.stringify(value);
    }
  },

  checkLocalStorageSupport: function () {
    try {
      return ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
      return false;
    }
  }
};

module.exports = helpers;
