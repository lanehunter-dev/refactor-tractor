import { expect } from 'chai';

import recipeData from '../src/data/recipe-data';
import users from '../src/data/users-data';
import ingredientsData from '../src/data/ingredient-data';
import Pantry from '../src/pantry';
import Recipe from '../src/recipe';
import User from '../src/user';

describe('Pantry', function() {
  let pantry;
  let user;
  let recipe;
  let ingredients;

  beforeEach(function() {
    ingredients = ingredientsData;
    user = new User(users[0]);
    pantry = new Pantry(users[0].pantry);
    recipe = new Recipe(recipeData[1]);
  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should be able to have a pantry of ingredients', function() {
    expect(pantry.inventory[0]).to.deep.equal({"ingredient": 20081, "amount": 4})
  })

  it('should be able to determine if the recipe can be made', function() {
    console.log(pantry.checkStockForRecipe(recipe))
    expect(pantry.checkStockForRecipe(recipe)).to.equal(true)
  })



})