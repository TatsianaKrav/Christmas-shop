import { navigate } from "./utilities.js";


const body = document.body;
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-wrapper');
const links = document.querySelectorAll('.menu-item a');
let sreenWidth = parseInt(window.innerWidth);

if (sreenWidth <= 768) {
    navigate(links);
}

window.addEventListener('resize', () => {
    sreenWidth = parseInt(window.innerWidth);
    if (sreenWidth <= 768) {
        navigate(links);
    } else {
        hideMenu();
    }
})



function hideMenu() {
    menu.classList.remove("showed");
    burger.classList.remove("opened");
    body.style.overflowY = "auto";
}

export function handleBurger() {
    if (!burger) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('opened');
        menu.classList.toggle('showed');

        burger.classList.contains("opened")
            ? body.style.overflowY = "hidden"
            :
            body.style.overflowY = "auto";
    })

    document.querySelectorAll(".menu *").forEach((item) => {
        item.addEventListener('click', hideMenu);
    });
}