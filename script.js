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
