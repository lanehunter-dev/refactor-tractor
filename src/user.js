class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    //need to set these back to null 
    this.filteredFavorites = null;
    this.searchedRecipes = null;
  }
  favoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeRecipe(recipe) {
    let index = this.favoriteRecipes.indexOf(recipe)
    this.favoriteRecipes.splice(index, 1)
  }

  filterFavoriteRecipes(type) {
    this.filteredFavorites = this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
  }

  searchFavoriteRecipes(keyword) {
    this.searchedRecipes = this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) ||
      recipe.ingredients.includes(keyword));
  }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  removeRecipeToCook(recipe) {
    let index = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(index, 1);
  }

}

module.exports = User;
