import { Filters } from "../components/filters.js";
import { Tags } from "../components/tags.js";
import { Recipes } from "../modules/recipes.js";

export function ReloadFilters(recipes) {
  const app = document.getElementById("app");
  const filtersDiv = document.getElementById("filtersDiv");
  const newFiltersDiv = Filters(recipes);
  app.replaceChild(newFiltersDiv, filtersDiv);
  Tags(Recipes.getTags());
}
