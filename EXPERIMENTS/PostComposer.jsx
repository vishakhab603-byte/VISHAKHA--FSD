import React, { useState } from "react";

function PostComposer() {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [fileName, setFileName] = useState("");

  const limits = {
    Twitter: 280,
    Facebook: 5000,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const handlePlatform = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const clearAll = () => {
    setPost("");
    setPlatforms([]);
    setFileName("");
  };

  return (
    <div className="composer">
      <h2>Create Post</h2>

      <textarea
        rows="6"
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      {/* Live Character Counter */}
      <p>
        <strong>Characters Typed:</strong> {post.length}
      </p>

      <h3>Select Platform</h3>

      {Object.keys(limits).map((platform) => (
        <label key={platform}>
          <input
            type="checkbox"
            checked={platforms.includes(platform)}
            onChange={() => handlePlatform(platform)}
          />
          {platform}
        </label>
      ))}

      <br />

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
          }
        }}
      />

      <p>
        <strong>Selected File:</strong>{" "}
        {fileName === "" ? "No file selected" : fileName}
      </p>

      <button onClick={clearAll}>Clear</button>

      <hr />

      {platforms.map((platform) => (
        <div key={platform}>
          <h4>{platform}</h4>

          <p>
            Characters : {post.length} / {limits[platform]}
          </p>

          {post.length <= limits[platform] ? (
            <p style={{ color: "green" }}>
              ✔ Valid Post
            </p>
          ) : (
            <p style={{ color: "red" }}>
              ✖ Character Limit Exceeded
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostComposer;