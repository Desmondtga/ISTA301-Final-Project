const leftBanner = document.getElementById("left-banner");
const rightBanner = document.getElementById("right-banner");

async function main() {
  const urlParams = new URLSearchParams({ count: 4 });
  console.log(`${urlParams}`);
  const res = await fetch(`/api/ads/?${urlParams}`);
  const { ads } = await res.json();

  leftBanner.innerHTML = ads[0] + ads[1];
  rightBanner.innerHTML = ads[2] + ads[3];
}

main();
