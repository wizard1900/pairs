let cardTag = [];
let cardPosition;
const arrPosition = [];
let step = 0;
let totalStep = 0;
let firstCard;
let indexGlobal = 0;
const button = document.createElement('button');
const result = document.createElement('div');
const cardWrapper = document.querySelectorAll('.cards-wrapper');
let temp = true;
let countPairs = 0;

function reloadApp() {
  temp = false;
  button.innerHTML = 'Сыграть еще раз?';
  cardWrapper[3].after(button);
  button.classList.add('button');
  button.addEventListener('click', () => {
    window.location.reload();
  });
}

function createCard(cardNumber, cardPos) {
  cardTag = document.querySelectorAll('.card');
  cardTag[cardPos].textContent = cardNumber;
}

function openCard() {
  cardTag = document.querySelectorAll('.card');
  step = 0;

  setTimeout(reloadApp, 69000);
  for (let index = 0; index < 16; index++) {
    cardTag[index].addEventListener('click', function () {
      step++;
      totalStep++;

      indexGlobal = index;
      if (cardTag[index].classList.value === 'card card--open') {
        step--;
        totalStep = totalStep - 1;
      }
      firstCard = (step === 1) ? cardTag[index] : firstCard;
      if (step < 3 && temp) {

        cardTag[index].classList.add('card--open');
        let checkClass = (firstCard.classList.value === 'card card--open');
        if (cardTag[index].textContent === firstCard.textContent && step === 2 && checkClass) {
          countPairs++;
          cardTag[index].classList.add('card--success');
          firstCard.classList.add('card--success');
          if (countPairs === 8) {
            result.innerHTML = `Вы выиграли! Всего ходов: ${totalStep / 2}`;
            result.classList.add('result');
            cardWrapper[3].after(result);

            reloadApp();
          }
          step = 0;
          temp = true;
          openCard();
        }
        if (step === 2) {
          let timerId = setTimeout(closeCard, 200);
        }
      }
    });
  }
}

function closeCard() {
  firstCard.classList.remove('card--open');
  cardTag[indexGlobal].classList.remove('card--open');
  firstCard = '';
  step = 0;
  // openCard();
}

function getPosition() {
  let j = 0;
  do {
    cardPosition = Math.floor(Math.random() * 16);

    if (arrPosition.indexOf(cardPosition) === -1) {
      arrPosition.push(cardPosition);
      j++;
    }
  } while (j < 16);
}

getPosition();

for (let i = 1; i <= 8; i++) {
  createCard(i, arrPosition[i - 1]);
}

for (let i = 1; i <= 8; i++) {
  createCard(i, arrPosition[i + 7]);
}
openCard();
