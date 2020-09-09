import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.recipes);
        } catch (error) {
            alert(error);
        }
    }
    
    // async getRecipe() {
    //     try {
    //         const ids = await axios (`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
    //         this.ingred = ids.data.recipe.ingredients;
    //         console.log(this.ingred);
    //     } catch (error) {
    //         alert(error);
    //     }
    // }
}
