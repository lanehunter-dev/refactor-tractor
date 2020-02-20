class Pantry {
  constructor(pantry) {
    this.inventory = pantry
  }

  checkStockForRecipe(recipe) {
    let recipeItems = recipe.ingredients.map(ingredient => {
      return {
        name: ingredient.name,
        id: ingredient.id,
        amount: ingredient.quantity.amount
      }
    })

    return recipeItems.reduce((acc, recipeItem) => {
      this.inventory.forEach(ingredient => {
        if (recipeItem.id === ingredient.ingredient) {
          acc.push({
            name: recipeItem.name,
            subtractedAmount: ingredient.amount - recipeItem.amount
          });
        }
        if (!this.inventory.includes(recipeItem.id)) {
          // console.log('test')
          acc.push({
            name: recipeItem.name,
            subtractedAmount: 0
          })
        }
      })
      return acc
    }, [])
  }
}



// getNeededIngredientsInfo(recipe) {
//   let inventoryIds = this.inventory.map(item => {
//     return item.ingredient
//   })
// }



module.exports = Pantry