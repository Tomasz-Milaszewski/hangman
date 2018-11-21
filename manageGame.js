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
        document.querySelector(".letter-input").focus();    
        playButton.innerHTML = 'RESTART';
        missedCounter = 0;
        roundNumber = 0;
        document.querySelector('.info-container').style.display = 'none';
    });
}
startGame();

function clearHangman() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(95, 48, 50, 125)
}

function setStartValues() {
    document.querySelector('.letter-input').disabled = false;
    createStartState('', '.letters-used');
    createStartState('A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z', '.letters-left');
    createStartState('', '.round');
    createStartState(6, '.errors');
}

function createStartState(content, parentSelector) {
    const element = document.createElement('span')
    element.innerHTML = content;
    document.querySelector(parentSelector).appendChild(element)
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

function listener(event) {
    event.preventDefault();
    if (input.value === '' || input.value.length > 1 || !reg.test(input.value)) {
        input.value = '';
        input.classList.remove('info');
        input.placeholder = "One english letter please";
        input.classList.add('warning');
    } else {
        if (document.querySelector('p.letters-used span').innerHTML.includes(input.value.toUpperCase())) {
            input.value = '';
            input.classList.remove('warning');
            input.placeholder = "Wake up! It's been used!";
            input.classList.add('info');
        }
        else {
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
}
    form.addEventListener('submit', listener)
    const playButton = document.querySelector('.play-button')
    playButton.addEventListener('click', () => {
        form.removeEventListener('submit', listener)
    });
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
            const guessedSpans = document.querySelectorAll('.password span')
            const guessed = Array.from(guessedSpans).map(el => el.innerHTML).join('');
            if (guessed === password) { gameEnd('Well done! Keep going :-)', 'win') }
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
        ctx.strokeStyle = 'rgb(9, 83, 200)';
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
                gameEnd('Unlucky... try again ;-)');
                displayPassword(password);
                break;
        }
    }
}

function gameEnd(message,result) {
    const infoBox = document.querySelector('.info-container')
    infoBox.classList.remove('game-won');
    infoBox.classList.remove('game-lost');
    result === 'win' ? infoBox.classList.add('game-won') : infoBox.classList.add('game-lost')
    infoBox.style.display = 'block';
    infoBox.innerHTML = message
    document.querySelector('.letter-input').disabled = true;
}
function displayPassword(password) {
    for (let i = 0; i < password.length; i++) {
        const letterBox = document.querySelector(`span:nth-child(${i + 1})`);
        letterBox.innerHTML = password[i];
    }
}
