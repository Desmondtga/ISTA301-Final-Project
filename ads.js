const fs = require("fs");
const path = require("path");

var ads = [];

/**
 *
 * @returns {string[]}
 */
function loadAds() {
  const addPath = "./public_html/ads";

  fs.readdir(addPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(addPath, file);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }
        ads.push(data);
      });
    });
  });
}

/**
 *
 * @param {number} count
 * @returns {{ads: string[]}}
 */
function getAds(count) {
  if (count > ads.length) {
    count = ads.length;
  }

  return { ads: shuffleArrayCopy(ads) };
}

/**
 * @param {Array} array
 * @returns {Array}
 *
 */
function shuffleArrayCopy(array) {
  const copiedArray = [...array];
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
}

module.exports.getAds = getAds;
module.exports.loadAds = loadAds;
