import React, { useState, useEffect, useRef } from "react";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const filterInputRef = useRef();

  const { loading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (enteredFilter === filterInputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        sendRequest(
          "https://react-complete-guide-bc77b-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json" +
            query,
          "GET"
        );      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [enteredFilter, filterInputRef, sendRequest]);

  useEffect(() => {
    if (!loading && data && !error) {
      const loadedIngredients = [];

      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, loading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input
            ref={filterInputRef}
            type="text"
            onChange={(event) => {
              return setEnteredFilter(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
