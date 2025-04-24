console.log(":)");

fetch("/api/breaking").then((res) => {
  res.text().then((text) => {
    document.getElementById("breaking-news-title").innerHTML = text;
  });
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(queryString);
