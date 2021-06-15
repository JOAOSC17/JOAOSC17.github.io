const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = ''
const APP_ID = '56a347ce';
const APP_KEY = 'f8002d4f28982c306bf44c38bb608db4';
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value
    console.log(searchQuery);
    fetchAPI();
})
async function fetchAPI(){
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&lang=pt-BR`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generatHTML(data.hits);
    console.log(data);
}
function generatHTML(results){
    container.classList.remove('initial');
    let generateHTML = '';
    results.map(result =>{
        generateHTML += `<div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
        <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
    </div>`
    })
    searchResultDiv.innerHTML = generateHTML;
}