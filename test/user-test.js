// ***ISSUES***
//The search functionality is currently case sensitive
//Users should be able to search through filtered results, and filter
//  through searched resulted. Can use a conditional to check if the
//  other array if null before running
//Need to call search/filter methods in scripts, or set conditionals for those
//  functions to only run when on a certain page
import { expect } from 'chai';

import User from '../src/user';
import users from '../src/data/users-data';

describe('User', function() {
  let user;
  let userInfo;
  let recipe;

  beforeEach(function() {
    userInfo = users[0];
    user = new User(userInfo)

    recipe = {name: 'Chicken Parm', type: ['italian', 'dinner'], ingredients: ['noodles', 'tomatoes']};
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should initialize with an id', function() {
    expect(user.id).to.eq(1);
  });
/////////// DEFAULT VALUES
  it('should initialize with a name', function() {
    expect(user.name).to.eq('Rocky Padberg');
  });

  it('should initialize with a pantry', function() {
    expect(user.pantry[0].ingredient).to.eq(20081);
  });

  it('should initialize with an empty favoriteRecipes array', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should initialize with an empty recipesToCook array', function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should initialize with a property named filteredFavorites assigned a value of null', function() {
    expect(user.filteredFavorites).to.equal(null);
  });

  it('should initialize with a property named searchedRecipes assigned a value of null', function() {
    expect(user.filteredFavorites).to.equal(null);
  });
///////////////////

/////////// METHODS
  it('should be able to save a recipe to favoriteRecipes', function() {
    user.favoriteRecipe(recipe);
    expect(user.favoriteRecipes[0].name).to.equal('Chicken Parm');
  });

  it('should be able to remove a recipe from favoriteRecipes', function() {
    user.favoriteRecipe(recipe);
    user.removeRecipe(recipe);
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should be able to filter favoriteRecipes by type', function() {
    user.favoriteRecipe(recipe);
    user.filterFavoriteRecipes('italian');
    expect(user.filteredFavorites).to.deep.equal([recipe]);
  });

  it('should be able to search favoriteRecipes by recipe name', function() {
    user.favoriteRecipe(recipe);
    user.searchFavoriteRecipes('Chicken');
    expect(user.searchedRecipes).to.deep.equal([recipe]);
  });

  it('should be able to search favoriteRecipes by ingredient', function() {
    user.favoriteRecipe(recipe);
    user.searchFavoriteRecipes('noodles');
    expect(user.searchedRecipes).to.deep.equal([recipe]);
  });

  it('should be able to decide to cook a recipe', function() {
    user.decideToCook(recipe);
    expect(user.recipesToCook[0].name).to.equal('Chicken Parm');
  });

  it('should be able to remove a recipe it decided to cook', function() {
    user.decideToCook(recipe);
    user.removeRecipeToCook(recipe);
    expect(user.recipesToCook).to.deep.equal([]);
  });
  ///////////////////

});
