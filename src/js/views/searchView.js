//  BTN class: 'search__btn'
import {elements} from "./base";

// goes to BASE.js and brings the DOM element for the input field and returns its value
export const getItem = () => {
 return elements.searchField.value;
};

export const clearInput = () => {
    elements.searchField.value = '';
};

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.resultsPages.innerHTML = '';
};

const titleReducer = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) =>{
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;

}

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${titleReducer(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `

    elements.resultsList.insertAdjacentHTML('beforeend', markup);

};

const pagesButton = (page, type, pointer) => `
    <button class="btn-inline results__btn--${type}" data-goto="${page}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${pointer}"></use>
        </svg>
        <span>Page ${page}</span>
    </button>
    `;

const pageNum = (page, resultsTotal, resPerPage, ) => {
    const pages = Math.ceil(resultsTotal / resPerPage);

    let buttons;
    if (page === 1 && pages > 1) {
        // Only button for next page 
        buttons = pagesButton(page + 1, 'next', 'right');
    } else if (page < pages) {
        // Two buttons for previous and next page
        buttons = `
        ${pagesButton(page - 1, "prev", "left")}
        ${pagesButton(page + 1, "next", "right")}
        `
    } else if (page === pages && pages > 1) {
        // Only button for previous page
        buttons = pagesButton(page - 1, "prev", "left");
    };

    elements.resultsPages.insertAdjacentHTML('afterbegin', buttons)

};

export const renderResults = (results, page = 2, resPerPage = 10) => {
    let start = (page - 1) * resPerPage;
    // page 1, start = 0
    // page 2, start = 10
    // page 3, start = 20
    let end = page * resPerPage ;
    // page 1, end = 10
    // page 2, end = 20
    // page 3, end = 30
    
    // slice doesn't include the last value, it's `end - 1`
    results.slice(start, end).forEach(renderRecipe);
    pageNum(page, results.length, resPerPage);

};