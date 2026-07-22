import { useState } from "react";

function MediaUploader({ image, setImage }) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFileName(file.name);

      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setFileName("");
  };

  return (
    <div className="card">
      <h3>Upload Image</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      <p>
        <strong>Selected File:</strong>{" "}
        {fileName || "No file selected"}
      </p>

      {image && (
        <>
          <img
            src={image}
            alt="Preview"
            className="previewImage"
          />

          <button
            className="delete"
            onClick={removeImage}
          >
            Remove Image
          </button>
        </>
      )}
    </div>
  );
}

export default MediaUploader;