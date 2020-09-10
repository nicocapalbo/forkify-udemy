import Search from "./models/Search";
import * as searchView from "./views/searchView";
import {elements, renderWheel, removeWheel} from "./views/base";

// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes

const state = {};


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
 
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results to UI
        // console.log(state.search.result);
        removeWheel();
        searchView.renderResults(state.search.result);
        
    }

};


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(element.srcElement[0].value);
    controlSearch();
});



// const search = new Search('pizza');
// console.log(search);
// search.getResults();