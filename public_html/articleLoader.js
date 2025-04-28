const title = document.getElementById("title");
const authorDate = document.getElementById("author-date");
const image = document.getElementById("image");
const body = document.getElementById("article-content");
const tags = document.getElementById("tags");

function tagify(tag) {
  return `<span class="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded"
            >#${tag}</span
          >`;
}

async function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const res = await fetch(`/api/article/${id}`);
  const article = await res.json();

  title.innerText = article.title;
  authorDate.innerText = `By ${article.author}· ${article.date}`;
  image.src = article.coverImage;
  body.innerHTML = article.body;
  tags.innerHTML = article.tags.map(tagify).join("");
}

main();
