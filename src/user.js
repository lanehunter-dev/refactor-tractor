class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  favoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeRecipe(recipe) {
    let index = this.favoriteRecipes.indexOf(recipe)
    this.favoriteRecipes.splice(index, 1)
  }

  removeRecipeToCook(recipe) {
    let index = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(index, 1);
  }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  filterFavoriteRecipes(type) {
    return this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
  }

  searchForFavoriteRecipes(keyword) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) ||
    recipe.ingredients.includes(keyword));
  }
}

module.exports = User;
