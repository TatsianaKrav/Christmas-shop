import gifts from '../data/gifts.json' with {type: 'json'};
import { handleBurger } from "../utilities/header.js";
import { renderCards, getCurrentTime } from '../utilities/utilities.js';

const cardsAmount = 4;
let slidersCount = 0;
let slidersCountClick = 0;
let offset = 0;
let currentOffset = 0;

const giftCardsWrapp = document.querySelector('.gift-cards-wrapper');
const btnBack = document.querySelector('.slider-btn.btn-prev');
const btnNext = document.querySelector('.slider-btn.btn-next');
const slidersCont = document.querySelector('.slider .container');
const slidersWrapp = document.querySelector('.sliders-wrapper');

let currentScreenWidth = document.documentElement.clientWidth;
let paddLeft = parseInt(window.getComputedStyle(slidersCont).paddingLeft);
let paddRight = parseInt(window.getComputedStyle(slidersCont).paddingRight);

const totalSLidersWidth = parseInt(window.getComputedStyle(slidersWrapp).width);
let visibleWidth = parseInt(window.getComputedStyle(slidersCont).width);


init();

function init() {
    checkScreenSize();
    visibleWidth = parseInt(window.getComputedStyle(slidersCont).width) - paddRight - paddLeft;
    offset = Math.abs(Math.floor((totalSLidersWidth - visibleWidth) / slidersCount));


    handleBurger();
    renderCards(giftCardsWrapp, gifts, cardsAmount);
    initTimer();
}

window.addEventListener('resize', () => {
    currentScreenWidth = document.documentElement.clientWidth;

    slidersCountClick = 0;
    btnBack.classList.remove('active');
    btnNext.classList.add('active');
    mooveSlides();
    checkScreenSize();

    paddLeft = parseInt(window.getComputedStyle(slidersCont).paddingLeft);
    paddRight = parseInt(window.getComputedStyle(slidersCont).paddingRight);

    visibleWidth = parseInt(window.getComputedStyle(slidersCont).width) - paddRight - paddLeft;
    offset = Math.floor((totalSLidersWidth - visibleWidth) / slidersCount);
})

function initTimer() {
    const daysEl = document.querySelectorAll('.count')[0];
    const hoursEl = document.querySelectorAll('.count')[1];
    const minEl = document.querySelectorAll('.count')[2];
    const secEl = document.querySelectorAll('.count')[3];

    const newYearDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0, 0));
    let timerID = null;


    getCurrentTime(newYearDate, timerID, daysEl, hoursEl, minEl, secEl);
    timerID = setInterval(getCurrentTime.bind(null, newYearDate, timerID, daysEl, hoursEl, minEl, secEl), 1000);
}


btnBack.addEventListener('click', (e) => {
    const target = e.currentTarget;

    if (slidersCountClick > 0) {
        slidersCountClick--;
        mooveSlides();

        if (slidersCountClick < slidersCount && slidersCountClick > 0) {
            btnNext.classList.add('active');
        }

        if (slidersCountClick === 0) {
            btnBack.classList.remove('active');
        }
    }
})


btnNext.addEventListener('click', (e) => {
    const target = e.currentTarget;

    if (slidersCountClick < slidersCount) {
        slidersCountClick++;
        mooveSlides();

        if (slidersCountClick > 0) {
            btnBack.classList.add('active');
        }

        if (slidersCountClick === slidersCount) {
            target.classList.remove('active');
        }
    }
})


function mooveSlides() {
    currentOffset = offset * slidersCountClick;
    slidersWrapp.style.transform = `translateX(${-currentOffset}px)`;
}


function checkScreenSize() {
    if (currentScreenWidth > 768) {
        slidersCount = 3;
    } else if (currentScreenWidth <= 768 && currentScreenWidth >= 380) {
        slidersCount = 6;
    }
}