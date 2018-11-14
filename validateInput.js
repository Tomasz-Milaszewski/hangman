validateInput = function () {
    const form = document.querySelector(".letter-form")
    const input = document.querySelector(".letter-input")

    form.addEventListener('submit', (event) => {
        if (input.value === '') {
            event.preventDefault();
            input.placeholder = "Please type a letter";
            input.classList.add('warning');
        }
    })
}

validateInput();
