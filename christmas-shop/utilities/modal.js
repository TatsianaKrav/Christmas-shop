import { createElement, renderCard } from "./utilities.js";

const parent = document.querySelector('.modal-wrapper');


export function renderModal(card) {
    parent.innerHTML = '';

    const modalWindow = createElement('div', 'modal-window');
    parent.appendChild(modalWindow);

    const closeModal = createElement('div', 'close-modal');
    closeModal.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            `;

    closeModal.addEventListener('click', closeModalWindow);



    const giftCard = renderCard(card, true);
    modalWindow.append(closeModal, giftCard);

    showPopup();
}

parent.addEventListener('click', (e) => {
    if (e.target === parent) {
        closeModalWindow();
    }
})

function closeModalWindow() {
    parent.style.opacity = 0;
    parent.style.visibility = 'hidden';
    parent.innerHTML = '';
    document.body.style.overflowY = 'auto';
}


function showPopup() {
    parent.style.opacity = 1;
    parent.style.visibility = 'visible';
    document.body.style.overflowY = 'hidden';
}