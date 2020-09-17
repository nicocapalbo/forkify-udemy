import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import {elements, renderWheel, removeWheel} from "./views/base";

// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes

const state = {};
window.state = state;

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
        recipeView.clearRecipe();
        renderWheel(elements.resultRecipe);

        // higlight recipe
        searchView.highlightSelected(id);
        
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
            removeWheel();
            // console.log(state.recipe);
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Something went wrong!');
        }
    }
}


// 'window' is the global scope, the whole window
// window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(e => { window.addEventListener(e, controlRecipe)});

// ************************
// LIST CONTROLLER
// ************************

const controlList = () => {
    // create new list if there is none existing
    if (!state.list) {
        state.list = new List();
    }

    // add ingredients to the list
    state.recipe.ingredients.forEach(element => {
        const item = state.list.addItem(element.count, element.unit, element.ingredient);
        listView.renderItem(item);
    });

}

// ************************
// LIKES CONTROLLER
// ************************

const controlLike = () => {
    if (!state.likes) {
        state.likes = new Likes(); 
    }
    
    console.log(state.likes);

    const currentID = state.recipe.id;
    console.log(currentID);
    
    if (!state.likes.isLiked(currentID)) {
        // add like 
        const newLike = state.likes.addLikes(currentID, state.recipe.title, state.recipe.author, state.recipe.img);
        // toggle like button
        // add like to UI list
        console.log(state.likes);
    } else {
        // delete like
        state.likes.deleteLikes(currentID);
        // toggle like button
        // delete like from UI list
        console.log(state.likes);
    }



}



// Handle DELETE and UPDATE list

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
     // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})



// recipe button clicks

elements.resultRecipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServing('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServing('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
    // console.log(state.recipe);
})


window.el = new List();
