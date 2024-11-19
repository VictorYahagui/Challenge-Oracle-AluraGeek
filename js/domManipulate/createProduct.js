import { postProduct } from '../requests.js';

const form = document.querySelector("[data-form]");


async function addProduct(event) {
    event.preventDefault();
    const name = document.querySelector("[data-form-name]").value;
    const image = document.querySelector("[data-form-img]").value;
    const price = document.querySelector("[data-form-price]").value;
    const type = document.querySelector("[data-form-type]").value;

    try {
        await postProduct(name, image, price, type);
    } catch (error) {
        alert("Error on add video", error.message);
    }
}

form.addEventListener("submit", addProduct);

