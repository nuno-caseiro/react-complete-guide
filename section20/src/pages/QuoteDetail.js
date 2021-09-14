import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, Route, useRouteMatch } from "react-router";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const {quoteId} = params

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

  useEffect(()=>{
      sendRequest(quoteId)
  },[sendRequest, quoteId])

  if(status === 'pending'){
      <div className="centered"><LoadingSpinner/> </div>
  }

  if(error){
      return <p className="centered">{error}</p>
  }

  if (!loadedQuote) {
    return <p>No quote found</p>
  }

  return (
    <Fragment>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      ></HighlightedQuote>
      <Route path={match.path}>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments/>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
