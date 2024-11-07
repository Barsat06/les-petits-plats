/*
if filteredRecipes vide faire sur OGR sinon sur filteredRecipes
*/

export const Recipes = {
  tagArray: [],
  originalRecipes: [],
  filteredRecipes: [],

  filterByInput(input) {
    const loweredInput = input.trim().toLowerCase();

    if (loweredInput.length < 3) {
      return this.originalRecipes;
    }

    let filteredRecipes = [];
    let unmatchedRecipes = [];
    let matchingIngredientIds = [];

    this.originalRecipes.forEach((recipe) => {
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

    this.filteredRecipes = filteredRecipes;
    return filteredRecipes;
  },

  filterSearchBar(input, array) {
    const loweredInput = input.trim().toLowerCase();
    return array.filter((element) =>
      element.trim().toLowerCase().includes(loweredInput)
    );
  },

  filterByTag(tag) {
    const normalizedTag = tag.trim().toLowerCase();

    if (!this.tagArray.includes(normalizedTag)) {
      this.tagArray.push(normalizedTag);
    } else {
      this.tagArray = this.tagArray.filter((t) => t !== normalizedTag);
    }

    //verfier filteredrecipes
    this.filteredRecipes = this.originalRecipes.filter((recipe) => {
      const allElements = [
        ...recipe.ingredients.map((i) => i.ingredient.toLowerCase()),
        recipe.appliance.toLowerCase(),
        ...recipe.ustensils.map((u) => u.toLowerCase()),
      ];

      return this.tagArray.every((tag) =>
        allElements.some((element) => element.includes(tag))
      );
    });

    return true;
  },

  getOriginalRecipes() {
    return this.originalRecipes;
  },
  getFilteredRecipes() {
    return this.filteredRecipes;
  },
  setRecipes(recipes) {
    this.originalRecipes = recipes;
    this.filteredRecipes = recipes;
  },
  getTags() {
    return this.tagArray;
  },
};
