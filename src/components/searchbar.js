export function SearchBar() {
  const searchBar = document.createElement("form");
  searchBar.className = "h-[75px] relative";

  searchBar.innerHTML = `
  <input 
      type="text"
      name="search"
      placeholder="Rechercher une recette, un ingrédient, ..."
      class="w-[950px] h-[75px] text-lg p-9 text-grey placeholder:text-grey font-normal rounded-xl"
  />
  <div class="absolute right-[10px] top-[10px] w-[55px] h-[55px] rounded-xl">
    <button type="submit" aria-label="Rechercher" class="bg-black w-[55px] h-[55px] rounded-xl text-white text-[26px] hover:bg-yellow hover:text-white"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
  `;

  const inputElement = searchBar.querySelector('input[name="search"]');

  inputElement.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const clearButton = document.querySelector("#x");

    if (clearButton === null) {
      const xmark = document.createElement("div");
      xmark.id = "x";
      xmark.className =
        "text-grey absolute right-[80px] top-[15px] w-[25px] h-[25px] text-[30px]";
      xmark.role = "button";
      xmark.ariaLabel = "Effacer";
      xmark.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      xmark.addEventListener("click", () => {
        clearInputField();
      });

      searchBar.appendChild(xmark);
    }
    if (inputValue === "") {
      clearInputField();
    }
  });

  const clearInputField = () => {
    inputElement.value = "";
    const clearButton = document.querySelector("#x");
    clearButton.remove();
  };

  searchBar.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputElement.value.trim() !== "") {
      console.log(inputElement.value);
      clearInputField();
    }
  });

  return searchBar;
}
