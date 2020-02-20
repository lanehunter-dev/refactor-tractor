// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/apple-logo.png'

function fetchData() {
  let userData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData')
    .then((response) => response.json())
    .catch(error => console.log(error.message));
  let recipeData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
    .then((response) => response.json())
    .catch(error => console.log(error.message))
  let ingredientsData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
    .then((response) => response.json())
    .catch(error => console.log(error.message));

  return Promise.all([userData, recipeData, ingredientsData])
    .then(response => {
      let dataObj = {};
      dataObj.userData = response[0].wcUsersData;
      dataObj.recipeData = response[1].recipeData;
      dataObj.ingredientsData = response[2].ingredientsData;
      return dataObj
    })
    .catch(error => console.log(error.message));
}


export default fetchData;
