import { Recipes } from "../modules/recipes.js";
import { RecipesList } from "./recipesList.js";

export function Tags(tagsList) {
  const { filterByTag } = Recipes();

  const filtersDiv = document.getElementById("filtersDiv");
  let tagsArea = document.getElementById("tagsArea");

  if (tagsArea !== null) {
    tagsArea.remove();
  }

  tagsArea = document.createElement("div");
  tagsArea.id = "tagsArea";
  tagsArea.className = "flex gap-10";

  tagsList.forEach((tag) => {
    const tagDiv = document.createElement("div");
    tagDiv.className = "bg-yellow py-5 px-4 rounded-[10px] my-5 flex";
    tagDiv.innerHTML = `
    <p class="text-base mr-14 first-letter:capitalize">${tag}</p>
    <div class="text-black" role="button" aria-label="Supprimer ${tag}"><i class="fa-solid fa-xmark"></i></div>
    `;

    tagDiv.lastElementChild.addEventListener("click", () => {
      tagDiv.remove();

      RecipesList(filterByTag(tag)[0], "vos tags");
    });

    tagsArea.appendChild(tagDiv);
  });

  filtersDiv.appendChild(tagsArea);
}
