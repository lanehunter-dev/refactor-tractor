import { expect } from 'chai';

import Recipe from '../src/recipe';
import recipeData from '../src/data/recipe-data';
import ingredientsData from '../src/data/ingredient-data';

describe('Recipe', function() {
  let recipe;
  let recipeInfo;
  let ingredients

  beforeEach(function() {
    recipeInfo = recipeData[0];
    recipe = new Recipe(recipeInfo);
    ingredients = ingredientsData
  })

  it('is a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  describe('Recipe Default Values', function () {

    it('should initialize with an id', function() {
      expect(recipe.id).to.eq(1);
    });

    it('should initialize with an name', function() {
      expect(recipe.name).to.eq('Pastry Cream');
    });

    it('should initialize with an image', function() {
      expect(recipe.image).to.eq('https://spoonacular.com/recipeImages/605132-556x370.jpg');
    });

    it('should initialize with an array of tags', function() {
      expect(recipe.tags[0]).to.equal('dessert');
    });

    it('should initialize with an array of ingredients', function() {
      const ingredient = {
        "id": 20081,
        "name": "all purpose flour",
        "quantity": {
          "amount": 1.5,
          "unit": "c"
        }
      }
      expect(recipe.ingredients[0]).to.deep.eq(ingredient);
    });
  })
  describe('Recipe Methods', function() {

    it('should calculate the total cost of all of the ingredients', function() {
      expect(recipe.calculateIngredientsCost(recipe, ingredients)).to.equal(7319);
    });

    it('should return an array of instructions', function() {
      expect(recipe.getInstructions()).to.deep.equal([
        "In a heavy saucepan, stir together the milk and 1/4 cup of sugar. Bring to a boil over medium heat.",
        "In a medium bowl, whisk together the egg yolks and egg. Stir together the remaining sugar and cornstarch; then stir them into the egg until smooth. When the milk comes to a boil, drizzle it into the bowl in a thin stream while mixing so that you do not cook the eggs. Return the mixture to the saucepan, and slowly bring to a boil, stirring constantly so the eggs don' t curdle or scorch on the bottom.",
        "When the mixture comes to a boil and thickens, remove from the heat. Stir in the butter and vanilla, mixing until the butter is completely blended in.",
        "Pour into a heat-proof container and place a piece of plastic wrap directly on the surface to prevent a skin from forming. Refrigerate until chilled before using."
      ]);
    });
  })
});
