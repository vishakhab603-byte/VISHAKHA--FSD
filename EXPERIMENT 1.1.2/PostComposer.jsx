import { useState, useEffect } from "react";
import PlatformSelector from "./PlatformSelector";
import MediaUploader from "./MediaUploader";

function PostComposer({ saveDraft, editData }) {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setPost(editData.post);
      setPlatforms(editData.platforms);
      setImage(editData.image);
    }
  }, [editData]);

  const words =
    post.trim() === "" ? 0 : post.trim().split(/\s+/).length;

  const hashtags = (post.match(/#/g) || []).length;

  const mentions = (post.match(/@/g) || []).length;

  const handleSave = () => {
    if (post.trim() === "") {
      alert("Please write something.");
      return;
    }

    saveDraft({
      post,
      platforms,
      image,
    });

    setPost("");
    setPlatforms([]);
    setImage(null);
  };

  const clearAll = () => {
    setPost("");
    setPlatforms([]);
    setImage(null);
  };

  return (
    <div className="card">

      <h2>Create Post</h2>

      <textarea
        rows="8"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div className="statsBox">

        <p><strong>Characters:</strong> {post.length}</p>

        <p><strong>Words:</strong> {words}</p>

        <p><strong>Hashtags:</strong> {hashtags}</p>

        <p><strong>Mentions:</strong> {mentions}</p>

      </div>

      <PlatformSelector
        post={post}
        platforms={platforms}
        setPlatforms={setPlatforms}
      />

      <MediaUploader
        image={image}
        setImage={setImage}
      />

      <button
        className="save"
        onClick={handleSave}
      >
        {editData ? "Update Draft" : "Save Draft"}
      </button>

      <button
        className="clear"
        onClick={clearAll}
      >
        Clear
      </button>

    </div>
  );
}

export default PostComposer;
