import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    // Check if a file is selected
    if (!files[0]) {
      console.error("Please select a file.");
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    try {
      const response = await fetch(
        "https://sparkle-spot-app-aws.onrender.com/post",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );

      if (response.ok) {
        // Redirect to the newly created post page instead of the homepage
        setRedirect(true);
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  if (redirect) {
    // Redirect to the newly created post page with its ID
    return <Navigate to={"/post/:new_post_id"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  );
}
