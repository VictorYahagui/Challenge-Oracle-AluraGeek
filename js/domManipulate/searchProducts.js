import { getProductsList } from '../requests.js';
import { createCardProduct } from './displayProducts.js';

const searchButton = document.querySelector('[data-search-button]');
const searchInput = document.querySelector('[data-search]');

export const searchProduct = async (event, search) => {
    event.preventDefault();
    try {
        const filteredProduct = await getProductsList(search);
        const list = document.querySelector("[data-list]");
        if (list) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }
        filteredProduct.forEach(element => {
            const productCard = createCardProduct(element.id, element.name, element.image, element.price, element.type);
            list.appendChild(productCard);
        })
        searchInput.value = '';
    } catch (error) {
        console.error("Error when searching for data", error.message);
    }
}
searchButton.addEventListener("click", (event) => {
    searchProduct(event, searchInput);
});
