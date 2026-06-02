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

function displayNumbers(numbers) {
  const numbersDisplay = document.getElementById('numbers-display');
  numbersDisplay.innerHTML = ''; // Clear previous numbers
  numbers.forEach(number => {
    const numberElement = document.createElement('span');
    numberElement.classList.add('lottery-number');
    numberElement.textContent = number;
    numbersDisplay.appendChild(numberElement);
  });
}

document.getElementById('generate-button').addEventListener('click', () => {
  const lotteryNumbers = generateLotteryNumbers();
  displayNumbers(lotteryNumbers);
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
