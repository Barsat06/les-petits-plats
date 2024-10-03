export function Recipes(originalRecipes) {
  function filterByInput(input) {
    if (!input.length > 2) {
      return originalRecipes;
    }

    const loweredInput = input.trim().toLowerCase();
    let filteredRecipes = [];
    let unmatchedRecipes = [];
    let recipeIdsMatchingIngredient = [];

    originalRecipes.forEach((recipe) => {
      const recipeTitle = recipe.name.toLowerCase();

      if (recipeTitle.includes(loweredInput)) {
        filteredRecipes.push(recipe);
      } else {
        unmatchedRecipes.push(recipe);
      }
    });

    unmatchedRecipes.forEach((recipe) => {
      recipe.ingredients.some((ingredient) => {
        const ingredientName = ingredient.ingredient.toLowerCase();

        if (ingredientName.includes(loweredInput)) {
          filteredRecipes.push(recipe);

          recipeIdsMatchingIngredient.push(recipe.id);

          return true;
        }
      });
    });

    unmatchedRecipes = unmatchedRecipes.filter(
      (recipe) => !recipeIdsMatchingIngredient.includes(recipe.id)
    );

    unmatchedRecipes.forEach((recipe) => {
      const loweredDescription = recipe.description.toLowerCase();

      if (loweredDescription.includes(loweredInput)) {
        filteredRecipes.push(recipe);
      }
    });

    return filteredRecipes;
  }
  function filterByTag(element, elementList) {
    console.log(element, elementList);
  }

  return { filterByInput, filterByTag };
}
