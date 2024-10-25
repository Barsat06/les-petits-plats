import { PageLayout } from "../templates/index.js";
import { api } from "../services/api.js";

async function init() {
  try {
    const allRecipes = await api.recipes.getAllRecipes();
    const { displayBanner, displayMain } = PageLayout(allRecipes.recipes);
    displayBanner();
    displayMain();
  } catch (error) {
    console.error(error);
  }
}

init();
