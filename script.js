let cardTag = [];
let cardPosition;
let arrPosition = [];
let step = 0;
let totalStep = 0;
let firstCard;
let indexGlobal = 0;
let fullTime = 80;
const resultContainer = document.querySelector('.result-container');
const button = document.createElement('button');
const select = document.createElement('select');
const result = document.createElement('div');
const levelContainer = document.createElement('div');
const levelLabel = document.createElement('div');
let temp = true;
let countPairs = 0;
let timerID;
let currentTime;
function decTime() {
  // eslint-disable-next-line no-use-before-define
  currentTime--;
  // eslint-disable-next-line no-use-before-define
  if (currentTime < 1) {
    clearInterval(timerID);
    // eslint-disable-next-line no-use-before-define
    currentTime = fullTime;
    // eslint-disable-next-line no-use-before-define
    finalGame('timeout');
  }
  // eslint-disable-next-line no-use-before-define
  return currentTime;
}

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
}

function doClick(index) {
  step++;
  totalStep++;
  indexGlobal = index;
  if (cardTag[index].classList.value === 'card card--open') {
    step--;
    totalStep -= 1;
  }
  firstCard = (step === 1) ? cardTag[index] : firstCard;
  // console.log('totalStep', Math.floor(totalStep / 2));
  if (step < 3 && temp) {
    cardTag[index].classList.add('card--open');
    const checkClass = (firstCard.classList.value === 'card card--open');
    if (cardTag[index].textContent === firstCard.textContent && step === 2 && checkClass) {
      countPairs++;
      cardTag[index].classList.add('card--success');
      firstCard.classList.add('card--success');
      if (countPairs === 8) {
        // eslint-disable-next-line no-use-before-define
        finalGame('win');
        //   result.innerHTML = `Вы выиграли! Всего ходов: ${totalStep / 2}`;
        //   result.classList.add('result');
        //   resultContainer.append(result);
        //   makeField();
      }
      step = 0;
      temp = true;
      openCard();
    }
    if (step === 2) {
      setTimeout(closeCard, 200);
    }
  }
}

function domTree() {
  result.classList.add('result');
  resultContainer.append(result);
  button.classList.add('button');
  levelContainer.classList.add('level-container');
  resultContainer.append(levelContainer);
  resultContainer.append(button);
}

function getPosition() {
  let j = 0;
  arrPosition = [];

  do {
    cardPosition = Math.floor(Math.random() * 16);

    if (arrPosition.indexOf(cardPosition) === -1) {
      arrPosition.push(cardPosition);
      j++;
    }
  } while (j < 16);
}

function makeField() {
  // eslint-disable-next-line no-use-before-define
  currentTime = fullTime;
  totalStep = 0;
  timerID = setInterval(decTime, 1000);
  result.remove();
  button.remove();
  levelContainer.remove();

  getPosition();
  for (let i = 1; i <= 8; i++) {
    createCard(i, arrPosition[i - 1]);
  }

  for (let i = 1; i <= 8; i++) {
    createCard(i, arrPosition[i + 7]);
  }
  openCard();
  for (let index = 0; index < 16; index++) {
    cardTag[index].onclick = () => {
      doClick(index);
    };
  }
}

function finalGame(flag) {
  temp = true;
  countPairs = 0;
  for (let index = 0; index < 16; index++) {
    cardTag[index].onclick = () => null;
  }
  if (flag === 'timeout') {
    result.innerHTML = 'Вам не хватило времени!';
  } else {
    result.innerHTML = `Вы выиграли! Всего ходов: ${Math.floor(totalStep / 2)}`;
    clearInterval(timerID);
  }
  button.innerHTML = 'Сыграть еще раз?';
  domTree();
  button.addEventListener('click', () => {
    for (const element of cardTag) {
      element.classList.replace('card--open', 'card');
      element.classList.replace('card--success', 'card');
    }
    result.remove();
    button.remove();
    levelContainer.remove();
    clearInterval(timerID);
    makeField();
  });
}

button.innerHTML = 'Начать игру';
select.innerHTML = '<option value="80">Легкий (80c)</option><option value="50">Средний (50c)</option><option value="25">Сложный (25c)</option>';
levelLabel.classList.add('level-label');
levelLabel.innerHTML = 'Уровень игры';
levelLabel.classList.add('level-label');
levelContainer.append(levelLabel);
levelContainer.append(select);
domTree();

// result.classList.add('result');
// resultContainer.append(result);
// button.classList.add('button');

// levelContainer.classList.add('level-container');
// levelLabel.classList.add('level-label');
// levelLabel.innerHTML = 'Уровень игры';
// levelContainer.append(levelLabel);
// levelContainer.append(select);
// resultContainer.append(levelContainer);
// resultContainer.append(button);
select.addEventListener('change', () => {
  fullTime = Number(select.value);
});
button.addEventListener('click', makeField);
