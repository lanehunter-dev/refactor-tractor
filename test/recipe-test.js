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

  it('should initialize with an id', function() {
    expect(recipe.id).to.eq(1);
  });

  it('should initialize with an name', function() {
    expect(recipe.name).to.eq('Pastry Cream');
  });

  it('should initialize with an image', function() {
    expect(recipe.image).to.eq('https://spoonacular.com/recipeImages/605132-556x370.jpg');
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

  it('should calculate the total cost of all of the ingredients', function() {
    expect(recipe.calculateIngredientsCost(recipe, ingredients)).to.equal(7319);
  });
});
