import $ from 'jquery';
import domUpdates from './domUpdates.js'

import './css/base.scss';
import './css/styles.scss';

import './images/apple-logo.png'
import './images/apple-logo-outline.png'
import './images/filter.svg'
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

const reformatData = () => {
  recipeData = recipeData.map(recipe => {
    return {
      name: recipe.name,
      id: recipe.id,
      image: recipe.image,
      ingredients: recipe.ingredients.reduce((reformattedList, ingredient) => {
        reformattedList.push({
          name: ingredientsData.find(el => el.id === ingredient.id).name,
          id: ingredient.id,
          quantity: {
            amount: ingredient.quantity.amount,
            unit: ingredient.quantity.unit,
          }
        })
        return reformattedList
      }, []),
      instructions: recipe.instructions,
      tags: recipe.tags,
    }
  })
}

fetchData().then(data => {
  userData = data.userData;
  ingredientsData = data.ingredientsData;
  recipeData = data.recipeData;
})
  .then(reformatData)
  .then(loadPageHandler)
  .catch(error => console.log(error.message))

function generateUser(data) {
  user = new User(data[Math.floor(Math.random() * data.length)]);
  let firstName = user.name.split(" ")[0];
  domUpdates.welcomeMessage(firstName);
  findPantryInfo(data);
}

let pantryMenuOpen = false;
let typeMenuOpen = false;
let pantryInfo = [];
let recipes = [];

let fullRecipeInfo = document.querySelector(".recipe-instructions");
let searchInput = document.querySelector("#search-input");
let user;

$('.show-all-btn').click(showAllRecipes);
$('.filter-btn').click(findCheckedBoxes);
$('main').click(selectCard);
$(".my-pantry-btn").click(toggleMenu);
$(".drop").click(toggleMenu);
$(".favorite-recipes-btn").click(showFavoriteRecipes);
$(".recipes-to-cook-btn").click(showRecipesToCook);
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

//Aria butotn functions
function ariaHeartChange(event) {
  
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


// OPEN RECIPE CARD FUNCTIONALITY
function selectCard(event) {
  let recipeCard = event.target.closest(".recipe-card")
  if (event.target.className === "card-apple-icon") {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    domUpdates.changeHeartImageSrc(cardId, user, event)
  } else if (event.target.className === "card-mixer-icon") {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    domUpdates.changeMixerImageSrc(cardId, user, event)
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

// FAVORITE RECIPES AND RECIPES TO COOK FUNCTIONALITY
function showFavoriteRecipes() {
  showAllRecipes()
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domUpdates.hide(domRecipe)
  });
  domUpdates.showFavoriteRecipes()
}

function showRecipesToCook() {
  showAllRecipes()
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.recipesToCook.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domUpdates.hide(domRecipe)
  });
  domUpdates.showRecipesToCook()
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
    return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    recipe.ingredients.find(ingredient => {
      return ingredient.name.includes(searchInput.value.toLowerCase())
    })
  });
  let recipeAndingredients = recipeData.map(recipe => {
    return recipe.ingredients.map(ingredient => {
      return ingredientsData.find(item => {
        if (item.id === ingredient.id) {
          return item.name
        }
      })
    })
  });
  filterNonSearched(searchedRecipes);
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

function toggleMenu(e) {
  console.log(e.target)
  if(e.target.classList.contains("my-pantry-btn") || e.target.parentNode.classList.contains("my-pantry-btn")){
    pantryMenuOpen ? domUpdates.hide(".drop-menu") : domUpdates.display(".drop-menu");
    pantryMenuOpen = !pantryMenuOpen
  } else if(e.target.classList.contains("drop") || e.target.parentNode.classList.contains("drop")) {
    typeMenuOpen ? domUpdates.hide(".filter-type-drop") : domUpdates.display(".filter-type-drop");
    typeMenuOpen = !typeMenuOpen;
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
