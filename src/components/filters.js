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
  const filterList = () => {
    const List = document.createElement("div");
    List.className = "flex flex-col mt-6 gap-4 max-h-52 overflow-auto no-scrollbar";

    fillingArray.forEach((elements) => {
      const button = document.createElement("button");
      button.className = "text-left first-letter:capitalize";
      button.textContent = elements;

      List.appendChild(button);
    });

    return List.outerHTML;
  };

  const FilterDOM = document.createElement("div");
  FilterDOM.className = "bg-white rounded-xl p-4 shadow-cardShadow";
  FilterDOM.innerHTML = `
  <button class="font-medium">${fillingType} <span id="arrow" class="ml-16"><i class="fa-solid fa-angle-down"></i></span></button>
  <div class="hidden mt-4 w-full">
    <div class="w-full relative">
      <input 
        type="text"
        name="${fillingType}"
        class="border-solid border border-lightGrey h-9 w-full text-grey font-normal rounded-sm"
      />
      <div class="absolute right-[10px] top-[7.5px] rounded-xl">
        <div type="submit" aria-label="Rechercher par ${fillingType}" class="text-grey text-base"><i class="fa-solid fa-magnifying-glass"></i></div>
      </div>
    </div>
    ${filterList()}
  </div>  
  `;

  const filterContent = FilterDOM.lastElementChild;
  FilterDOM.firstElementChild.addEventListener("click", () => {
    const isMenuVisible = filterContent.style.display === "block";
    filterContent.style.display = isMenuVisible ? "none" : "block";
    FilterDOM.querySelector("#arrow").innerHTML = isMenuVisible
      ? "<i class='fa-solid fa-angle-down'></i>"
      : "<i class='fa-solid  fa-angle-up'></i>";
  });

  const inputElement = FilterDOM.querySelector(
    "input[name=" + fillingType + "]"
  );

  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const clearButton = document.querySelector("#x" + fillingType);

    if (clearButton === null) {
      const xmark = document.createElement("div");
      xmark.id = "x" + fillingType;
      xmark.className = "text-grey absolute right-8 top-2.5 text-sm";
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
    const clearButton = document.querySelector("#x" + fillingType);
    clearButton.remove();
  };

  return FilterDOM;
}
