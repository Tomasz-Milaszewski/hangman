validateInput = function () {
    const form = document.querySelector(".letter-form")
    const input = document.querySelector(".letter-input")
    const reg = /[a-zA-Z]+/g;

    form.addEventListener('submit', (event) => {
        if (input.value === '' || input.value.length > 1 || input.value !== reg) {
            console.log(input.value.length);
            event.preventDefault();
            input.value = '';
            input.placeholder = "One english letter please";
            input.classList.add('warning');
        }
    })
}

validateInput();
