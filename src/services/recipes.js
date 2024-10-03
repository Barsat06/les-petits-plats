export async function getAllRecipes() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const trimedRecipes = data.recipes.map((recipe) => {
      return {
        ...recipe,
        image: recipe.image.trim(),
        name: recipe.name.trim(),
        description: recipe.description.trim(),
        appliance: recipe.appliance.trim(),
        ustensils: recipe.ustensils.map((u) => {
          return u.trim();
        }),
        ingredients: recipe.ingredients.map((i) => ({
          ...i,
          ingredient: i.ingredient.trim(),
        })),
      };
    });

    return {
      recipes: trimedRecipes,
    };
  } catch (error) {
    console.error("getRecipes", error);
    throw new Error("invalid JSON");
  }
}
