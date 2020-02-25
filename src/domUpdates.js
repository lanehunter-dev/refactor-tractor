import $ from 'jquery'

const domUpdates = {

  welcomeMessage: (firstName) => {
    $(".banner-image").prepend(`
      <div class="welcome-msg">
        <h2>Welcome ${firstName}!</h2>
      </div>
    `)
  },

  makeCard: (recipeInfo, shortRecipeName) => {
    $('main').append(`
      <div class="recipe-card" id=${recipeInfo.id}>
        <h4 maxlength="40">${shortRecipeName}</h4>
        <div class="card-photo-container">
          <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
          <div class="text">
            <div tabindex="0">Click for Instructions</div>
          </div>
        </div>
        <h5>${recipeInfo.tags[0]}</h5>
        <img onclick="domUpdates.changeHeartImageSrc();" onKeyDown="domUpdates.changeHeartImageSrc();" tabindex="0" role="button" src="../images/heart-icon-outline-green.svg" alt="unfilled heart icon" class="card-apple-icon">
        <img tabindex="0" role="button" src="../images/mixer-icon-outline.svg" alt="unfilled mixer icon" class="card-mixer-icon">
      </div>`)
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
      <h4 id="recipe-title">${recipe.name}</h4>
      <h5>Ingredients</h5>
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

  emptyPageErrorMsg: (type) => {
    $('.error-msg').html('');
    if($('.welcome-msg').text().includes(`${type}`)){
      return null;
    }
    $('.welcome-msg').append(`<p class="error-msg">Please ${type} a recipe first </p>`)
  },

  showFavoriteRecipes: () => {
    $('.error-msg').html('');
    $('.welcome-msg').hide();
    $('.recipes-to-cook-banner').hide();
    $('.my-recipes-banner').css('display', 'flex')
  },

  showRecipesToCook: () => {
    $('.error-msg').html('');
    $('.welcome-msg').hide();
    $('.my-recipes-banner').hide();
    $('.recipes-to-cook-banner').css('display', 'flex')
  },

  showWelcomeBanner: () => {
    $('.welcome-msg').css('display', 'flex')
    $('.my-recipes-banner').hide()
    $('.recipes-to-cook-banner').hide()
  },

  showRecipeInfo: (instructionsList) => {
    $(".recipe-instructions").prepend("<h5>Instructions</h5>")
    $(".recipe-instructions").append(`<ol class="instruction-list">${instructionsList}</ol>`)
    $(".instruction-list").append(`<div class="card-btn-container">
    <button class="card-buttons make-recipe">Make Recipe</button>
    <button class="card-buttons add-ingredients">Add Needed Ingredients</button>
    </div>`)
  },

  addRecipeImage: (recipe) => {
    $('#recipe-title').css('background-image', `url(${recipe.image})`)
  },

}

export default domUpdates;
