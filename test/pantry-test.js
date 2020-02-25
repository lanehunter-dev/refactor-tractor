import chai from 'chai';
import { expect } from 'chai';
const spies = require('chai-spies');
chai.use(spies);

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
    user = new User(users[0]);
    pantry = new Pantry(users[0].pantry);
    recipe = new Recipe(recipeData[0]);
  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should be instantiated with a pantry of ingredients', function() {
    expect(pantry.inventory[0]).to.deep.equal({"ingredient": 20081, "amount": 4})
  })
  describe('Pantry Methods', function() {

    it('should be able to determine if the recipe can be made', function() {
      expect(pantry.checkStockForRecipe(recipe)).to.equal(true)
    })

    it('should be able to determine if the recipe2 can be made', function() {
      recipe = new Recipe(recipeData[1]);
      expect(pantry.checkStockForRecipe(recipe)).to.equal(false)
    })

    it('should be able to return array of ingredients', function() {
      recipe = new Recipe(recipeData[1]);
      expect(pantry.findNeededIngredients(recipe).length).to.deep.equal(1)
    })

    it('should be able to find difference in ingredients', function() {
      recipe = new Recipe(recipeData[1]);
      expect(pantry.findNeededIngredients(recipe)[0]).to.equal('You need 1 more blackberry juice')
    })

    it('should be able to find cost', function() {
      recipe = new Recipe(recipeData[1]);
      expect(pantry.getCostOfNeededItems(recipe, ingredientsData)).to.equal(256)
    })

    it('should be able to add ingredients to the pantry', function() {
      recipe = new Recipe(recipeData[1]);
      let promise = new Promise((resolve, reject) => {
        return resolve('Beep Borp data has been added')
      })

      chai.spy.on(global, 'fetch', returns => promise);
      pantry.addIngredientsToInventory(recipe, user);
      expect(global.fetch).to.have.been.called.once;
    })
  })
})
