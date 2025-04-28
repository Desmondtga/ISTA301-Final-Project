const openai = require("openai");
require("dotenv").config();
const fs = require("fs");

const openAiClient = new openai.OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

/**
 *
 * @param {string} input
 * @returns {Promise<string>}
 */
async function textPrompt(input) {
  const response = await openAiClient.responses.create({
    model: "gpt-4.1",
    input,
  });
  return response.output_text;
}

/**
 *
 * @param {string} input
 * @param {string} fileName
 * @param {"1:1" | "9:16" | "16:9" | "3:4" | "4:3"} aspectRatio
 * @returns {Promise<string>}
 */
async function imagePrompt(input, fileName, aspectRatio) {
  const response = await ai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt: input,
    config: {
      numberOfImages: 1,
      aspectRatio,
    },
  });

  const generatedImage = response.generatedImages[0];
  let imgBytes = generatedImage.image.imageBytes;
  const buffer = Buffer.from(imgBytes, "base64");
  fs.writeFileSync(`./public_html/images/generated/${fileName}`, buffer);
  return `/images/generated/${fileName}`;
}

module.exports.textPrompt = textPrompt;
module.exports.imagePrompt = imagePrompt;
