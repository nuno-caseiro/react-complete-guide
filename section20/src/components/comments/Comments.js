import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList"

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const { sendRequest, data: loadedComments, status } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addedCommentHandler = useCallback(()=>{
    sendRequest(params.quoteId);
  },[sendRequest, params.quoteId])

  let comments;

  if(status === 'pending'){
    comments = <div className='centered'><LoadingSpinner/></div>
  }

  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
    comments = <CommentsList comments={loadedComments}></CommentsList>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0 )){
    comments = <p className="centered">No comments were added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
