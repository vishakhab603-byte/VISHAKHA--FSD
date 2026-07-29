function SearchBar({ search, setSearch }) {
  return (
    <div className="card">

      <h2>Search Drafts</h2>

      <input
        type="text"
        placeholder="Search by post..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;