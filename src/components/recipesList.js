import { RecipeCard } from "./recipeCard.js";

export function RecipesList(recipes, inputValue) {
  console.log("Recttes", recipes);

  const app = document.getElementById("app");
  const recipesDOM = app.lastElementChild;
  recipesDOM.innerHTML = "";

  if (recipes.length === 0) {
    const noResult = document.createElement("p");
    noResult.innerText = `Aucune recette ne contient '${inputValue}' vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    noResult.className = "text-[26px] w-[685px]";

    recipesDOM.appendChild(noResult);
  }

  recipes.forEach((recipe) => {
    recipesDOM.appendChild(RecipeCard(recipe));
  });
}
