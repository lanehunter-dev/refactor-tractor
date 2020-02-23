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
    let amountRemaining = subtractedData.map(dataItem => {
      return dataItem.subtractedAmount < 0 ? false : true
    })
    return amountRemaining.includes(false) ? false : true;
  }

  findNeededIngredients(recipe) {
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

    return subtractedData.reduce((acc, ingredient) => {
      if (ingredient.subtractedAmount < 0) {
        acc.push(`You need ${Math.abs(ingredient.subtractedAmount)} more ${ingredient.name}`)
      }
      return acc
    }, [])
  }

  getCostOfNeededItems(recipe, ingredientsData) {
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
            subtractedAmount: ingredient.amount - recipeItem.amount,
            cost: ingredient.estimatedCostInCents
          });
        }
      })
      return acc
    }, [])

    return subtractedData.reduce((acc, ingredient) => {
      if (ingredient.subtractedAmount < 0) {
        let item = ingredientsData.find(item => ingredient.name === item.name)
        acc += item.estimatedCostInCents * Math.abs(ingredient.subtractedAmount)
      }
      return acc
    }, 0)
  }
}




module.exports = Pantry