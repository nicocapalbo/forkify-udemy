export const elements = {
    searchForm: document.querySelector('.search'),
    searchField: document.querySelector('.search__field'),
    resultsList: document.querySelector('.results__list'),
    resultsPages: document.querySelector('.results__pages'),
    resultRecipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')

}


export const renderWheel = (parent) => {
    const loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div> 
    `;
    parent.insertAdjacentHTML('afterbegin', loader );
    
}

export const removeWheel = () => {
    const loader = document.querySelector('.loader')
    loader.remove();
}