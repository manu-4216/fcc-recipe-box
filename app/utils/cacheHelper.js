import uuid from 'uuid';

var helpers = {
  getRecipesFromCache: function () {
    const mockRecipes = [
      {
        id: uuid.v4(),
        name: 'Apple cake',
        ingredients: ['apples', 'cake'],
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
  }
};

module.exports = helpers;
