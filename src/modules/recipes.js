export class Recipes {
  static tagArray = [];
  static originalRecipes = [];
  static filteredRecipes = [];
  static oldInput = "";

  static filterByInput(input) {
    const loweredInput = input.trim().toLowerCase();

    if (this.oldInput.length === 0) {
      this.oldInput = loweredInput;
    }
    if (this.oldInput.length > loweredInput.length) {
      if (this.tagArray.length === 0) {
        this.filteredRecipes = this.originalRecipes;
      } else {
        this.filteredRecipes = this.originalRecipes;
        const oldTags = this.tagArray;
        this.tagArray = [];
        oldTags.forEach((tag) => {
          this.filterByTag(tag);
        });
      }
    }

    const recipesToFilter = this.#getRecipesToFilter();

    this.oldInput = loweredInput;
    if (loweredInput.length < 3) {
      if (this.tagArray.length === 0) {
        return this.originalRecipes;
      } else {
        return recipesToFilter;
      }
    }

    let filteredRecipes = [];
    let unmatchedRecipes = [];
    let matchingIngredientIds = [];
    recipesToFilter.forEach((recipe) => {
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
  }

  static filterSearchBar(input, array) {
    const loweredInput = input.trim().toLowerCase();
    return array.filter((element) =>
      element.trim().toLowerCase().includes(loweredInput)
    );
  }

  static filterByTag(tag) {
    const normalizedTag = tag.trim().toLowerCase();

    if (!this.tagArray.includes(normalizedTag)) {
      this.tagArray.push(normalizedTag);
    } else {
      this.tagArray = this.tagArray.filter((t) => t !== normalizedTag);
      this.filteredRecipes = this.originalRecipes;
      this.filterByInput(this.oldInput);
    }

    const recipesToFilter = this.#getRecipesToFilter();

    this.filteredRecipes = recipesToFilter.filter((recipe) => {
      const allElements = [
        ...recipe.ingredients.map((i) => i.ingredient.toLowerCase()),
        recipe.appliance.toLowerCase(),
        ...recipe.ustensils.map((u) => u.toLowerCase()),
      ];

      return this.tagArray.every((tag) =>
        allElements.some((element) => element.includes(tag))
      );
    });
  }

  static #getRecipesToFilter() {
    return this.filteredRecipes.length === 0
      ? this.originalRecipes
      : this.filteredRecipes;
  }

  static getOriginalRecipes() {
    return this.originalRecipes;
  }

  static getFilteredRecipes() {
    return this.filteredRecipes;
  }

  static setRecipes(recipes) {
    this.originalRecipes = recipes;
    this.filteredRecipes = recipes;
  }

  static getTags() {
    return this.tagArray;
  }
}
