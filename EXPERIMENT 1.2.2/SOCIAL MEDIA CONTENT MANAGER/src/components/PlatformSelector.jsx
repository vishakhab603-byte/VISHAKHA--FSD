const limits = {
  Twitter: 280,
  Facebook: 5000,
  Instagram: 2200,
  LinkedIn: 3000,
};

function PlatformSelector({ post, platforms, setPlatforms }) {

  const handlePlatform = (platform) => {

    if (platforms.includes(platform)) {

      setPlatforms(
        platforms.filter((item) => item !== platform)
      );

    } else {

      setPlatforms([...platforms, platform]);

    }

  };

  return (

    <div className="platformCard">

      <h3>Select Platforms</h3>

      {Object.keys(limits).map((platform) => (

        <div key={platform} className="platformRow">

          <label>

            <input
              type="checkbox"
              checked={platforms.includes(platform)}
              onChange={() => handlePlatform(platform)}
            />

            {platform}

          </label>

          {platforms.includes(platform) && (

            <span
              className={
                post.length <= limits[platform]
                  ? "valid"
                  : "invalid"
              }
            >

              {post.length}/{limits[platform]}

              {post.length <= limits[platform]
                ? " ✔ Valid"
                : " ✖ Limit Exceeded"}

            </span>

          )}

        </div>

      ))}

    </div>

  );

}

export default PlatformSelector;