var React = require('react');
require('../main.scss');

var Recipe = function({recipe, onRecipeDelete, onActivateEdit, onInputChange}) {

  return (
    <li className="recipe" onClick={onActivateEdit.bind(null, 'all', false)}>

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
            onClick={onActivateEdit.bind(null, recipe.id, true)}
             >
          </input>
        </div>
      }

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
              onClick={onActivateEdit.bind(null, recipe.id, true)}
              >
            </input>
          </span>
        )}
      </span>

      <span className='recipe--right-side-buttons'>
        <img className='icon' src='images/edit.png' onClick={onActivateEdit.bind(null, recipe.id, true)} alt='edit icon'></img>
        <img className='icon' src='images/trash.png' onClick={onRecipeDelete.bind(null, recipe.id)} alt='trash icon'></img>
      </span>

    </li>
  )
};

module.exports = Recipe;
