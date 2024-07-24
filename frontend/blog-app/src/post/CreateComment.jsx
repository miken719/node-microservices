import { useEffect, useState } from "react";
import CommentList from "./CommentList";

const CreateComment = ({ postId, comments }) => {
    const [content, setContent] = useState("");


    const handleSubmitContent = async (e) => {
        e.preventDefault();
        if (content) {
            let body = { content };
            try {
                const api = await fetch(
                    `http://localhost:4000/posts/${postId}/comments`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    }
                );
                const data = api.json();
                console.log(data);

                setContent("");
            } catch (err) {
                console.log("Error into creating content", err);
            }
        }
    };


    return (
        <>
            <CommentList comments={comments} />
            <div>
                <form onSubmit={handleSubmitContent}>
                    <div className="form-group">
                        <label>New Content</label>
                        <input
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </>
    );
};

export default CreateComment;
