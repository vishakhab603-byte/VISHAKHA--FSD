import React, { useState, useEffect } from "react";

const limits = {
  Twitter: 280,
  Facebook: 5000,
  Instagram: 2200,
  LinkedIn: 3000,
};

function ContentManager() {
  const [post, setPost] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((p) => p !== platform)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const saveDraft = () => {
    if (post.trim() === "") {
      alert("Enter a post first");
      return;
    }

    const draft = {
      text: post,
      platforms: selectedPlatforms,
      fileName: fileName,
      image: preview,
      date: new Date().toLocaleString(),
    };

    if (editIndex === null) {
      setDrafts([...drafts, draft]);
    } else {
      const temp = [...drafts];
      temp[editIndex] = draft;
      setDrafts(temp);
      setEditIndex(null);
    }

    clearForm();
  };

  const editDraft = (index) => {
    const d = drafts[index];
    setPost(d.text);
    setSelectedPlatforms(d.platforms);
    setFileName(d.fileName);
    setPreview(d.image);
    setEditIndex(index);
  };

  const deleteDraft = (index) => {
    if (window.confirm("Delete this draft?")) {
      setDrafts(drafts.filter((_, i) => i !== index));
    }
  };

  const duplicateDraft = (index) => {
    setDrafts([...drafts, drafts[index]]);
  };

  const clearForm = () => {
    setPost("");
    setSelectedPlatforms([]);
    setFileName("");
    setPreview("");
  };

  const words = post.trim() === "" ? 0 : post.trim().split(/\s+/).length;
  const hashtags = (post.match(/#/g) || []).length;
  const mentions = (post.match(/@/g) || []).length;

  const filteredDrafts = drafts.filter((d) =>
    d.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <div className="left-panel">

        <div className="card">

          <h2>Create Post</h2>

          <textarea
            placeholder="Write your post..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <div className="counter">

            Characters : {post.length}

            <br />

            Words : {words}

            <br />

            Hashtags : {hashtags}

            <br />

            Mentions : {mentions}

          </div>

          <hr />

          <h3>Select Platforms</h3>

          <div className="platforms">

            {Object.keys(limits).map((platform) => (
              <label key={platform}>
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => togglePlatform(platform)}
                />
                {platform}
              </label>
            ))}

          </div>

          {selectedPlatforms.map((platform) => (

            <p
              key={platform}
              className={
                post.length <= limits[platform]
                  ? "green"
                  : "red"
              }
            >
              {platform} : {post.length}/{limits[platform]}{" "}
              {post.length <= limits[platform]
                ? "✔ Valid"
                : "✖ Limit Exceeded"}
            </p>

          ))}

          <hr />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
                setPreview(
                  URL.createObjectURL(e.target.files[0])
                );
              }
            }}
          />

          <p>
            <b>Selected File:</b>{" "}
            {fileName || "No File"}
          </p>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="preview"
            />
          )}

          <button className="save" onClick={saveDraft}>
            {editIndex === null
              ? "Save Draft"
              : "Update Draft"}
          </button>

          <button className="clear" onClick={clearForm}>
            Clear
          </button>

        </div>

      </div>

      <div className="right-panel">

        <div className="card">

          <h2>Dashboard</h2>

          <div className="stats">

            <div className="stat-box">
              <h2>{drafts.length}</h2>
              <p>Drafts</p>
            </div>

            <div className="stat-box">
              <h2>{post.length}</h2>
              <p>Characters</p>
            </div>

          </div>

          <hr />

          <input
            type="text"
            placeholder="Search drafts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="card">

          <h2>Saved Drafts</h2>

          {filteredDrafts.length === 0 ? (
            <p>No Drafts Found</p>
          ) : (
            filteredDrafts.map((draft, index) => (
              <div className="draft" key={index}>

                <p>
                  <b>{draft.date}</b>
                </p>

                <p>{draft.text}</p>

                <p>
                  Platforms :
                  {" "}
                  {draft.platforms.join(", ") || "None"}
                </p>

                <p>
                  File :
                  {" "}
                  {draft.fileName || "None"}
                </p>

                <button
                  className="edit"
                  onClick={() =>
                    editDraft(index)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() =>
                    deleteDraft(index)
                  }
                >
                  Delete
                </button>

                <button
                  className="duplicate"
                  onClick={() =>
                    duplicateDraft(index)
                  }
                >
                  Duplicate
                </button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default ContentManager;