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
    let pantryIds = this.inventory.map(ingredient => {
      return ingredient.ingredient
    })

    let subtractedData = recipeItems.reduce((acc, recipeItem) => {
      if (!pantryIds.includes(recipeItem.id)) {
        acc.push({
          name: recipeItem.name,
          subtractedAmount: parseInt(`-${recipeItem.amount}`)
        })
      }
      this.inventory.forEach(ingredient => {
        if (recipeItem.id === ingredient.ingredient) {
          acc.push({
            name: recipeItem.name,
            subtractedAmount: ingredient.amount - recipeItem.amount
          });
        }
      })
      return acc
    }, [])

    console.log(subtractedData)

    let amountRemaining = subtractedData.map(dataItem => {
      return dataItem.subtractedAmount < 0 ? false : true
    })
    console.log(amountRemaining)

    return amountRemaining.includes(false) ? false : true;
  }
}



// getNeededIngredientsInfo(recipe) {
//   let inventoryIds = this.inventory.map(item => {
//     return item.ingredient
//   })
// }



module.exports = Pantry