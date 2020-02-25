class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.instructions = recipe.instructions;
    this.ingredients = recipe.ingredients;
  }

  calculateIngredientsCost(recipe, ingredientsData) {
    let recipeItems = recipe.ingredients.map(ingredient => {
      return {
        name: ingredient.name,
        id: ingredient.id,
        amount: ingredient.quantity.amount
      }
    })
    return recipeItems.reduce((acc, item) => {
      let itemCost = ingredientsData.find(el => el.id === item.id).estimatedCostInCents;
      acc += itemCost * item.amount
      return acc
    }, 0)
  }

  getInstructions() {
    return this.instructions.map(i => i.instruction);
  }
}

module.exports = Recipe;
