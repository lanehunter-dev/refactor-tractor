class Pantry {
  constructor(pantry) {
    this.inventory = pantry
  }

  checkStockForRecipe(recipe) {
    let inventoryIds = this.inventory.map(item => {
      return item.ingredient
    })
    let trueCheck = recipe.ingredients.map(ingredient => {
      return inventoryIds.includes(ingredient.id) ? true : false;
    })
    return trueCheck.includes(false) ? false : true;
  }
}


module.exports = Pantry