import { getProductsList, deleteCardItem } from '../requests.js';
import { searchProduct } from '../domManipulate/searchProducts.js';

const list = document.querySelector("[data-list]");

export function createCardProduct(id, name, image, price, type) {
    const product = document.createElement('li');
    product.className = 'card-item';
    product.innerHTML = `
        <div class="card-item-img">
            <img class="responsive-img" src="${image}" alt="${name}">
        </div>
        <div class="card-item-info">
            <h3 class="card-item-info-name" title="${name}">
                ${name}
            </h3>
            <span class="card-item-info-type">${type}</span>
            <h4 class="card-item-info-price purple-color">${price}R$</h4>
                <div class="card-item-info-cartDelete">
                    <button class="card-item-info-cart">
                        <span class="material-symbols-outlined icon-gray font-size-large">
                            add_circle
                        </span>
                        Add to Cart
                    </button>
                    <button data-delete="${id}">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </div>
    `
    return product
}
export function createCategoriesList(type) {
    const category = document.createElement('li');
    category.className = 'aside__main-categories--list-item'
    category.innerHTML = `
        <button class="aside__main-categories--list-item-button" data-filterByCategory="${type}">
                <span class="material-symbols-outlined icon-large">
                    star
                </span>
            ${type}
        </button>
    `
    return category
}

const fetchAndDisplayProducts = async () => {
    try {
        const productsList = await getProductsList();
        productsList.forEach(product => {
            const productCard = createCardProduct(product.id, product.name, product.image, product.price, product.type);
            list.appendChild(productCard);
        })
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        document.getElementById('error-message').textContent =
            `Erro ao carregar os vídeos: ${error.message}`;
    }
}


fetchAndDisplayProducts();

list.addEventListener("click", async (event) => {
    const buttonWithDataDelete = event.target.closest("[data-delete]");

    if (buttonWithDataDelete) {
        const id = buttonWithDataDelete.getAttribute("data-delete");
        if (id) {
            await deleteCardItem(id);
            buttonWithDataDelete.closest("li").remove();
        }
    }
});

const listCategory = document.querySelector("[data-categories]");

const fetchAndAssembleTypeArray = async () => {
    try {
        const productsList = await getProductsList();
        const uniqueTypes = [...new Set(productsList.map(product => product.type))];
        uniqueTypes.forEach(category => {
            const categoriesList = createCategoriesList(category);
            listCategory.appendChild(categoriesList);
        })
    } catch (error) {
        console.error(error.message);
    }
}
fetchAndAssembleTypeArray();

listCategory.addEventListener('click', async (event) => {
    const category = event.target.closest('[data-filterByCategory]');
    if (category) {
        const type = category.getAttribute('data-filterByCategory');
        await searchProduct(event, type);
    }

})



