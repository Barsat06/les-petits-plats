import { RecipeCard } from "./recipeCard.js";

export function research(allRecipes, searchingValue) {
  const main = document.getElementById("app");
  const AllRecipes = main.lastElementChild;
  AllRecipes.innerHTML = "";

  const loweredSearchingValue = searchingValue.toLowerCase();
  let goodRecipes = [];
  let wrongRecipes = [];

  allRecipes.forEach((recipe) => {
    const recipeTitle = recipe.name.toLowerCase();

    if (recipeTitle.includes(loweredSearchingValue)) {
      goodRecipes.push(recipe);
    } else {
      wrongRecipes.push(recipe);
    }
  });

  let goodIds = [];
  wrongRecipes.forEach((recipe) => {
    recipe.ingredients.some((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();

      if (ingredientName.includes(loweredSearchingValue)) {
        goodRecipes.push(recipe);

        goodIds.push(recipe.id);

        return true;
      }
    });
  });

  wrongRecipes = wrongRecipes.filter((recipe) => !goodIds.includes(recipe.id));

  wrongRecipes.forEach((recipe) => {
    const loweredDescription = recipe.description.toLowerCase();

    if (loweredDescription.includes(loweredSearchingValue)) {
      goodRecipes.push(recipe);
    }
  });

  if (goodRecipes.length === 0) {
    const noResult = document.createElement("p");
    noResult.innerText = `Aucune recette ne contient '${searchingValue}' vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    noResult.className = "text-[26px] w-[685px]";

    AllRecipes.appendChild(noResult);
  }

  goodRecipes.forEach((recipe) => {
    AllRecipes.appendChild(RecipeCard(recipe));
  });
}
