import { PageLayout } from "../templates/index.js";
import { api } from "../services/api.js";

async function init() {
  const { displayBanner, displayRecipes } = PageLayout();

  try {
    const allRecipes = await api.recipes.getAllRecipes();
    displayBanner();
    displayRecipes(allRecipes.recipes);
  } catch (error) {
    console.error(error);
  }
}

init();
