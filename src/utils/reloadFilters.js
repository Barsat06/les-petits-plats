import { Filters } from "../components/filters.js";

export function ReloadFilters(recipes) {
  const app = document.getElementById("app");
  const filtersDiv = document.getElementById("filtersDiv");
  const newFiltersDiv = Filters(recipes);
  app.replaceChild(newFiltersDiv, filtersDiv);
}
