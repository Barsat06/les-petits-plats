import { Recipes } from "../modules/recipes.js";
import { RecipeCard } from "./recipeCard.js";

export function SearchBar(originalRecipes) {
  const { filterByInput } = Recipes(originalRecipes);

  const searchBar = document.createElement("form");
  searchBar.className = "h-[75px] relative";

  searchBar.innerHTML = `
  <input 
      type="search"
      name="search"
      placeholder="Rechercher une recette, un ingrédient, ..."
      class="w-[950px] h-[75px] text-lg p-9 text-grey placeholder:text-grey font-normal rounded-xl"
  />
  <div class="absolute right-[10px] top-[10px] w-[55px] h-[55px] rounded-xl">
    <button label="search" type="submit" aria-label="Rechercher" class="bg-black w-[55px] h-[55px] rounded-xl text-white text-[26px] hover:bg-yellow"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
  `;

  const inputElement = searchBar.querySelector('input[name="search"]');

  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const clearButton = document.querySelector("#x");

    const filterdRecipes = filterByInput(inputValue);

    clearAndCreateRecipes(filterdRecipes, inputValue);

    if (clearButton === null) {
      const xmark = document.createElement("div");
      xmark.id = "x";
      xmark.className =
        "text-grey absolute right-[80px] top-[15px] w-[25px] h-[25px] text-[30px]";
      xmark.role = "button";
      xmark.ariaLabel = "Effacer";
      xmark.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      xmark.addEventListener("click", () => {
        clearAndCreateRecipes(originalRecipes, inputValue);
        clearInputField();
      });

      searchBar.appendChild(xmark);
    }
    if (inputValue === "") {
      clearInputField();
    }
  });

  const clearAndCreateRecipes = (recipes, inputValue) => {
    const main = document.getElementById("app");
    const recipesDOM = main.lastElementChild;
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
  };

  const clearInputField = () => {
    const inputElement = document.querySelector('input[name="search"]');
    inputElement.value = "";
    const clearButton = document.querySelector("#x");
    clearButton.remove();
  };

  return searchBar;
}
