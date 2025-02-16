import gifts from '../data/gifts.json' with {type: 'json'};
import { handleBurger } from "../utilities/header.js";
import { renderCards } from "../utilities/utilities.js";

let curretWidthScreen = document.documentElement.clientWidth;

const upBtn = document.querySelector(".up-btn");
const tabs = document.querySelectorAll('input');
const giftCardsWrapp = document.querySelector('.gift-cards-wrapper');

init();

function init() {
    handleBurger();
    renderCards(giftCardsWrapp, gifts);
    switchCategory();

    if (curretWidthScreen <= 768) {
        handleUpBtn();
    } else {
        upBtn.style.opacity = '0';
    }
}


window.addEventListener('resize', function () {
    curretWidthScreen = document.documentElement.clientWidth;

    if (curretWidthScreen <= 768) {
        handleUpBtn();
    } else {
        upBtn.style.opacity = '0';
    }
});

function switchCategory() {

    tabs.forEach(tab => {
        tab.addEventListener('change', function (e) {
            if (tab.checked) {
                const category = e.target.nextElementSibling.innerText;

                let chosenGifts = gifts.filter(gift => gift.category.toUpperCase() === category);
                chosenGifts = chosenGifts.length > 0 ? chosenGifts : [...gifts];
                renderCards(giftCardsWrapp, chosenGifts);
            }
        })
    })
}

function handleUpBtn() {
    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        scrollY > 300 && curretWidthScreen <= 768 ? upBtn.style.opacity = '1' : upBtn.style.opacity = '0';
    });
}