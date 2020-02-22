import $ from 'jquery'

const domUpdates = {

  welcomeMessage: (firstName) => {
    $(".banner-image").prepend(`
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>
    `)
  },

  makeCard: (recipeInfo, shortRecipeName) => {
    $('main').append(`
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

  listTag: (cap, tag) => {
    $(".tag-list").append(`
      <li><input type="checkbox" class="checked-tag" id="${tag}">
      <label for="${tag}">${cap}</label></li>
    `)
  },

  displayPantryInfo: (ingredient) => {
    $(".pantry-list").append(`
      <li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
      <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>
    `)
  },

  makeRecipeTitle: (recipe, ingredients) => {
    $(".recipe-instructions").append(`
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>
    `)
  },

  hideRecipes: (recipe) => {
    $(recipe).hide()
  },

  changeAppleImageSrc: (cardId, user, event) => {
    if (!user.favoriteRecipes.includes(cardId)) {
      $(event.target).attr('src', "../images/apple-logo.png")
      user.saveRecipe(cardId);
    } else {
      $(event.target).attr('src', "../images/apple-logo-outline.png")
      user.removeRecipe(cardId);
    }
  },

  displayRecipes: (recipe) => {
    $(recipe).css('display', 'block');
  },

  showRecipeBanner


}

export default domUpdates;
