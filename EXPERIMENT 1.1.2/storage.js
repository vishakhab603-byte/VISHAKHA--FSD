export const loadDrafts = () => {
  return JSON.parse(localStorage.getItem("drafts")) || [];
};

export const saveDrafts = (drafts) => {
  localStorage.setItem("drafts", JSON.stringify(drafts));
};