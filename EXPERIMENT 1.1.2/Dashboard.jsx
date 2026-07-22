import { useState, useEffect } from "react";
import PostComposer from "./PostComposer";
import DraftList from "./DraftList";
import Analytics from "./Analytics";
import SearchBar from "./SearchBar";
import Toast from "./Toast";

function Dashboard() {
  const [drafts, setDrafts] = useState([]);
  const [currentDraft, setCurrentDraft] = useState(null);
  const [search, setSearch] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    const savedDrafts =
      JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(savedDrafts);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const saveDraft = (draft) => {
    if (currentDraft === null) {
      setDrafts([
        ...drafts,
        {
          ...draft,
          date: new Date().toLocaleString(),
        },
      ]);

      setToastMessage("Draft Saved Successfully");
    } else {
      const updated = [...drafts];

      updated[currentDraft] = {
        ...draft,
        date: drafts[currentDraft].date,
      };

      setDrafts(updated);

      setCurrentDraft(null);

      setToastMessage("Draft Updated Successfully");
    }

    setToastType("success");
    setShowToast(true);
  };

  const editDraft = (index) => {
    setCurrentDraft(index);

    setToastMessage("Editing Draft");
    setToastType("info");
    setShowToast(true);
  };

  const deleteDraft = (index) => {
    setDrafts(
      drafts.filter((_, i) => i !== index)
    );

    setToastMessage("Draft Deleted");
    setToastType("error");
    setShowToast(true);
  };

  const duplicateDraft = (index) => {
    const copy = {
      ...drafts[index],
      date: new Date().toLocaleString(),
    };

    setDrafts([...drafts, copy]);

    setToastMessage("Draft Duplicated");
    setToastType("info");
    setShowToast(true);
  };

  const filteredDrafts = drafts.filter((draft) =>
    draft.post
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <div className="left">

        <PostComposer
          saveDraft={saveDraft}
          editData={
            currentDraft !== null
              ? drafts[currentDraft]
              : null
          }
        />

      </div>

      <div className="right">

        <Analytics drafts={drafts} />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <DraftList
          drafts={filteredDrafts}
          editDraft={editDraft}
          deleteDraft={deleteDraft}
          duplicateDraft={duplicateDraft}
        />

      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
}

export default Dashboard;