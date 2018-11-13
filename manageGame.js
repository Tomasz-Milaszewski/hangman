function startGame() {
    const playButton = document.querySelector('.play-button')
    playButton.addEventListener('click', () => {
        play();
        playButton.innerHTML = 'Restart';
    });
}
startGame();

function play() {
    getPassword();
}

function getPassword() {
    fetch('https://hangman-25d5c.firebaseio.com/nouns.json')
        .then(response => response.json())
        .then(passwords => {
             var password = passwords[Math.floor(Math.random() * passwords.length)];
             console.log(password);
         })
}