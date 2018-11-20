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
        playButton.innerHTML = 'RESTART';
        missedCounter = 0;
        roundNumber = 0;
    });
}
startGame();

function clearHangman() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(95, 48, 50, 125)
}

function setStartValues() {
    const lettersUsedSpan = document.createElement('span');
    lettersUsedSpan.innerHTML = '';
    const lettersLeftSpan = document.createElement('span');
    lettersLeftSpan.innerHTML = 'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z';
    const roundSpan = document.createElement('span');
    roundSpan.innerHTML = '';
    const errorsSpan = document.createElement('span');
    errorsSpan.innerHTML = 6;

    const lettersUsedPar = document.querySelector('.letters-used');
    const lettersLeftPar = document.querySelector('.letters-left');
    const roundPar = document.querySelector('.round');
    const errorsPar = document.querySelector('.errors');

    lettersUsedPar.appendChild(lettersUsedSpan);
    lettersLeftPar.appendChild(lettersLeftSpan);
    roundPar.appendChild(roundSpan);
    errorsPar.appendChild(errorsSpan);
}

function play() {
    getPassword(manageGame);
}

function getPassword(callback) {
    fetch('https://hangman-25d5c.firebaseio.com/nouns.json')
        .then(response => response.json())
        .then(passwords => {
            let password = passwords[Math.floor(Math.random() * passwords.length)].toUpperCase();
            callback(password);
        })
}

function manageGame(password) {
    console.log(password);
    displayEmptyPassword(password);
    const form = document.querySelector(".letter-form")
    const input = document.querySelector(".letter-input")
    const reg = /^[a-z]+$/i;
    form.addEventListener('submit', function listener(event) {
        const playButton = document.querySelector('.play-button')
        playButton.addEventListener('click', () => {
            form.removeEventListener('submit', listener)
        });
        if (input.value === '' || input.value.length > 1 || !reg.test(input.value)) {
            event.preventDefault();
            input.value = '';
            input.placeholder = "One english letter please";
            input.classList.add('warning');
        } else {
            if (document.querySelector('p.letters-used span').innerHTML.includes(input.value.toUpperCase())) {
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

function displayEmptyPassword(password) {
    for (let i = 0; i < password.length; i++) {
        const letterBox = document.createElement('span');
        const passwordBox = document.querySelector('.password');
        letterBox.classList.add('password-letter-span');
        letterBox.innerHTML = '';
        passwordBox.appendChild(letterBox);
    }
}

function handleValidInput(password, letter) {
    for (let i = 0; i < password.length; i++) {
        if (letter.toUpperCase() === password[i]) {
            let indexToShow = document.querySelector(`span:nth-child(${i + 1})`)
            indexToShow.innerHTML = password[i];
        }
    }
}

function handleLettersUsedAndLeft(letter) {
    let lettersUsedSpan = document.querySelector('p.letters-used span');
    let lettersUsed = lettersUsedSpan.innerHTML;
    lettersUsedSpan.innerHTML = (lettersUsed === '') ? letter.toUpperCase() : (lettersUsed.includes(letter.toUpperCase()) ? lettersUsed : lettersUsed.concat(', ', letter.toUpperCase()));

    let lettersLeftSpan = document.querySelector('p.letters-left span');
    let lettersLeft = lettersLeftSpan.innerHTML.split(', ').filter(el => el !== letter.toUpperCase()).join(', ');
    lettersLeftSpan.innerHTML = lettersLeft;
}

function handleLetterCorrect(password, letter) {
    if (password.includes(letter.toUpperCase())) { return }
    else {
        missedCounter = missedCounter + 1;
        let errorsSpan = document.querySelector('p.errors span');
        errorsSpan.innerHTML = 6 - missedCounter;
        const canvas = document.querySelector('#canvas');
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
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

