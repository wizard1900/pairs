let cardTag = [];
let cardPosition;
const arrPosition = [];
let step = 0;
let totalStep = 0;
let firstCard;
let indexGlobal = 0;
const resultContainer = document.querySelector('.result-container');
const button = document.createElement('button');
const result = document.createElement('div');
let temp = true;
let countPairs = 0;
const fullTime = 69000;

function createCard(cardNumber, cardPos) {
  cardTag = document.querySelectorAll('.card');
  cardTag[cardPos].textContent = cardNumber;
}

function openCard() {
  cardTag = document.querySelectorAll('.card');
  step = 0;
}

function closeCard() {
  firstCard.classList.remove('card--open');
  cardTag[indexGlobal].classList.remove('card--open');
  firstCard = '';
  step = 0;
  // openCard();
}

function makeField() {
  const doClick = (index) => {
    step++;
    totalStep++;
    indexGlobal = index;
    if (cardTag[index].classList.value === 'card card--open') {
      step--;
      totalStep -= 1;
    }
    firstCard = (step === 1) ? cardTag[index] : firstCard;
    if (step < 3 && temp) {
      cardTag[index].classList.add('card--open');
      const checkClass = (firstCard.classList.value === 'card card--open');
      if (cardTag[index].textContent === firstCard.textContent && step === 2 && checkClass) {
        countPairs++;
        cardTag[index].classList.add('card--success');
        firstCard.classList.add('card--success');
        if (countPairs === 8) {
          result.innerHTML = `Вы выиграли! Всего ходов: ${totalStep / 2}`;
          result.classList.add('result');
          resultContainer.append(result);
          makeField();
        }
        step = 0;
        temp = true;
        openCard();
      }
      if (step === 2) {
        setTimeout(closeCard, 200);
      }
    }
  };

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
  for (let index = 0; index < 16; index++) {
    cardTag[index].addEventListener('click', () => {
      doClick(index);
    });
  }
}

function reloadApp() {
  temp = false;
  if (countPairs !== 8) {
    result.innerHTML = 'Вам не хватило времени!';
    result.classList.add('result');
    resultContainer.append(result);
  }
  button.innerHTML = 'Сыграть еще раз?';
  button.classList.add('button');
  resultContainer.append(button);
  button.addEventListener('click', () => {
    makeField();
  });
}

setTimeout(reloadApp, fullTime);
makeField();
