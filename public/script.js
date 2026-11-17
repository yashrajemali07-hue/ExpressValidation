
const form = document.getElementById('registrationForm');
const result = document.getElementById('result');

form.addEventListener('submit', async function(e) {

    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };

    try {

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const output = await response.json();

        if (output.success) {
            result.style.color = 'green';
            result.textContent = output.message;
            form.reset();
        } else {
            result.style.color = 'red';
            result.innerHTML = output.errors.join('<br>');
        }

    } catch (error) {
        result.style.color = 'red';
        result.textContent = 'Server error. Please try again.';
    }

});
