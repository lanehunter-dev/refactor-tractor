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
    recipe = new Recipe(recipeData[0]);
  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });



})