import React from "react";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";

const PostsListing = ({ title, postId, comments }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>


          <CreateComment postId={postId} comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default PostsListing;
