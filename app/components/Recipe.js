var React = require('react');
var PropTypes = React.PropTypes;
require('../main.scss');

var Recipe = React.createClass({

  propTypes: {
    recipe: PropTypes.object.isRequired,
    recipe: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        ingredients: PropTypes.array,
        imageUrl: PropTypes.string,
        editing: PropTypes.bool,
        expanded: PropTypes.bool
      }),

    onRecipeDelete: PropTypes.func.isRequired,
    onToggleEditAndCollapse: PropTypes.func.isRequired,
    onEnterCheck: PropTypes.func.isRequired,
    onFinishEdit: PropTypes.func.isRequired
  },

  render: function () {

    var {recipe, onRecipeDelete, onToggleEditAndCollapse, onEnterCheck, onFinishEdit} = this.props;

    return (
      <li className="recipe" onClick={onToggleEditAndCollapse.bind(null, recipe.id, false)}>

        {/* Display the recipe image */}
        <img className='recipe--image' src={recipe.imageUrl}></img>

        {/* Display the recipe name (editing or non editing mode) */}
        {!recipe.editing ?
          <span className="recipe--title">
              {recipe.name}
          </span> :
          <span>
            <input
              className='recipe--title input-title'
              type='text'
              placeholder='add recipe name'
              autoFocus={true}
              defaultValue={recipe.name}
              onBlur={onFinishEdit.bind(null, recipe.id, 'name')}
              onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)}
              onKeyPress={onEnterCheck.bind(null, recipe.id, 'name')}
               >
            </input>
          </span>
        }

        {/* Display the expanded content: ingredients and imageUrl */}
        {recipe.expanded && (
          <div className="recipe--expanded-content">
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
                  placeholder='add ingredients separated by comma'
                  defaultValue={recipe.ingredients}
                  onBlur={onFinishEdit.bind(null, recipe.id, 'ingredients')}
                  onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)}
                  onKeyPress={onEnterCheck.bind(null, recipe.id, 'ingredients')}
                  >
                </input>
              </span>
            )}
          </span>

          {/* Display the imageUrl (editing or non editing mode) */}
          <div>
            <span className='recipe--label'>Image url:</span>
          {!recipe.editing ? (
            <span className='recipe--imageUrl'>
              {recipe.imageUrl}
            </span>
          ) : (
            <span>
              <input
                className='input-ingredients'
                type='text'
                placeholder='add image url'
                defaultValue={recipe.imageUrl}
                onBlur={onFinishEdit.bind(null, recipe.id, 'imageUrl')}
                onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)}
                onKeyPress={onEnterCheck.bind(null, recipe.id, 'imageUrl')}
                 >
              </input>
            </span>
          )
          }
          </div> {/* End of imageUrl div */}
          </div>
        )}


        <span className='recipe--right-side-buttons'>
          <img className='icon' src='images/edit.png' onClick={onToggleEditAndCollapse.bind(null, recipe.id, true)} alt='Edit'></img>
          <img className='icon' src='images/trash.png' onClick={onRecipeDelete.bind(null, recipe.id)} alt='Trash'></img>
        </span>

      </li>
    )
  }

});

module.exports = Recipe;
