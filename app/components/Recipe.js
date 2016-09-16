var React = require('react');
require('../main.scss');

var Recipe = function({recipe, onRecipeDelete, onToggleEditAndCollapse, onInputChange, onToggleExpand, onEnterCheck}) {

  return (
    <li className="recipe" onClick={onToggleEditAndCollapse.bind(null, recipe.id, false)}>

      {/* Display the recipe name (editing or non editing mode) */}
      {!recipe.editing ?
        <div className="recipe--title">
          <span>
            {recipe.name}
          </span>
        </div> :
        <div>
          <input
            className='recipe--title input-title'
            type='text'
            placeholder='add recipe name'
            autoFocus={true}
            value={recipe.name}
            onChange={onInputChange.bind(null, recipe.id, 'name')}
            onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)}
            onKeyPress={onEnterCheck.bind(null, recipe.id, 'name')}
             >
          </input>
        </div>
      }


      {recipe.expanded && (
        <div>
        {/* Display the ingredients (editing or non editing mode) */}
        <span className='recipe--label'>Ingredients:</span>
        <span className='recipe--ingredient-list'>
          {!recipe.editing ? (
            <ul className='recipe--ingredient-list'>
              {recipe.ingredients.map(ingredient =>
                <li className='recipe--ingredient' key={ingredient}>{ingredient}</li>
              )}
            </ul>
          ) : (
            <span>
              <input
                className='input-ingredients'
                type='text'
                placeholder='add ingredients'
                value={recipe.ingredients}
                onChange={onInputChange.bind(null, recipe.id, 'ingredients')}
                onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)}
                onKeyPress={onEnterCheck.bind(null, recipe.id, 'ingredients')}
                >
              </input>
            </span>
          )}
        </span>
        </div>
      )}


      <span className='recipe--right-side-buttons'>
        <img className='icon' src='images/edit.png' onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)} alt='edit icon'></img>
        <img className='icon' src='images/trash.png' onClick={onRecipeDelete.bind(null, recipe.id)} alt='trash icon'></img>
      </span>

    </li>
  )
};

module.exports = Recipe;
