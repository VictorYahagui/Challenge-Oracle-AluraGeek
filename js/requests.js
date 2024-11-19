import { fetchData } from './api.js';

const BASE_URL = 'http://localhost:3000'

export const getProductsList = async (searchData = '') => {
    const url = searchData ? `${BASE_URL}/products?q=${searchData}` : `${BASE_URL}/products`;
    return await fetchData(url);
};

export const postProduct = async (name, image, price, type) => {
    const url = `${BASE_URL}/products`;
    return await fetchData(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            image,
            price,
            type
        })
    });
};

export const deleteCardItem = async (id) => {
    const url = `${BASE_URL}/products/${id}`;
    return await fetchData(url, {
        method: "DELETE"
    });
};