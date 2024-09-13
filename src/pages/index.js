import { PageLayout } from "../templates/index.js";
import { api } from "../services/api.js";

async function init() {
  const { displayBanner, displayMain } = PageLayout();

  try {
    const allRecipes = await api.recipes.getAllRecipes();
    displayBanner(allRecipes.recipes);
    displayMain(allRecipes.recipes);
  } catch (error) {
    console.error(error);
  }
}

init();
