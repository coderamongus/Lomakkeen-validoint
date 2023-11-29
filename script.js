document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('rekisterointilomake').addEventListener('submit', function (event) {
    const kayttajaId = document.getElementById('kayttajaId').value;
    const salasana = document.getElementById('salasana').value;
    const nimi = document.getElementById('nimi').value;
    const osoite = document.getElementById('osoite').value;
    const maa = document.getElementById('maa').value;
    const postinumero = document.getElementById('postinumero').value;
    const sahkoposti = document.getElementById('sahkoposti').value;
    const sukupuoli = document.querySelector('input[name="sukupuoli"]:checked');
    const kieli = document.querySelector('input[name="kieli"]:checked');
    const Lisatietoja = document.getElementById('Lisatietoja').value;

    let virheviestit = [];

    const kayttajaIdKaava = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@£$€&%#]).{6,}$/;
    if (!kayttajaId.trim() || !kayttajaId.match(kayttajaIdKaava)) {
      virheviestit.push({ kentta: 'kayttajaId', viesti: 'Käyttäjä ID tulee olla vähintään 6 merkkiä ja sisältää vähintään 1 numeron, 1 iso kirjaimen ja yhden seuraavista erikoismerkeistä: !@£$€&%#.' });
    }

    if (!salasana.trim()) {
      virheviestit.push({ kentta: 'salasana', viesti: 'Salasana vaaditaan.' });
    }

    if (!nimi.trim()) {
      virheviestit.push({ kentta: 'nimi', viesti: 'Nimi vaaditaan.' });
    }

    if (!osoite.trim()) {
      virheviestit.push({ kentta: 'osoite', viesti: 'Osoite vaaditaan.' });
    }

    if (maa === 'default') {
      virheviestit.push({ kentta: 'maa', viesti: 'Valitse maa.' });
    }

    if (!postinumero.trim()) {
      virheviestit.push({ kentta: 'postinumero', viesti: 'Postinumero vaaditaan.' });
    } else if (!/^\d{5}$/.test(postinumero)) {
      virheviestit.push({ kentta: 'postinumero', viesti: 'Postinumeron tulee olla tarkalleen 5 numeroa.' });
    }

    if (!sahkoposti.trim()) {
      virheviestit.push({ kentta: 'sahkoposti', viesti: 'Sähköposti vaaditaan.' });
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sahkoposti)) {
      virheviestit.push({ kentta: 'sahkoposti', viesti: 'Virheellinen sähköpostiosoite.' });
    }

    if (!sukupuoli) {
      virheviestit.push({ kentta: 'sukupuoli', viesti: 'Valitse sukupuoli.' });
    }

    if (!kieli) {
      virheviestit.push({ kentta: 'kieli', viesti: 'Valitse kieli.' });
    }

    naytaVirheet(virheviestit);

    if (virheviestit.length > 0) {
      event.preventDefault(); // Estä oletustoiminto lomakkeen lähetykselle
    }
  });

  function naytaVirheet(virheet) {
    virheet.forEach(function (virhe) {
      const virheTekstiElementti = document.getElementById(`errorText-${virhe.kentta}`);
      virheTekstiElementti.innerHTML = '';
      const virheKappale = document.createElement('p');
      virheKappale.textContent = virhe.viesti;
      virheKappale.className = 'error';
      virheTekstiElementti.appendChild(virheKappale);
    });
  }
});
