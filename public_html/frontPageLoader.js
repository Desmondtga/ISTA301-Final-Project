async function main() {
  const res = await fetch(`/api/previews`);
  const { previews } = await res.json();

  var idx = 0;
  previews.forEach(({ title, thumbnailImage, coverImage, tags }) => {
    if (idx === 0) {
      const imageElement = document.getElementById("articlePreviewImage0");
      imageElement.src = coverImage;

      const titleElement = document.getElementById("articlePreviewTitle0");
      titleElement.innerText = title;
    } else {
      const imageElement = document.getElementById(`articlePreviewImage${idx}`);
      imageElement.src = thumbnailImage;

      const titleElement = document.getElementById(`articlePreviewTitle${idx}`);
      titleElement.innerText = title;
    }

    idx++;
  });
}

main();
