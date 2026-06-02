function generateLotteryNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  numbers.sort((a, b) => a - b);
  return numbers;
}

function displayFiveGames() {
  const numbersDisplay = document.getElementById('numbers-display');
  numbersDisplay.innerHTML = ''; // Clear previous numbers

  for (let g = 1; g <= 5; g++) {
    const gameRow = document.createElement('div');
    gameRow.classList.add('game-row');

    const label = document.createElement('span');
    label.classList.add('game-label');
    label.textContent = `GAME ${g}`;
    gameRow.appendChild(label);

    const ballsContainer = document.createElement('div');
    ballsContainer.classList.add('balls-container');

    const numbers = generateLotteryNumbers();
    numbers.forEach((number, index) => {
      const numberElement = document.createElement('span');
      numberElement.classList.add('lottery-number');
      numberElement.textContent = number;
      // 시간차 등장 애니메이션 지연시간 설정
      numberElement.style.animationDelay = `${(g - 1) * 150 + index * 50}ms`;
      ballsContainer.appendChild(numberElement);
    });

    gameRow.appendChild(ballsContainer);
    numbersDisplay.appendChild(gameRow);
  }
}

document.getElementById('generate-button').addEventListener('click', () => {
  displayFiveGames();
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    themeToggleBtn.textContent = '☀️ Light Mode';
  }
}

themeToggleBtn.addEventListener('click', () => {
  let targetTheme = 'light';
  if (body.getAttribute('data-theme') !== 'dark') {
    targetTheme = 'dark';
  }

  body.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);

  if (targetTheme === 'dark') {
    themeToggleBtn.textContent = '☀️ Light Mode';
  } else {
    themeToggleBtn.textContent = '🌙 Dark Mode';
  }
});
