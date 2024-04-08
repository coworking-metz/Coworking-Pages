// Convertit une date ISO en format français 'Jeudi 4 avril à H:MM'
function formatDateToFrench(dateString) {
    const options = { 
        timeZone: 'Europe/Paris',
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false // Utiliser le format 24h
      };
      let formatter = new Intl.DateTimeFormat('fr-FR', options);
      return formatter.format(new Date(dateString)).replace(',', ' à');
  }
  