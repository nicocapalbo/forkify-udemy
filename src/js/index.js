import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import {elements, renderWheel, removeWheel} from "./views/base";

// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes

const state = {};

// ************************
// SEARCH CONTROLLER
// ************************

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getItem(); //'pizza' // this value needs to come from the VIEW searchView.js
    // console.log(query);
    
    if (query) {
        // 2) New search object and add it to STATE object
       state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderWheel(elements.resultsList);
 
        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results to UI
            // console.log(state.search.result);
            removeWheel();
            searchView.renderResults(state.search.result);

        } catch (err) {
            removeWheel();
            alert(err);
        }
        
    }

};


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(element.srcElement[0].value);
    controlSearch();
});

elements.resultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
       const goto = parseInt(btn.dataset.goto, 10);
       searchView.clearResults();
       searchView.renderResults(state.search.result, goto);
    }

});

// const search = new Search('pizza');
// console.log(search);
// search.getResults();

// ************************
// RECIPE CONTROLLER
// ************************

// const recip = new Recipe('35626');
// recip.getRecipe();
// console.log(recip);

// 'async' because we need to wait for the information
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    // only run if an ID was captured/exists
    if (id) {
        // Prepare UI for change
        
        
        // Create new recipe
        state.recipe = new Recipe(id);
        
        try {
            // 'await' for the info to arrive
            await state.recipe.getRecipe();
            
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            state.recipe.perseIngredients();

            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Something went wrong!');
        }
    }
}


// 'window' is the global scope, the whole window
// window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(e => { window.addEventListener(e, controlRecipe)});

