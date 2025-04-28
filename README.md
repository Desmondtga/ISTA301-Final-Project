# ISTA301-Final-Project

### Group: Desmond Goodman-Ahearn, Matthew Ordaz, Michael Masenheimer, Jonathan Alvarez Contreras

![html, css, and js logos](https://github.com/[Desmondtga]/[ISTA301-Final-Project]/blob/[main]/imagesForReadme/htmlJsCss.png?raw=true)

## Summary of Project:

The title of this project is 'Dog Shit AI Slop Website'. The theme is a news website from the year 3025. This website utilizes AI to write slop articles about various topics. Ads on the site are both AI generated and created by hand. This project was built with HTML, JavaScript and Tailwind CSS.
The images are generated with Google imagen and the articles are generated with OpenAI gpt-4.1.

## Setting up the application

Make sure you have node and npm installed. To install all required dependencies run the command `npm i`.

## Running the application

To run this you will need an openai and a GoogleGenAI key.
Create a .env file in the root of this project and fill in the following values

```
OPEN_AI_KEY=*************
GEMINI_KEY=*************
```

Run the server with the command `node server.js`

The variable `refreshOnStart` in server.js determines if the articles are regenerated every time the server starts.

## Customizing the generated articles

Editing the file `generateFrom.json` will change the themes of the articles. To edit the list of authors that the articles may bre credited to, edit the file `authors.json`

## Screen shots

![screen shot 1](https://github.com/[Desmondtga]/[ISTA301-Final-Project]/blob/[main]/imagesForReadme/Screenshot2025-04-27at9.25.17 PM.png?raw=true)
![screen shot 2](https://github.com/[Desmondtga]/[ISTA301-Final-Project]/blob/[main]/imagesForReadme/Screenshot2025-04-27at9.25.53 PM.png?raw=true)
![screen shot 3](https://github.com/[Desmondtga]/[ISTA301-Final-Project]/blob/[main]/imagesForReadme/Screenshot2025-04-27at9.26.23 PM.png?raw=true)
![screen shot 4](https://github.com/[Desmondtga]/[ISTA301-Final-Project]/blob/[main]/imagesForReadme/Screenshot2025-04-27at9.27.02 PM.png?raw=true)
