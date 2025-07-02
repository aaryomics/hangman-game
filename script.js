//WORD LIST WITH HINTS
const words = [
  { word: 'PETAL', hint: 'Part of a flower' },
  { word: 'BLOSSOM', hint: 'Another word for bloom' },
  { word: 'FLOWER', hint: 'It blooms in gardens' },
  { word: 'LILAC', hint: 'A purple flower, also the name of a colour' },
  { word: 'DAISY', hint: 'White petals, yellow center' },
  { word: 'STEM', hint: 'Supports the flower' },
  { word: 'GARDEN', hint: 'Where many flowers grow' },
  { word: 'CANDLE', hint: "It glows and smells nice" },
  { word: 'PILLOW', hint: "Soft place for your head" },
  { word: 'CUPCAKE', hint: "Tiny frosted dessert" },
  { word: 'COCOA', hint: "Warm chocolate drink" },
  { word: 'BLANKET', hint: "Wrap up when it's cold" },
  { word: 'BUTTON', hint: "Fastens your cardigan" },
  { word: 'RIBBON', hint: "Pretty bow for gifts or hair" },
  { word: 'SUGAR', hint: "Sweet crystal" },
  { word: 'KITTEN', hint: "Tiny meow" },
  { word: 'HUGS', hint: "Warm, squishy comfort" },
  { word: 'WINGS', hint: "What do you need to fly" },
  { word: 'MAGIC', hint: "Wands and spells and stars" },
  { word: 'LUNAR', hint: "Related to the moon" },
  { word: 'CLOUD', hint: "Soft and floaty in the sky" },
  { word: 'DREAM', hint: "What happens when you sleep" },
  { word: 'CRYSTAL', hint: "Pretty and see-through" },
  { word: 'WISH', hint: "Blow out candles and make one" },
  { word: 'STAR', hint: "Shines in the night sky" },
  { word: 'MOON', hint: "Glows when the sun is asleep" }
];

//RANDOM WORD SELECTION
const chosen = words[Math.floor(Math.random() * words.length)];
const word = chosen.word;
const hintMessage = chosen.hint;

//GAME STATE
let guessed = [];
let wrong = 0;
const maxWrong = 5;

//ELEMENTS
const wordDiv = document.getElementById('word');
const keyboard = document.getElementById('keyboard');
const attemptsText = document.getElementById('attempts');
const hintText = document.getElementById('hint');

//Click Sound
const clickSound = new Audio('assets/click.mp3');


//SHOW PETALS
function showAllPetals() {
  for (let i = 1; i <= maxWrong; i++) {
    const petal = document.getElementById(`petal${i}`);
    if (petal) petal.style.display = 'block';
  }
}

//HIDE PETALS
function hidePetal(index) {
  const petal = document.getElementById(`petal${index}`);
  if (petal) petal.style.display = 'none';
}

//GUESSED AND UNGUESSED LATTERS
function displayWord() {
  wordDiv.innerHTML = word
    .split('')
    .map(letter => (guessed.includes(letter) ? letter : '_'))
    .join(' ');
}

function checkLetter(letter) {
  if (word.includes(letter)) {
    guessed.push(letter);
  } else {
    wrong++;
    hidePetal(wrong);
    updateAttempts();
  }

  displayWord();
  checkHintTrigger();
  checkGameEnd();
}

//ATTEMTS LEFT
function updateAttempts() {
  const attemptsLeft = maxWrong - wrong;
  attemptsText.textContent = `Attempts left: ${attemptsLeft}`;
}

//HINT
function checkHintTrigger() {
  if ((maxWrong - wrong) === 2) {
    hintText.textContent = `Hint: ${hintMessage}`;
    hintText.classList.remove('hidden');
  }
}

function checkGameEnd() {
  const current = word.split('').every(letter => guessed.includes(letter));
  if (current) {
    setTimeout(() => alert('You win!🪅 Refresh the page to play again!'), 100);
    disableAllButtons();
  } else if (wrong >= maxWrong) {
    setTimeout(() => alert(`Game over. Word was ${word}! Refresh the page to play again!`), 100);
    disableAllButtons();
  }
}

// ⛔️ Disable all buttons
function disableAllButtons() {
  document.querySelectorAll('.keyboard button').forEach(btn => btn.disabled = true);
}

//KEYBOARD
function setupKeyboard() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  keyboard.innerHTML = '';

  alphabet.split('').forEach(letter => {
    const button = document.createElement('button');
    button.innerText = letter;

    button.addEventListener('click', () => {
      // 🔊 Play click sound
      clickSound.currentTime = 0;
      clickSound.play();

      // Disable the button and check the letter
      button.disabled = true;
      checkLetter(letter);
    });

    keyboard.appendChild(button);
  });
}

//Start Game
displayWord();
setupKeyboard();
showAllPetals();
updateAttempts();
