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
      
      // 번호 구간에 따른 대한민국 공식 로또 색상 클래스 추가
      if (number >= 1 && number <= 10) {
        numberElement.classList.add('ball-color-1');
      } else if (number >= 11 && number <= 20) {
        numberElement.classList.add('ball-color-2');
      } else if (number >= 21 && number <= 30) {
        numberElement.classList.add('ball-color-3');
      } else if (number >= 31 && number <= 40) {
        numberElement.classList.add('ball-color-4');
      } else {
        numberElement.classList.add('ball-color-5');
      }

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

// Function to update Utterances theme dynamically
function updateUtterancesTheme(theme) {
  const utterancesTheme = theme === 'dark' ? 'github-dark' : 'github-light';
  const utterancesFrame = document.querySelector('.utterances-frame');
  if (utterancesFrame) {
    utterancesFrame.contentWindow.postMessage({
      type: 'set-theme',
      theme: utterancesTheme
    }, 'https://utteranc.es');
  }
}

const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
  themeToggleBtn.textContent = '☀️ Light Mode';
}

// Load Utterances dynamically
document.addEventListener('DOMContentLoaded', () => {
  const utterancesTheme = body.getAttribute('data-theme') === 'dark' ? 'github-dark' : 'github-light';
  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.setAttribute('repo', 'zzazan-bro/product-zzazan-study');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('theme', utterancesTheme);
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  
  const commentsContainer = document.querySelector('.comments-container');
  if (commentsContainer) {
    commentsContainer.appendChild(script);
  }
});

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

  // Update Utterances theme dynamically
  updateUtterancesTheme(targetTheme);
});
