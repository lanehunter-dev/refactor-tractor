import $ from 'jquery';
import domUpdates from './domUpdates.js'

import './css/base.scss';
import './css/styles.scss';

import './images/apple-logo.png'
import './images/apple-logo-outline.png'
import './images/search.png'
import './images/cookbook.png'
import './images/seasoning.png'

import User from './user';
import Recipe from './recipe';
import fetchData from './index'

let userData;
let recipeData;
let ingredientsData;

const loadPageHandler = () => {
  generateUser(userData);
  createCards(recipeData);
  findTags(recipeData)
}

fetchData().then(data => {
  userData = data.userData;
  recipeData = data.recipeData;
  ingredientsData = data.ingredientsData;
})
  .then(loadPageHandler)
  .catch(error => console.log(error.message))

function generateUser(data) {
  user = new User(data[Math.floor(Math.random() * data.length)]);
  let firstName = user.name.split(" ")[0];
  domUpdates.welcomeMessage(firstName);
  findPantryInfo(data);
}

let menuOpen = false;
let pantryInfo = [];
let recipes = [];

let fullRecipeInfo = document.querySelector(".recipe-instructions");
// let searchForm = document.querySelector("#search");
let searchInput = document.querySelector("#search-input");
let user;

$('.show-all-btn').click(showAllRecipes);
$('.filter-btn').click(findCheckedBoxes);
$('main').click(selectCard);
$(".my-pantry-btn").click(toggleMenu);
$(".saved-recipes-btn").click(showSavedRecipes);
$(".search-btn").click(searchRecipes);
$(".show-pantry-recipes-btn").click(findCheckedPantryBoxes);
$("#search").on('input', searchRecipes);

// CREATE RECIPE CARDS
function createCards(data) {
  data.forEach(recipe => {
    let recipeInfo = new Recipe(recipe);
    let shortRecipeName = recipeInfo.name;
    recipes.push(recipeInfo);
    if (recipeInfo.name.length > 40) {
      shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
    }
    domUpdates.makeCard(recipeInfo, shortRecipeName)
  });
}

// FILTER BY RECIPE TAGS
function findTags(data) {
  let tags = [];
  data.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort();
  tags.forEach(tag => domUpdates.listTag(capitalize(tag), tag));
}

function capitalize(words) {
  return words.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = checkboxInfo.filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
}

function findTaggedRecipes(selected) {
  let filteredResults = [];
  selected.forEach(tag => {
    let allRecipes = recipes.filter(recipe => {
      return recipe.tags.includes(tag.id);
    });
    allRecipes.forEach(recipe => {
      if (!filteredResults.includes(recipe)) {
        filteredResults.push(recipe);
      }
    })
  });
  showAllRecipes();
  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

function filterRecipes(filtered) {
  let foundRecipes = recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  foundRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domUpdates.hide(domRecipe)
  });
}


// FAVORITE AND RECIPE CARD FUNCTIONALITY
function selectCard(event) {
  let recipeCard = event.target.closest(".recipe-card")
  if (event.target.className === "card-apple-icon") {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    domUpdates.changeAppleImageSrc(cardId, user, event)
  } else if (event.target.id === "exit-recipe-btn") {
    exitRecipe(event);
  } else if (isDescendant(recipeCard, event.target)) {
    let recipeId = $(recipeCard).attr('id')
    openRecipeInfo(recipeId);
  }
}

function isDescendant(parent, child) {
  let node = child;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function showSavedRecipes() {
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domUpdates.hide(domRecipe)
  });
  domUpdates.showRecipeBanner()
}

// CREATE RECIPE INSTRUCTIONS
function openRecipeInfo(recipeId) {
  domUpdates.display('.recipe-instructions')
  let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  let ingredients = recipe.ingredients.map(recipeIngredient => {
    return ingredientsData.find(item => item.id === recipeIngredient.id).name
  })
  domUpdates.makeRecipeTitle(recipe, ingredients);
  domUpdates.addRecipeImage(recipe);
  generateInstructions(recipe);
}

// function generateIngredients(recipe) {
//   return recipe && recipe.ingredients.map(i => {
//     return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
//   }).join(", ");
// }

function generateInstructions(recipe) {
  let instructionsList = "";
  let instructions = recipe.instructions.map(i => {
    return i.instruction
  });
  instructions.forEach(i => {
    instructionsList += `<li>${i}</li>`
  });
  domUpdates.showRecipeInfo(instructionsList)
}

function exitRecipe() {
  while (fullRecipeInfo.firstChild && fullRecipeInfo.removeChild(fullRecipeInfo.firstChild)) {
    domUpdates.hide(fullRecipeInfo);
  }
}

// SEARCH RECIPES
function searchRecipes() {
  showAllRecipes();
  let searchedRecipes = recipeData.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  filterNonSearched(createRecipeObject(searchedRecipes));
}

function filterNonSearched(filtered) {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  hideUnselectedRecipes(found)
}

function hideUnselectedRecipes(foundRecipes) {
  foundRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domUpdates.hide(domRecipe)
  });
}

function createRecipeObject(recipes) {
  recipes = recipes.map(recipe => new Recipe(recipe));
  return recipes
}

function toggleMenu() {
  var menuDropdown = $(".drop-menu");
  menuOpen = !menuOpen;
  if (menuOpen) {
    domUpdates.display(menuDropdown)
  } else {
    domUpdates.hide(menuDropdown)
  }
}

function showAllRecipes() {
  recipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domUpdates.display(domRecipe);
  });
  domUpdates.showWelcomeBanner()
}

// CREATE AND USE PANTRY
function findPantryInfo() {
  user.pantry.forEach(item => {
    let itemInfo = ingredientsData.find(ingredient => {
      return ingredient.id === item.ingredient;
    });
    let originalIngredient = pantryInfo.find(ingredient => {
      if (itemInfo) {
        return ingredient.name === itemInfo.name;
      }
    });
    if (itemInfo && originalIngredient) {
      originalIngredient.count += item.amount;
    } else if (itemInfo) {
      pantryInfo.push({name: itemInfo.name, count: item.amount});
    }
  });
  let sortedPantry = pantryInfo.sort((a, b) => a.name.localeCompare(b.name));
  sortedPantry.forEach(ingredient => domUpdates.displayPantryInfo(ingredient))
}

function findCheckedPantryBoxes() {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  showAllRecipes();
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

function findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  })
  recipeData.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      allRecipeIngredients.push(ingredient.name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domUpdates.hide(domRecipe)
    }
  })
}
