import $ from 'jquery'

const domUpdates = {

  welcomeMessage: function(firstName) {
    $(".banner-image").insertAdjacentHTML('afterbegin', `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>
    `)
  },

  makeCard: function(recipeInfo, shortRecipeName) {
    $('main').insertAdjacentHTML("beforeend", `
      <div class="recipe-card" id=${recipeInfo.id}>
        <h3 maxlength="40">${shortRecipeName}</h3>
        <div class="card-photo-container">
          <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
          <div class="text">
            <div>Click for Instructions</div>
          </div>
        </div>
        <h4>${recipeInfo.tags[0]}</h4>
        <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </div>
    `)
  },

  listTag: function(tag) {
    $(".tag-list").insertAdjacentHTML("beforeend", `
      <li><input type="checkbox" class="checked-tag" id="${tag}">
      <label for="${tag}">${capitalize(tag)}</label></li>
    `)
  },

  displayPantryInfo: function(ingredient) {
    $(".pantry-list").insertAdjacentHTML("beforeend", `
      <li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
      <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>
    `)
  },

  makeRecipeTitle: function(recipe, ingredients) {
    $(".recipe-instructions").insertAdjacentHTML("beforeend", `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>
    `)
  }
}

export default domUpdates;
