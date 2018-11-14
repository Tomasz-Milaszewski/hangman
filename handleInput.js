var lettersLeft = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersLeftCount = lettersLeft.length;
var lettersUsed = [];
var lettersUsedCount = lettersUsed.length;

handleInput = function () {
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
            event.preventDefault();
            input.value = '';
            input.placeholder = "Your letter here";
            input.classList.remove('warning');
            getPassword(handleLetterSubmission);

        }
    })
}
handleInput();

function handleLetterSubmission(password) {
    console.log(password);
    for (let i = 0 ; i < password.length ; i++) {
        if (input.value === password[i]) {
            let indexToShow = document.querySelector(`.password:nth-child(${i})`)
            indexToShow.innerHTML = password[i];
        }
    }
    
}

//TODO: prevent double letter use 