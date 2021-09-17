import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientsList from "./IngredientList"
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([])

  const addIngredientHandler = (ingredient) => {
    //setIngredients(ingredients.concat(ingredient))
    console.log(ingredient)
    setIngredients(prevState => ([...prevState, {id: Math.random().toString(), ...ingredient}]))

  }

  const removeIngredientHandler = (id) => {

  }

  console.log(ingredients)

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientsList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
