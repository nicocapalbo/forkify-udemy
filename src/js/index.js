import Search from "./models/Search";


// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes

const state = {};


const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza' // this value needs to come from the VIEW searchView.js

    if (query) {
        // 2) New search object and add it to STATE object
       state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results to UI
        console.log(state.search.result);
    }

};


document.querySelector('.search').addEventListener('submit', element => {
    element.preventDefault();
    // console.log(element.srcElement[0].value);
    controlSearch();
});



// const search = new Search('pizza');
// console.log(search);
// search.getResults();