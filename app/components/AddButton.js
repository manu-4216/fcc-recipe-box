var React = require('react');
var PropTypes = React.PropTypes;
import uuid from 'uuid';
require('../main.scss');

// I had to use createClass instead of a function, because of compatibility with react-flip-move 
var AddButton = React.createClass({
  propTypes: {
    onRecipeAdd: PropTypes.func.isRequired
  },

  render: function () {
    const newRecipe = {
      id: uuid.v4(),
      name: 'New Recipe',
      ingredients: [],
      imageUrl:'',
      editing: true,
      expanded: true
    };

    let onRecipeAdd = this.props.onRecipeAdd;

    return (
      <div className='add-button-band'>
        <button className='add-button-icon' onClick={onRecipeAdd.bind(null, newRecipe)}>
          +
        </button>
      </div>
    )
  }

});

module.exports = AddButton;
