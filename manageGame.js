var roundNumber = 0;
var missedCounter = 0;

function startGame() {
    const playButton = document.querySelector('.play-button')
    playButton.addEventListener('click', () => {
        document.querySelectorAll('span').forEach(function (node) {
            node.remove();
        });
        clearHangman()
        setStartValues();
        play();
        playButton.innerHTML = 'Restart';
        missedCounter = 0;
        roundNumber = 0;
    });
}
startGame();

function clearHangman() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(100, 50, 40, 110)
}

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

function getPassword(callback) {
    fetch('https://hangman-25d5c.firebaseio.com/nouns.json')
        .then(response => response.json())
        .then(passwords => {
            let password = passwords[Math.floor(Math.random() * passwords.length)];
            callback(password);
        })
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
    console.log(password);
    form.addEventListener('submit', (event) => {
        if (input.value === '' || input.value.length > 1 || !reg.test(input.value)) {
            event.preventDefault();
            input.value = '';
            input.placeholder = "One english letter please";
            input.classList.add('warning');
        } else {
            if (document.querySelector('p.letters-used span').innerHTML.includes(input.value)) {
                event.preventDefault();
                input.value = '';
                input.placeholder = "Wake up! It's been used!";
                input.classList.add('info');
            }
            else {
                event.preventDefault();
                handleValidInput(password, input.value);
                handleLettersUsedAndLeft(input.value);
                handleLetterCorrect(password, input.value);
                input.value = '';
                input.placeholder = "Your letter here";
                input.classList.remove('warning');
                input.classList.remove('info');

                roundNumber++;
                let roundSpan = document.querySelector('p.round span');
                roundSpan.innerHTML = roundNumber;
            }
        }
    })
}

function handleValidInput(password, letter) {
    for (let i = 0; i < password.length; i++) {
        if (letter.toLowerCase() === password[i]) {
            let indexToShow = document.querySelector(`span:nth-child(${i + 1})`)
            indexToShow.innerHTML = password[i];
        }
    }
}

function handleLettersUsedAndLeft(letter) {
    let lettersUsedSpan = document.querySelector('p.letters-used span');
    let lettersUsed = lettersUsedSpan.innerHTML;
    lettersUsedSpan.innerHTML = (lettersUsed === '') ? letter : lettersUsed.concat(', ', letter);

    let lettersLeftSpan = document.querySelector('p.letters-left span');
    let lettersLeft = lettersLeftSpan.innerHTML.split(', ').filter(el => el !== letter).join(', ');
    lettersLeftSpan.innerHTML = lettersLeft;
}


function handleLetterCorrect(password, letter) {
    if (password.includes(letter)) { return }
    else {
        missedCounter = missedCounter + 1;
        const canvas = document.querySelector('#canvas');
        const ctx = canvas.getContext('2d');
        switch (missedCounter) {
            case 1:
                ctx.beginPath();
                ctx.arc(120, 60, 10, 0, Math.PI * 2, true)
                ctx.stroke();
                break;
            case 2:
                ctx.beginPath();
                ctx.moveTo(120, 70);
                ctx.lineTo(120, 120);
                ctx.stroke();
                break;
            case 3:
                ctx.beginPath();
                ctx.moveTo(120, 70);
                ctx.lineTo(100, 110);
                ctx.stroke();
                break;
            case 4:
                ctx.beginPath();
                ctx.moveTo(120, 70);
                ctx.lineTo(140, 110);
                ctx.stroke();
                break;
            case 5:
                ctx.beginPath();
                ctx.moveTo(120, 120);
                ctx.lineTo(100, 160);
                ctx.stroke();
                break;
            case 6:
                ctx.beginPath();
                ctx.moveTo(120, 120);
                ctx.lineTo(140, 160);
                ctx.stroke();
                break;
        }
    }
}

