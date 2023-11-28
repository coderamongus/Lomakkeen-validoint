document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('registrationForm').addEventListener('submit', function (event) {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const country = document.getElementById('country').value;
    const postcode = document.getElementById('postcode').value;
    const email = document.getElementById('email').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const language = document.querySelector('input[name="language"]:checked');
    const additionalInfo = document.getElementById('additionalInfo').value;

    let errorMessages = [];

  
    const userIdPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@£$€&%#]).{6,}$/;
    if (!userId.trim() || !userId.match(userIdPattern)) {
      errorMessages.push({ field: 'userId', message: 'Käyttäjä ID tulee olla vähintään 6 merkkiä ja sisältää vähintään 1 numeron, 1 iso kirjaimen ja yhden seuraavista erikoismerkeistä: !@£$€&%#.' });
    }

    if (!password.trim()) {
      errorMessages.push({ field: 'password', message: 'Salasana vaaditaan.' });
    }

    if (!name.trim()) {
      errorMessages.push({ field: 'name', message: 'Nimi vaaditaan.' });
    }

    if (!address.trim()) {
      errorMessages.push({ field: 'address', message: 'Osoite vaaditaan.' });
    }

    if (country === 'default') {
      errorMessages.push({ field: 'country', message: 'Valitse maa.' });
    }

    if (!postcode.trim()) {
      errorMessages.push({ field: 'postcode', message: 'Postinumero vaaditaan.' });
    } else if (!/^\d{5}$/.test(postcode)) {
      errorMessages.push({ field: 'postcode', message: 'Postinumeron tulee olla tarkalleen 5 numeroa.' });
    }

    if (!email.trim()) {
      errorMessages.push({ field: 'email', message: 'Sähköposti vaaditaan.' });
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errorMessages.push({ field: 'email', message: 'Virheellinen sähköpostiosoite.' });
    }

    if (!gender) {
      errorMessages.push({ field: 'gender', message: 'Valitse sukupuoli.' });
    }

    if (!language) {
      errorMessages.push({ field: 'language', message: 'Valitse kieli.' });
    }

    displayErrors(errorMessages);

    if (errorMessages.length > 0) {
      event.preventDefault(); // Prevent default form submission behavior
    }
  });

  function displayErrors(errors) {
    errors.forEach(function (error) {
      const errorTextElement = document.getElementById(`errorText-${error.field}`);
      errorTextElement.innerHTML = '';
      const errorParagraph = document.createElement('p');
      errorParagraph.textContent = error.message;
      errorParagraph.className = 'error';
      errorTextElement.appendChild(errorParagraph);
    });
  }
});
