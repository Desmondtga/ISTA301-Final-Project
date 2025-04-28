const prompt = require("./prompt");
const fs = require("fs");
const { generateFrom } = require("./generateFrom.json");
const { authors } = require("./authors.json");

/**
 *
 * @returns {string}
 */
function getTodaysDate3025() {
  const today = new Date();
  const year = 3025;
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });

  return `${month} ${day}, ${year}`;
}

/**
 *
 * @returns {string}
 */
function getRandomAuthor() {
  const index = Math.floor(Math.random() * authors.length);
  return authors[index];
}

/**
 *
 * @param {string} topic
 * @param {string} title
 * @param {number} timeGenerated
 * @param {number} articleId
 * @returns {Promise<{
 *  title: string,
 *  author: string,
 *  date: string,
 *  coverImage: string,
 *  thumbnailImage: string,
 *  body: string
 *  tags: string[]
 * }>}
 */
async function generateArticle(topic, title, tags, timeGenerated, articleId) {
  const inputForBodyPrompt = `Pretend it is 3025. Write me the body of an article about ${topic}. The title of the article is "${title}" use p tags to separate the paragraphs.`;
  const inputForThumbnailImagePrompt = `Pretend it is 3025. Create an image to use as the thumbnail image for my article about ${topic}.`;
  const inputForCoverImagePrompt = `Pretend it is 3025. Create an image to use as the cover image for my article about ${topic}.`;

  const author = getRandomAuthor();
  const date = getTodaysDate3025();

  const thumbnailImagePromise = prompt.imagePrompt(
    inputForThumbnailImagePrompt,
    `${timeGenerated}ArticleThumbnail${articleId}.png`,
    "1:1"
  );
  const coverImagePromise = prompt.imagePrompt(
    inputForCoverImagePrompt,
    `${timeGenerated}ArticleCover${articleId}.png`,
    "16:9"
  );

  const bodyPromise = prompt.textPrompt(inputForBodyPrompt);

  return {
    title,
    author,
    date,
    thumbnailImage: await thumbnailImagePromise,
    coverImage: await coverImagePromise,
    body: await bodyPromise,
    tags,
  };
}

async function refreshFrontPage() {
  const timeGenerated = Date.now();
  const frontPageArticles = [];

  const articlePromises = [];

  var idx = 0;
  for (const { topic, title, tags } of generateFrom) {
    articlePromises.push(
      generateArticle(topic, title, tags, timeGenerated, idx)
    );
    idx++;
  }

  for (const promise of articlePromises) {
    frontPageArticles.push(await promise);
  }

  const jsonString = JSON.stringify(
    { frontPageArticles, timeGenerated },
    null,
    2
  ); // Convert to JSON string with indentation

  fs.writeFile("frontPageArticles.json", jsonString, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Done refreshing front page file");
    }
  });
}

/**
 *
 * @param {number} id
 * @returns {{
 *  title: string,
 *  author: string,
 *  date: string,
 *  coverImage: string,
 *  thumbnailImage: string,
 *  body: string
 *  tags: string[]
 * }}
 */
function getArticle(id) {
  const { frontPageArticles } = require("./frontPageArticles.json");

  return frontPageArticles[id];
}

/**
 *
 * @returns {previews :{
 *  title: string,
 *  coverImage: string,
 *  thumbnailImage: string,
 *  tags: string[]
 * }[]}
 */
function getFrontPageArticlePreviews() {
  const { frontPageArticles } = require("./frontPageArticles.json");

  const previews = frontPageArticles.map(
    ({ title, thumbnailImage, coverImage, tags }) => {
      return { title, thumbnailImage, coverImage, tags };
    }
  );

  return { previews };
}

module.exports.getArticle = getArticle;
module.exports.refreshFrontPage = refreshFrontPage;
module.exports.getFrontPageArticlePreviews = getFrontPageArticlePreviews;
