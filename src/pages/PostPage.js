import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://sparkle-spot-app-aws.onrender.com/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((postInfo) => {
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  if (!postInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            {/* ... (your existing SVG code) */}
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        {/* Use the cover image URL directly in the src attribute */}
        <img src={postInfo.cover} alt="" />
      </div>
      <div className="content">{postInfo.content}</div>
    </div>
  );
}
