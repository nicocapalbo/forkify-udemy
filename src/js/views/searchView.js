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

export const renderResults = (results) => {
    results.forEach(renderRecipe);
};