import { SearchBar } from "../components/searchbar.js";
import { Filters } from "../components/filters.js";
import { RecipeCard } from "../components/recipeCard.js";

export function PageLayout() {
  const app = document.getElementById("app");

  const displayBanner = () => {
    const Banner = document.createElement("div");

    Banner.className =
      "bg-[url(all_assets/banner.png)] w-full h-[667px] bg-no-repeat bg-cover flex justify-center";

    Banner.innerHTML = `
        <img src="all_assets/logo.svg" alt="logo" class="w-[207px] absolute top-12 left-16">
        <div class="max-w-[66.667%] text-center flex justify-center items-center flex-col gap-[30px] mt-16">
          <h1 class="uppercase text-yellow text-[44px] font-anton max-w-2xl">Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuces</h1>
        </div>
      `;

    const searchBar = SearchBar();
    const bannerContent = Banner.querySelector("div");
    bannerContent.appendChild(searchBar);

    app.appendChild(Banner);
  };

  const displayMain = (allRecipes) => {
    /* *****************Filters***************** */

    const { ingredientsFilter, appliancesFilter, ustensilsFilter } =
      Filters(allRecipes);

    const FiltersArea = document.createElement("div");
    FiltersArea.className = "flex gap-[65px] mt-5 mx-[100px]";

    const Ingredients = document.createElement("div");
    Ingredients.appendChild(ingredientsFilter());
    FiltersArea.appendChild(Ingredients);

    const Appliances = document.createElement("div");
    Appliances.appendChild(appliancesFilter());
    FiltersArea.appendChild(Appliances);

    const Ustensils = document.createElement("div");
    Ustensils.appendChild(ustensilsFilter());
    FiltersArea.appendChild(Ustensils);

    app.appendChild(FiltersArea);

    /* *****************Recipes***************** */

    const AllRecipes = document.createElement("div");
    AllRecipes.className =
      "gap-x-[45px] gap-y-[65px] grid grid-cols-3 mt-14 mx-[100px]";

    allRecipes.forEach((recipe) => {
      AllRecipes.appendChild(RecipeCard(recipe));
    });

    app.appendChild(AllRecipes);
  };

  return { displayBanner, displayMain };
}
