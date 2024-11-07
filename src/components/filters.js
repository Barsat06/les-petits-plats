import { Recipes } from "../modules/recipes.js";
import { RecipesList } from "./recipesList.js";
import { Tags } from "./tags.js";
import { ReloadFilters } from "../utils/reloadFilters.js";

export function Filters() {
  let ingredientsArray = [];
  let appliancesArray = [];
  let ustensilsArray = [];

  const filteredRecipes = Recipes.getFilteredRecipes();

  console.log(filteredRecipes);

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsArray.push(ingredient.ingredient);
    });
    appliancesArray.push(recipe.appliance);
    recipe.ustensils.forEach((ustensil) => {
      ustensilsArray.push(ustensil);
    });
  });

  const unduplicatedIngredientsArray = [...new Set(ingredientsArray)];
  unduplicatedIngredientsArray.sort((a, b) => a.localeCompare(b));

  const unduplicatedAppliancesArray = [...new Set(appliancesArray)];
  unduplicatedAppliancesArray.sort((a, b) => a.localeCompare(b));

  const unduplicatedUstensilsArray = [...new Set(ustensilsArray)];
  unduplicatedUstensilsArray.sort((a, b) => a.localeCompare(b));

  const FiltersDiv = document.createElement("div");
  FiltersDiv.id = "filtersDiv";
  FiltersDiv.className = "mt-5 mx-[100px]";

  const FiltersArea = document.createElement("div");
  FiltersArea.id = "filtersArea";
  FiltersArea.className = "flex gap-[65px]";

  const Ingredients = document.createElement("div");
  Ingredients.appendChild(Filter("Ingrédients", unduplicatedIngredientsArray));
  FiltersArea.appendChild(Ingredients);

  const Appliances = document.createElement("div");
  Appliances.appendChild(Filter("Appareils", unduplicatedAppliancesArray));
  FiltersArea.appendChild(Appliances);

  const Ustensils = document.createElement("div");
  Ustensils.appendChild(Filter("Ustensiles", unduplicatedUstensilsArray));
  FiltersArea.appendChild(Ustensils);

  FiltersDiv.appendChild(FiltersArea);

  return FiltersDiv;
}

function Filter(filterName, filterData) {
  const filterList = (elementArray) => {
    const List = document.createElement("div");
    List.className = "flex flex-col mt-6 max-h-52 overflow-auto";

    elementArray.forEach((element) => {
      const elementButton = document.createElement("button");
      elementButton.className =
        "text-left first-letter:capitalize hover:bg-yellow text-base pl-4 pr-4 pb-2 pt-2";
      elementButton.title = element;
      elementButton.textContent = element;

      elementButton.addEventListener("click", () => {
        Recipes.filterByTag(element);

        RecipesList(Recipes.getFilteredRecipes(), "vos tags");

        ReloadFilters(Recipes.getFilteredRecipes());

        Tags(Recipes.getTags());

        clearInputField();
      });

      List.appendChild(elementButton);
    });

    return List;
  };

  const filterDOM = document.createElement("div");
  filterDOM.className =
    "bg-white rounded-xl p-4 shadow-cardShadow w-48 relative";
  filterDOM.innerHTML = `
  <button class="font-medium">${filterName} <span id="arrow" class="absolute right-4"><i class="fa-solid fa-angle-down"></i></span></button>
  <div id="filterList" class="hidden absolute z-20 bg-inherit left-0 pt-4 pb-4 rounded-b-xl">
    <div class="relative">
      <input 
        type="text"
        name="${filterName}"
        class="border-solid border border-lightGrey h-9 text-grey font-normal rounded-sm w-40 ml-4 mr-4"
      />
      <div class="absolute right-6 top-[7.5px] rounded-xl">
        <div type="submit" aria-label="Rechercher par ${filterName}" class="text-grey text-base"><i class="fa-solid fa-magnifying-glass"></i></div>
      </div>
    </div>
  </div>  
  `;
  const filterContent = filterDOM.lastElementChild;

  const inputElement = filterDOM.querySelector(
    "input[name=" + filterName + "]"
  );

  filterContent.appendChild(filterList(filterData));
  filterDOM.querySelector("input").addEventListener("input", (e) => {
    filterContent.lastChild.remove();
    filterContent.appendChild(
      filterList(Recipes.filterSearchBar(e.target.value, filterData))
    );
  });

  filterDOM.firstElementChild.addEventListener("click", () => {
    filterContent.classList.toggle("hidden");
    inputElement.focus();
    filterDOM.querySelector("#arrow").innerHTML =
      filterContent.classList.contains("hidden")
        ? "<i class='fa-solid fa-angle-down'></i>"
        : "<i class='fa-solid  fa-angle-up'></i>";
  });

  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const clearButton = document.querySelector("#x" + filterName);

    if (clearButton === null) {
      const xmark = document.createElement("div");
      xmark.id = "x" + filterName;
      xmark.className = "text-grey absolute right-11 top-2.5 text-sm";
      xmark.role = "button";
      xmark.ariaLabel = "Effacer";
      xmark.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      xmark.addEventListener("click", () => {
        clearInputField();
      });

      inputElement.parentElement.appendChild(xmark);
    }
    if (inputValue === "") {
      clearInputField();
    }
  });

  const clearInputField = () => {
    inputElement.value = "";
    filterContent.lastChild.remove();

    filterContent.appendChild(
      filterList(Recipes.filterSearchBar("", filterData))
    );
    const clearButton = document.querySelector("#x" + filterName);

    if (clearButton !== null) {
      clearButton.remove();
    }

    inputElement.focus();
  };

  return filterDOM;
}
