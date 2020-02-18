class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  saveRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFavoriteRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
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
  searchRecipes() {
    
  }
}

module.exports = User;
