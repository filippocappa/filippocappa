// Array di servizi per ottenere l'IP
const ipServices = [
  { name: 'ipify', url: 'https://api.ipify.org?format=json', extract: (data) => data.ip },
  { name: 'ipapi', url: 'https://ipapi.co/json/', extract: (data) => data.ip },
  // Aggiungi altri servizi se necessario
];

// Funzione per ottenere l'indirizzo IP del visitatore
async function getIP() {
  for (const service of ipServices) {
    try {
      const response = await fetch(service.url);
      const data = await response.json();
      return service.extract(data);
    } catch (error) {
      console.error(`Errore nel recupero dell'IP da ${service.name}:`, error);
    }
  }
  throw new Error('Impossibile recuperare l\'IP da tutti i servizi');
}

// Funzione per inviare i dati al webhook Discord
async function sendToDiscord(message) {
  const webhookURL = 'https://discord.com/api/webhooks/1283800882051551282/NiOaVpBa14KFvvaFi4iiLDollAcb37uDKfd66qUHJAOmwpSkLmbGUiYL-K7nGQY04ieN';
  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Dati inviati con successo a Discord');
  } catch (error) {
    console.error('Errore nell\'invio dei dati a Discord:', error);
  }
}

// Funzione principale
async function logVisit() {
  const currentDate = new Date().toISOString();
  try {
    const ip = await getIP();
    await sendToDiscord(`Nuova visita - IP: ${ip} - Data: ${currentDate}`);
  } catch (error) {
    console.error('Errore nel recupero dell\'IP:', error);
    await sendToDiscord(`Impossibile recuperare l'IP del visitatore - Data: ${currentDate} - Errore: ${error.message}`);
  }
}

// Esegui la funzione quando la pagina è caricata
window.addEventListener('load', logVisit);
