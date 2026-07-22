export const platformLimits = {
  Twitter: 280,
  Facebook: 5000,
  Instagram: 2200,
  LinkedIn: 3000,
};

export const isValidPost = (platform, length) =>
  length <= platformLimits[platform];