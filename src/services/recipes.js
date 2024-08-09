export async function getAllRecipes() {
  try {
    const response = await fetch("data.json");
    const recipes = await response.json();

    return {
      recipes: recipes.recipes,
    };
  } catch (error) {
    console.error("getRecipes", error);
    throw new Error("invalid JSON");
  }
}
