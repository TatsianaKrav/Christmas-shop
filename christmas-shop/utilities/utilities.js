import { renderModal } from "./modal.js";

export function createElement(tagName, className = "", text = "") {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerText = text;

    return element;
}


export function navigate(links) {
    links.forEach(link => {
        link.addEventListener('click', (e) => goTo(e, link));
    })
}


function goTo(e, link) {
    e.preventDefault();
    setTimeout(() => {
        window.location = link.href;
    }, 600);
}

export function renderCards(parent, arr, amount = '') {
    parent.innerHTML = '';
    let arrOfGifts = [];

    if (amount) {
        const randomNums = getRandom(amount, arr.length);
        arrOfGifts = randomNums.map(num => arr[num]);
    } else {
        arrOfGifts = shuffleArray(arr);
    }


    for (let i = 0; i < arrOfGifts.length; i++) {
        const card = arrOfGifts[i];
        const giftCard = renderCard(card, false);
        parent.append(giftCard);

        giftCard.addEventListener('click', (e) => {
            const cardData = e.currentTarget.getAttribute('data');
            const currentCard = arr.find(el => el.name === cardData);

            renderModal(currentCard);
        });
    }
}

export function renderCard(card, modalFlag) {
    const category = card.category.split(' ').pop().toLowerCase();
    const pathToImg = `../assets/images/gifts/gift-for-${category}.png`;
    const giftCard = createElement('div', 'gift-card');
    giftCard.setAttribute('data', card.name);
    const cardImage = createElement('div', 'gift-card-image');
    const image = createElement('img');
    image.setAttribute('src', pathToImg);
    image.setAttribute('alt', 'gift');
    cardImage.append(image);

    const cardInfo = createElement('div', 'gift-card-info');
    const categoryElem = createElement('span', 'gift-purpose', card.category);
    categoryElem.classList.add(category);
    const titleContent = createElement('h3', 'gift-card-title', card.name);
    cardInfo.append(categoryElem, titleContent);
    giftCard.append(cardImage, cardInfo)

    if (modalFlag) {
        const giftDescriptionText = createElement('p', 'gift-description', card.description);
        cardInfo.append(giftDescriptionText);

        const giftSuperEl = createElement('div', 'gift-super');
        cardInfo.append(giftSuperEl);

        const superTitle = createElement('p', 'super-title', 'Adds superpowers to:');
        const powerdsEl = createElement('div', 'powerds');
        giftSuperEl.append(superTitle, powerdsEl);

        const superpowers = Object.entries(card.superpowers);

        for (let i = 0; i < superpowers.length; i++) {
            const powerName = superpowers[i][0];
            const powerValue = superpowers[i][1];
            const snowflakesAmountRed = powerValue.slice(1) / 100;

            const power = createElement('div', 'power');
            powerdsEl.appendChild(power);

            const powerTitle = createElement('span', 'power-title', powerName[0].toUpperCase() + powerName.slice(1));
            const powerInfo = createElement('div', 'power-info');

            const powerValueEl = createElement('span', 'power-value', powerValue);
            const snowflakes = createElement('div', 'snowflakes');
            let snowflake = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_11002_26)">
                                    <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_11002_26">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                `

            for (let i = 0; i < 5; i++) {
                if (i < snowflakesAmountRed) {
                    snowflakes.insertAdjacentHTML('beforeend', snowflake);
                } else {
                    snowflake = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <g clip-path="url(#clip0_4112_60)">
                                   <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646" fill-opacity="0.1" />
                                   </g>
                                   <defs>
                                   <clipPath id="clip0_4112_60">
                                   <rect width="16" height="16" fill="white" />
                                   </clipPath>
                                   </defs>
                                </svg>
                                `
                    snowflakes.insertAdjacentHTML('beforeend', snowflake);
                }
            }


            powerInfo.append(powerValueEl, snowflakes);
            power.append(powerTitle, powerInfo);
        }

    }

    return giftCard;
}

export function getCurrentTime(date, timerID, daysEl, hoursEl, minEl, secEl) {
    const currentDate = new Date().getTime();
    const diffInMs = date - currentDate;

    if (diffInMs <= 0) {
        clearInterval(timerID);
        daysEl.innerText = '0';
        hoursEl.innerText = '0';
        minEl.innerText = '0';
        secEl.innerText = '0';
    }

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hoursMs = diffInMs % (1000 * 60 * 60 * 24);
    const hours = Math.floor(hoursMs / 3600000);
    const minMs = hoursMs % 3600000;
    const min = Math.floor(minMs / 60000);
    const sec = Math.floor(minMs % 60000 / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minEl.innerText = min;
    secEl.innerText = sec;
}

function getRandom(amount, length) {
    const randomNums = [];

    while (randomNums.length < amount) {
        let random = Math.floor(Math.random() * (length - 1));
        if (!randomNums.includes(random)) randomNums.push(random);
    }

    return randomNums;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


console.log('Для корректной проверки на экране < 1440px в DevTools выберите Мобильный режим - 1440 - Mobile(no touch) (В ТЗ:Please note that when checking the work in a window with a width of 1440 pixels, the layout may compress by approximately 17 pixels. This happens because part of the layout space is consumed by the vertical scroll (17 pixels - the standard scroll size for Google Chrome)) P.S В режиме Mobile(no touch) hover будет срабатывать. Для проверки отсутствия hover на моб устройствах нужно выбирать режим Mobile.')