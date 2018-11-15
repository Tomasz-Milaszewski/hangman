function startGame() {
    const playButton = document.querySelector('.play-button')
    playButton.addEventListener('click', () => {
        document.querySelectorAll('span').forEach(function (node) {
            node.remove();
        });
        play();
        setStartValues();
        playButton.innerHTML = 'Restart';
    });
}
startGame();

function setStartValues() {
    const lettersUsedSpan = document.createElement('span');
    lettersUsedSpan.innerHTML = '';
    const lettersLeftSpan = document.createElement('span');
    lettersLeftSpan.innerHTML = 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z';
    const roundSpan = document.createElement('span');
    roundSpan.innerHTML = '';

    const lettersUsedPar = document.querySelector('.letters-used');
    const lettersLeftPar = document.querySelector('.letters-left');
    const roundPar = document.querySelector('.round');

    lettersUsedPar.appendChild(lettersUsedSpan);
    lettersLeftPar.appendChild(lettersLeftSpan);
    roundPar.appendChild(roundSpan);
}

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
        letterBox.classList.add('password-letter-span');
        letterBox.innerHTML = '';
        passwordBox.appendChild(letterBox);
    }
    console.log(password);
}

function handleInput(password) {
    const form = document.querySelector(".letter-form")
    const input = document.querySelector(".letter-input")
    const reg = /^[a-z]+$/i;
    var roundNumber = 0;

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
            handleLettersUsedAndLeft(password, input.value);
            input.value = '';
            input.placeholder = "Your letter here";
            input.classList.remove('warning');

            roundNumber++;
            let roundSpan = document.querySelector('p.round span');
            roundSpan.innerHTML = roundNumber;
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

function handleLettersUsedAndLeft(password, letter) {
    let lettersUsedSpan = document.querySelector('p.letters-used span');
    let lettersUsed = lettersUsedSpan.innerHTML;
    lettersUsedSpan.innerHTML = (lettersUsed === '') ? letter : lettersUsed.concat(', ', letter);

    let lettersLeftSpan = document.querySelector('p.letters-left span');
    lettersLeftSpan.innerHTML = 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z';





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