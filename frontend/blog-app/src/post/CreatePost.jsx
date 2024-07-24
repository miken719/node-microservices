import React, { useEffect, useState } from "react";
import PostsListing from "./PostsListing";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const api = await fetch("http://localhost:4002/posts", { method: "GET" });
      const data = await api.json();
      setPostData(data?.posts);
    } catch (err) {
      console.log("Error on retriving posts");
    }
  };

  console.log(postData, "postData");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      let body = { title };
      try {
        const api = await fetch("http://localhost:8080/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        console.log(JSON.stringify(body), "enter");
        const data = await api.json();

        fetchPosts();
        setTitle("");
        console.log(data, "datadata");
      } catch (err) {
        console.log(err, "Error on creating post");
      }
    }
  };
  return (
    <>
      <div className="card my-4">
        <div className="card-body">
          <h5 className="card-title">Create a New Post</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"

            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        {postData && Object.values(postData)?.length > 0 &&
          Object.values(postData)?.map((data, index) => {
            console.log(data, "datadata");
            return (
              data?.title && (
                <>
                  <PostsListing key={index} title={data?.title} postId={data?.id} comments={data?.comment} />
                </>
              )
            );
          })}
      </div>
    </>
  );
};

export default CreatePost;
