export const environment = {
  production: true,
  db : {
    file: 'database',
  },
  settings: {
    file: 'settings',
    default: {
      attivitaPerPagina: 3,
      anticipo: 30,
      tempoPerPagina: 5
    }
  },
  eventi: {
    nuova: 'nuova-attivita',
    elimina: 'elimina-attivita',
    settings: 'impostazioni-update'
  }
};
