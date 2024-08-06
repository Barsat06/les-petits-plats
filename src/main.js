import { SearchBar } from "./components/searchbar.js";

function displayBanner() {
  const app = document.getElementById("app");
  const banner = document.createElement("div");

  banner.className =
    "bg-[url(./public/banner.png)] w-full h-[667px] bg-no-repeat bg-cover flex justify-center";

  banner.innerHTML = `
    <img src="./public/logo.svg" alt="logo" class="w-[207px] absolute top-12 left-16">
    <div class="max-w-[66.667%] text-center flex justify-center items-center flex-col gap-[30px] mt-16">
      <h1 class="text-yellow text-[44px] font-anton max-w-2xl">CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES</h1>
    </div>
  `;

  const searchBar = SearchBar();
  const bannerContent = banner.querySelector("div");
  bannerContent.appendChild(searchBar);

  app.appendChild(banner);
}

function init() {
  try {
    displayBanner();
  } catch (error) {
    console.error(error);
  }
}

init();
