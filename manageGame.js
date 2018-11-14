function startGame() {
    const playButton = document.querySelector('.play-button')
    playButton.addEventListener('click', () => {
        document.querySelectorAll('span').forEach(function (node) {
            node.remove();
        });
        play();
        playButton.innerHTML = 'Restart';
    });
}
startGame();

function play() {
    getPassword(manageGame);
}

function manageGame(password) {
    displayEmptyPassword(password);
    handleInput(password);
}

function displayEmptyPassword(password) {
    for (let i = 0; i < password.length; i++) {
        const letterBox = document.createElement('span');
        const passwordBox = document.querySelector('.password');
        letterBox.innerHTML = '';
        passwordBox.appendChild(letterBox);
    }
    console.log(password);
}

function handleInput(password) {
    const form = document.querySelector(".letter-form")
    const input = document.querySelector(".letter-input")
    const reg = /^[a-z]+$/i;

    form.addEventListener('submit', (event) => {
        if (input.value === '' || input.value.length > 1 || !reg.test(input.value)) {
            event.preventDefault();
            input.value = '';
            input.placeholder = "One english letter please";
            input.classList.add('warning');
        }
        else {
            console.log('inside else')
            event.preventDefault();
            handleValidInput(password, input.value);
            handleLetters(password, input.value);
            input.value = '';
            input.placeholder = "Your letter here";
            input.classList.remove('warning');
        }
    })
}

function handleValidInput(password, letter) {
    console.log('inside handleValidInput')
    console.log(password)
    console.log(letter)
    for (let i = 0; i < password.length; i++) {
        if (letter.toLowerCase() === password[i]) {
            let indexToShow = document.querySelector(`span:nth-child(${i + 1})`)
            console.log(indexToShow);
            indexToShow.innerHTML = password[i];
        }
    }
}

function handleLetters(password, letter) {
    var lettersLeft = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var lettersLeftCount = lettersLeft.length;
    var lettersUsed = [];
    var lettersUsedCount = lettersUsed.length;

    const lettersUsedSpan = document.createElement('span');
    const lettersUsedPar = document.querySelector('.letters-used');
    lettersUsedSpan.innerHTML = lettersUsed;
    lettersUsedPar.appendChild(lettersUsedSpan);
}

function getPassword(callback) {
    fetch('https://hangman-25d5c.firebaseio.com/nouns.json')
        .then(response => response.json())
        .then(passwords => {
            let password = passwords[Math.floor(Math.random() * passwords.length)];
            callback(password);
        })
}



//TODO: prevent double letter use 