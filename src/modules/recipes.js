export function Recipes(originalRecipes) {
  let tagArray = [];

  function filterByInput(input) {
    const loweredInput = input.trim().toLowerCase();

    if (loweredInput.length < 3) {
      return originalRecipes;
    }

    let filteredRecipes = [];
    let unmatchedRecipes = [];
    let matchingIngredientIds = [];

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
          matchingIngredientIds.push(recipe.id);
          return true;
        }
        return false;
      });
    });

    unmatchedRecipes = unmatchedRecipes.filter(
      (recipe) => !matchingIngredientIds.includes(recipe.id)
    );

    unmatchedRecipes.forEach((recipe) => {
      if (recipe.description.toLowerCase().includes(loweredInput)) {
        filteredRecipes.push(recipe);
      }
    });

    return filteredRecipes;
  }

  function filterSearchBar(input, array) {
    const loweredInput = input.trim().toLowerCase();
    return array.filter((element) =>
      element.trim().toLowerCase().includes(loweredInput)
    );
  }

  function filterByTag(tag) {
    const normalizedTag = tag.trim().toLowerCase();

    if (!tagArray.includes(normalizedTag)) {
      tagArray.push(normalizedTag);
    } else {
      tagArray = tagArray.filter((t) => t !== normalizedTag);
    }

    return filterRecipes();
  }

  function filterRecipes() {
    return originalRecipes.filter((recipe) => {
      const allElements = [
        ...recipe.ingredients.map((i) => i.ingredient.toLowerCase()),
        recipe.appliance.toLowerCase(),
        ...recipe.ustensils.map((u) => u.toLowerCase()),
      ];

      return tagArray.every((tag) =>
        allElements.some((element) => element.includes(tag))
      );
    });
  }

  return { filterByInput, filterSearchBar, filterByTag };
}
