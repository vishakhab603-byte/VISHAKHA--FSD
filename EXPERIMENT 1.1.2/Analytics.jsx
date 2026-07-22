function Analytics({ drafts }) {

  const totalDrafts = drafts.length;

  const totalCharacters = drafts.reduce(
    (sum, draft) => sum + draft.post.length,
    0
  );

  const averageCharacters =
    totalDrafts === 0
      ? 0
      : Math.round(totalCharacters / totalDrafts);

  const longestPost =
    totalDrafts === 0
      ? 0
      : Math.max(...drafts.map((draft) => draft.post.length));

  const platformCount = {};

  drafts.forEach((draft) => {
    draft.platforms.forEach((platform) => {
      platformCount[platform] =
        (platformCount[platform] || 0) + 1;
    });
  });

  let mostUsedPlatform = "None";
  let max = 0;

  Object.keys(platformCount).forEach((platform) => {
    if (platformCount[platform] > max) {
      max = platformCount[platform];
      mostUsedPlatform = platform;
    }
  });

  return (
    <div className="card">

      <h2>Analytics Dashboard</h2>

      <div className="stats">

        <div className="stat-box">
          <h2>{totalDrafts}</h2>
          <p>Total Drafts</p>
        </div>

        <div className="stat-box">
          <h2>{totalCharacters}</h2>
          <p>Total Characters</p>
        </div>

        <div className="stat-box">
          <h2>{averageCharacters}</h2>
          <p>Average Length</p>
        </div>

        <div className="stat-box">
          <h2>{longestPost}</h2>
          <p>Longest Post</p>
        </div>

      </div>

      <hr />

      <h3>Most Used Platform</h3>

      <p>{mostUsedPlatform}</p>

    </div>
  );
}

export default Analytics;