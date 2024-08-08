export function RecipeCard(recipe) {
  const ingredientsList = () => {
    const List = document.createElement("div");
    List.className = "mt-[30px]";
    List.innerHTML = `<h3 class="uppercase text-sm font-bold text-grey">Ingrédients</h3>`;

    const Ingredients = document.createElement("div");
    Ingredients.className = "grid grid-cols-2 mt-[15px] gap-x-[15px]";

    recipe.ingredients.forEach((ingredient) => {
      let quantity;

      if (ingredient.unit) {
        quantity = `<p class="text-grey font-base mb-[20px]">${ingredient.quantity} ${ingredient.unit}</p>`;
      } else {
        quantity = `<p class="text-grey font-base mb-[20px]">${ingredient.quantity}</p>`;
      }
      if (!ingredient.quantity) {
        quantity = `<p class="text-grey font-base mb-[20px]">-</p>`;
      }
      const Ingredient = document.createElement("div");
      Ingredient.innerHTML = `
        <p class="text-black font-base font-medium">${ingredient.ingredient}</p>
        ${quantity}
        `;
      Ingredients.appendChild(Ingredient);
    });

    List.appendChild(Ingredients);

    return List.outerHTML;
  };

  const Recipe = document.createElement("article");
  Recipe.className = "flex justify-center";

  Recipe.innerHTML = `
  <div class="w-[380px] h-[730px] rounded-[20px] bg-white shadow-cardShadow">
    <div class="relative">
      <img
        src="./data/photos_recettes/${recipe.image}"
        alt="${recipe.name}"
        class="h-[250px] w-[380px] object-cover rounded-t-[20px]"
      />
      <p
        class="bg-yellow text-black text-sm inline-block w-max absolute top-[20px] right-[20px] px-[15px] py-[10px] rounded-[14px]"
      >
        ${recipe.time}min
      </p>
    </div>
    <div class="mx-[25px] my-[30px]">
      <h2 class="font-anton text-xl line-clamp-1">${recipe.name}</h2>
      <div class="mt-[30px]">
        <h3 class="uppercase text-sm font-bold text-grey">Recette</h3>
        <p class="text-base mt-[15px] line-clamp-4 leading-[1.188rem] text-black">
        ${recipe.description}
        </p>
      </div>
      ${ingredientsList()}
    </div>
  </div>  
  `;

  return Recipe;
}
