import { Recipes } from "../modules/recipes.js";

export function RecipesNumber() {
  const FiltersAndNumber = document.getElementById("filtersAndNumber");
  let recipesNumberDiv = document.getElementById("recipesNumberDiv");

  if (recipesNumberDiv !== null) {
    recipesNumberDiv.remove();
  }

  recipesNumberDiv = document.createElement("div");
  recipesNumberDiv.id = "recipesNumberDiv";
  recipesNumberDiv.className = "flex font-anton text-[21px] max-h-14";

  recipesNumberDiv.innerHTML = `
    <p class="flex items-center">${
      Recipes.getFilteredRecipes().length
    } recettes</p>
  `;

  FiltersAndNumber.appendChild(recipesNumberDiv);
}
