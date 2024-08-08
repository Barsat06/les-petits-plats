import { SearchBar } from "./components/searchbar.js";
import { getAllRecipes } from "./services/recipes.js";
import { RecipeCard } from "./components/recipeCard.js";

function displayBanner() {
  const app = document.getElementById("app");
  const banner = document.createElement("div");

  banner.className =
    "bg-[url(./public/banner.png)] w-full h-[667px] bg-no-repeat bg-cover flex justify-center";

  banner.innerHTML = `
    <img src="./public/logo.svg" alt="logo" class="w-[207px] absolute top-12 left-16">
    <div class="max-w-[66.667%] text-center flex justify-center items-center flex-col gap-[30px] mt-16">
      <h1 class="uppercase text-yellow text-[44px] font-anton max-w-2xl">Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuces</h1>
    </div>
  `;

  const searchBar = SearchBar();
  const bannerContent = banner.querySelector("div");
  bannerContent.appendChild(searchBar);

  app.appendChild(banner);
}

function displayRecipes(allRecipes) {
  const app = document.getElementById("app");
  const AllRecipes = document.createElement("div");
  AllRecipes.className = "mx-[100px] gap-x-[45px] gap-y-[65px] grid grid-cols-3"

  allRecipes.forEach((recipe) => {
    AllRecipes.appendChild(RecipeCard(recipe));
  });

  app.appendChild(AllRecipes);
}

async function init() {
  try {
    displayBanner();
    const allRecipes = await getAllRecipes();
    displayRecipes(allRecipes.recipes);
  } catch (error) {
    console.error(error);
  }
}

init();
