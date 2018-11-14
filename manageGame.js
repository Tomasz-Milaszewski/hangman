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
    getPassword(setPassword);
}

function setPassword(password) {
    console.log(password);
    for (let i = 0; i < password.length; i++) {
        const letterBox = document.createElement('span');
        const passwordBox = document.querySelector('.password');
        letterBox.innerHTML = password[i];
        passwordBox.appendChild(letterBox);
    }
}

function getPassword(callback) {
    fetch('https://hangman-25d5c.firebaseio.com/nouns.json')
        .then(response => response.json())
        .then(passwords => {
            var password = passwords[Math.floor(Math.random() * passwords.length)];
            callback(password);
        })
}




