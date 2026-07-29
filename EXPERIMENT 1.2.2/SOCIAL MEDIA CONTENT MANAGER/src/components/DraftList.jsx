function DraftList({
  drafts,
  editDraft,
  deleteDraft,
  duplicateDraft,
}) {
  return (
    <div className="card">

      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No Drafts Available</p>
      ) : (
        drafts.map((draft, index) => (
          <div className="draftCard" key={index}>

            <h3>Draft #{index + 1}</h3>

            <p>
              <strong>Post</strong>
            </p>

            <p>{draft.post}</p>

            <hr />

            <p>
              <strong>Platforms:</strong>{" "}
              {draft.platforms.length > 0
                ? draft.platforms.join(", ")
                : "None"}
            </p>

            <p>
              <strong>Characters:</strong>{" "}
              {draft.post.length}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {draft.date}
            </p>

            {draft.image && (
              <img
                src={draft.image}
                alt="Preview"
                className="previewImage"
              />
            )}

            <div className="buttonGroup">

              <button
                className="edit"
                onClick={() => editDraft(index)}
              >
                ✏ Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteDraft(index)}
              >
                🗑 Delete
              </button>

              <button
                className="duplicate"
                onClick={() => duplicateDraft(index)}
              >
                📄 Duplicate
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default DraftList;