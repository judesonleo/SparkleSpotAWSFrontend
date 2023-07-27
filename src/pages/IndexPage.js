import React, { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://sparkle-spot-app-aws.onrender.com/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post._id}
            {...post}
            coverUrl={post.cover} // Use post.cover directly as it already contains the full URL
          />
        ))}
    </>
  );
}
