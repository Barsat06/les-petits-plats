import { Filters } from "../components/filters.js";
import { Tags } from "../components/tags.js";
import { Recipes } from "../modules/recipes.js";
import { RecipesNumber } from "../components/recipesNumber.js";

export function ReloadFilters(recipes) {
  const FiltersAndNumber = document.getElementById("filtersAndNumber");
  const filtersDiv = document.getElementById("filtersDiv");
  const newFiltersDiv = Filters(recipes);
  FiltersAndNumber.replaceChild(newFiltersDiv, filtersDiv);
  Tags(Recipes.getTags());
  RecipesNumber();
}
