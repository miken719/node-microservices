

const CommentList = ({ comments }) => {
    const renderComments =
        comments?.length > 0 && comments.map((data) => <li>{data?.content}</li>);
    return <ul>{renderComments}</ul>;
};

export default CommentList;
