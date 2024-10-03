import { Recipes } from "../modules/recipes.js";

export function Filters(allRecipes) {
  const ingredientsFilter = () => {
    let ingredientsArray = [];

    allRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredientsArray.push(ingredient.ingredient);
      });
    });

    const unduplicatedIngredientsArray = [...new Set(ingredientsArray)];
    unduplicatedIngredientsArray.sort((a, b) => a.localeCompare(b));

    return Filter("Ingrédients", unduplicatedIngredientsArray);
  };
  const appliancesFilter = () => {
    let appliancesArray = [];

    allRecipes.forEach((recipe) => {
      appliancesArray.push(recipe.appliance);
    });

    const unduplicatedAppliancesArray = [...new Set(appliancesArray)];
    unduplicatedAppliancesArray.sort((a, b) => a.localeCompare(b));

    return Filter("Appareils", unduplicatedAppliancesArray);
  };
  const ustensilsFilter = () => {
    let ustensilsArray = [];

    allRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        ustensilsArray.push(ustensil);
      });
    });

    const unduplicatedUstensilsArray = [...new Set(ustensilsArray)];
    unduplicatedUstensilsArray.sort((a, b) => a.localeCompare(b));

    return Filter("Ustensiles", unduplicatedUstensilsArray);
  };

  return { ingredientsFilter, appliancesFilter, ustensilsFilter };
}

function Filter(fillingType, fillingArray) {
  const filterList = (elementArray) => {
    const List = document.createElement("div");
    List.id = "test";
    List.className = "flex flex-col mt-6 max-h-52 overflow-auto";

    const { filterByTag } = Recipes();

    elementArray.forEach((element) => {
      const elementButton = document.createElement("button");
      elementButton.className =
        "text-left first-letter:capitalize hover:bg-yellow pl-4 pr-4 pb-2 pt-2";
      elementButton.title = element;
      elementButton.textContent = element;

      elementButton.addEventListener("click", () => {
        filterByTag(element, fillingType);
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
  <button class="font-medium">${fillingType} <span id="arrow" class="absolute right-4"><i class="fa-solid fa-angle-down"></i></span></button>
  <div id="filterList" class="hidden absolute z-20 bg-inherit left-0 pt-4 pb-4 rounded-b-xl">
    <div class="relative">
      <input 
        type="text"
        name="${fillingType}"
        class="border-solid border border-lightGrey h-9 text-grey font-normal rounded-sm w-40 ml-4 mr-4"
      />
      <div class="absolute right-6 top-[7.5px] rounded-xl">
        <div type="submit" aria-label="Rechercher par ${fillingType}" class="text-grey text-base"><i class="fa-solid fa-magnifying-glass"></i></div>
      </div>
    </div>
  </div>  
  `;
  const filterContent = filterDOM.lastElementChild;

  filterContent.appendChild(filterList(fillingArray));
  filterDOM.querySelector("input").addEventListener("input", (e) => {
    filterContent.lastChild.remove();
    filterContent.appendChild(filterList(filterSearchBar(e.target.value)));
  });

  const filterSearchBar = (input) => {
    let filteredArray = [];

    const normalizedInput = input.trim().toLowerCase();
    fillingArray.forEach((element) => {
      const normalizedElement = element.trim().toLowerCase();

      if (normalizedElement.includes(normalizedInput)) {
        filteredArray.push(normalizedElement);
      }
    });

    return filteredArray;
  };

  filterDOM.firstElementChild.addEventListener("click", () => {
    filterContent.classList.toggle("hidden");

    filterDOM.querySelector("#arrow").innerHTML =
      filterContent.classList.contains("hidden")
        ? "<i class='fa-solid fa-angle-down'></i>"
        : "<i class='fa-solid  fa-angle-up'></i>";
  });

  const inputElement = filterDOM.querySelector(
    "input[name=" + fillingType + "]"
  );

  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const clearButton = document.querySelector("#x" + fillingType);

    if (clearButton === null) {
      const xmark = document.createElement("div");
      xmark.id = "x" + fillingType;
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
    filterContent.appendChild(filterList(filterSearchBar("")));
    const clearButton = document.querySelector("#x" + fillingType);

    if (clearButton === !null) {
      clearButton.remove();
    }
  };

  return filterDOM;
}
