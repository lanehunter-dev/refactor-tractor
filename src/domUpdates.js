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
        <img src="../images/heart-icon-outline-green.svg" alt="unfilled heart icon" class="card-apple-icon">
        <img src="../images/mixer-icon-outline.svg" alt="unfilled mixer icon" class="card-mixer-icon">
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
      <p>${ingredients.toString().split(',').join(', ')}</p>
    `)
  },

  hide: (recipe) => {
    $(recipe).hide()
  },

  changeHeartImageSrc: (cardId, user, event) => {
    if (!user.favoriteRecipes.includes(cardId)) {
      $(event.target).attr('src', "../images/heart-icon.svg")
      user.favoriteRecipe(cardId);
    } else {
      $(event.target).attr('src', "../images/heart-icon-outline-green.svg")
      user.removeRecipe(cardId);
    }
  },

  changeMixerImageSrc: (cardId, user, event) => {
    if (!user.recipesToCook.includes(cardId)) {
      $(event.target).attr('src', "../images/mixer-icon.svg")
      user.decideToCook(cardId);
    } else {
      $(event.target).attr('src', "../images/mixer-icon-outline.svg")
      user.removeRecipeToCook(cardId);
    }
  },

  display: (recipe) => {
    $(recipe).css('display', 'block');
  },

  showFavoriteRecipes: () => {
    $('.welcome-msg').hide();
    $('.recipes-to-cook-banner').hide();
    $('.my-recipes-banner').css('display', 'block')
  },

  showRecipesToCook: () => {
    $('.welcome-msg').hide();
    $('.my-recipes-banner').hide();
    $('.recipes-to-cook-banner').css('display', 'block')
  },

  showWelcomeBanner: () => {
    $('.welcome-msg').css('display', 'flex')
    $('.my-recipes-banner').hide()
    $('.recipes-to-cook-banner').hide()
  },

  showRecipeInfo: (instructionsList) => {
    $(".recipe-instructions").prepend("<h4>Instructions</h4>")
    $(".recipe-instructions").append(`<ol>${instructionsList}</ol>`)
  },

  addRecipeImage: (recipe) => {
    $('#recipe-title').css('background-image', `url(${recipe.image})`)
  },

}

export default domUpdates;
