import { useReducer, useCallback } from "react";

const initialState =  {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
  }

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, data:null, extra: null, identifier: action.identifier  };
    case "RESPONSE":
      return { ...currHttpState, loading: false, data: action.responseData, extra: action.extra};
    case "ERROR":
      return { loading: false, error: action.errorMsg };
    case "CLEAR":
      return initialState
    default:
      throw new Error("Should not reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
      dispatchHttp({type: "CLEAR"})
  }, [])

  const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
      console.log("DISPATCH", reqIdentifier)
    dispatchHttp({ type: "SEND", identifier: reqIdentifier});
    fetch(
      url,
      {
        method:method,
        body: body,
        headers: {'Content-Type':'application/json'}
      }
    )
      .then((res) => {
          return res.json()

      }).then(responseData => {
          dispatchHttp({type: 'RESPONSE', responseData: responseData, extra: reqExtra})
      })
      .catch((err) => {
        dispatchHttp({ type: "ERROR", errorMsg: "Something went wrong!" });
      });
  },[]);

  return {loading: httpState.loading, data: httpState.data, error: httpState.error, sendRequest: sendRequest, reqExtra: httpState.extra, reqIdentifier: httpState.identifier, clear: clear}
};

export default useHttp;