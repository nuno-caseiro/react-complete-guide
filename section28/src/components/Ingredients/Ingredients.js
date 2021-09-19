import React, { useEffect, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientsList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

//current ingredients or state
const ingredientsReducer = (currentsIngredients, action) => {
  switch (action.type) {
    case "SET":
      console.log(action.ingredients)
      return action.ingredients;
    case "ADD":
      return [...currentsIngredients, action.ingredient];
    case "DELETE":
      return currentsIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const { loading, error, data, sendRequest, reqExtra, reqIdentifier, clear } =
    useHttp();


  useEffect(() => {
    if (!loading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!loading && !error && reqIdentifier === "ADD_INGREDIENT") {
      console.log(data);
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, loading, reqExtra, reqIdentifier, error]);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        "https://react-complete-guide-bc77b-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const loadFilteredIngredients = useCallback((loadedIngredients) => {
    //setIngredients(loadedIngredients);
    dispatch({ type: "SET", ingredients: loadedIngredients });
  }, []);

  const removeIngredientHandler = useCallback(
    (id) => {
      sendRequest(
        `https://react-complete-guide-bc77b-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
        "DELETE",
        null,
        id,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  //   const ingredientList = useMemo(() => <IngredientsList
  //   ingredients={userIngredients}
  //   onRemoveItem={removeIngredientHandler}
  // />, [userIngredients,removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={loading}
      />

      <section>
        <Search onLoadIngredients={loadFilteredIngredients} />
        <IngredientsList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
