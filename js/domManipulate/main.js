import { promoItems } from '../../promoCarousel.js'


//Carousel 
const track = document.querySelector('.main__carousel__track');
const prevButton = document.querySelector('.main__carousel__button--prev');
const nextButton = document.querySelector('.main__carousel__button--next');
const progressBar = document.querySelector('.main__carousel__progress');

let currentIndex = 0;
let timeout;

const carouselPromo = document.querySelector('[data-promo]');

export function createListCarousel(image, title) {
    const promoItem = document.createElement('div');
    promoItem.className = 'main__carousel__item'
    promoItem.innerHTML = `<img class="responsive-img" src="${image}" alt="${title}">`;
    return promoItem
}
const addPromoItem = () => {
    promoItems.forEach(element => {
        const promoItem = createListCarousel(element.imageUrl, element.title);
        carouselPromo.appendChild(promoItem);
    });
}
addPromoItem();

const items = Array.from(track.children);


function updateCarousel() {
    const position = currentIndex * items[0].clientWidth;
    track.style.transform = `translateX(-${position}px)`;
}

function showNextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
    resetProgressBar();
}

function showPrevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
    resetProgressBar();
}

function resetProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
    }, 0);

    clearTimeout(timeout);
    timeout = setTimeout(showNextItem, 5000);
}

function stopCarousel() {
    clearTimeout(timeout);
}

nextButton.addEventListener('click', () => {
    stopCarousel();
    showNextItem();
});

prevButton.addEventListener('click', () => {
    stopCarousel();
    showPrevItem();
});

resetProgressBar();

//Overlay Modal Form
const addItemButton = document.querySelector('[data-addButton]');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

addItemButton.addEventListener('click', () => {
    overlay.classList.add('active');
    modal.classList.add('active');
});
overlay.addEventListener('click', () => {
    closeModal();
})

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

const asideButtonSearch = document.querySelector('[data-buttonAsideSearch]');
const mainSearchBar = document.querySelector('[data-search]');


//Aside functions
asideButtonSearch.addEventListener('click', () => {
    mainSearchBar.focus();
});