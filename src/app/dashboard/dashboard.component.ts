import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import localeIt from '@angular/common/locales/it';
import { Attivita } from '../utility/attivita';
import { listen } from '@tauri-apps/api/event';
import { environment } from 'src/environments/environment';
import { Settings } from '../utility/settings';
import { readDataFile, saveDataFile } from '../utility/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  date = new Date()
  eventi: Attivita[][] | undefined;

  constructor(config: NgbCarouselConfig) {

    listen(environment.eventi.nuova, event => {
      //const nuovaAttivita = rawToAttivita(JSON.parse(event.payload as string))
      //console.log(nuovaAttivita)
      //this.initDb()
      this.scandezaEvento();
      window.location.reload();
    })

    listen(environment.eventi.settings, event => {
      window.location.reload();
    })

    listen(environment.eventi.elimina, event => {
      window.location.reload();
    })

    //this.writeData()
    //var eventiLocale : Attivita[] | null = [new Attivita("Prova1", "prova", "56", "1 piano", new Date(Date.now() - 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova2", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova3", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova4", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova5", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova6", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova7", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova8", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh')] 

    this.initDb_returnSettings();
    config.interval = 5000;
    config.showNavigationArrows = false;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.animation = false;
    registerLocaleData(localeIt, 'it-IT');
    //this.readData({anticipo: 30, attivitaPerPagina: 3}, eventiLocale)
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  attivitaInCorso(attivita: Attivita) {
    var now = new Date();
    now.setSeconds(0);
    var fine = new Date(attivita.fine.setSeconds(59))
    return attivita.inizio <= now && fine >= now;
  }

  readData(settings: any, eventiLoc: Attivita[] | null) {
    var eventi_validi: Attivita[] = [];

    function sliceIntoChunks(arr: Attivita[], chunkSize: number) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    }

    if (eventiLoc) {
      var now = new Date();
      now.setSeconds(59);
      var now_anticipo = new Date(Date.now() + settings.anticipo * 60000);
      now_anticipo.setSeconds(0);
      eventi_validi = eventiLoc.filter(function (evento) {
        return evento.inizio <= now_anticipo && evento.fine >= now;
      })
      eventiLoc = eventiLoc.filter(function (evento) {
        return evento.fine > now;
      })
      this.eventi = sliceIntoChunks(eventi_validi, settings.attivitaPerPagina);
    }
    this.scandezaEvento();
    //return eventiLoc;
  }

  async initDb_returnSettings() {
    var attivitaDaDb: Attivita[] | null = await readDataFile(environment.db.file) as Attivita[]; //CONTROLLA
    console.log(attivitaDaDb)
    if (attivitaDaDb) {
      attivitaDaDb = attivitaDaDb.map(function (obj) {
        return Attivita.rawToAttivita(obj);
      });
      var now = new Date()
      now.setSeconds(59);
      attivitaDaDb = attivitaDaDb.filter(function (obj) {
        return obj.fine >= now;
      })
      attivitaDaDb = Attivita.sortAttivita(attivitaDaDb); /* perchè non riesco a riordinarli al salvataggio ? */
      await saveDataFile(attivitaDaDb, environment.db.file);
    }
    const settings = await this.initSettings();
    this.readData(settings, attivitaDaDb)
    return settings
  }

  async initSettings() {
    var settings = await readDataFile(environment.settings.file);
    if (!settings) {
      await saveDataFile(Settings.default(), environment.settings.file)
      return Settings.default();
    }
    return settings
  }

  async scandezaEvento() {
    if (this.eventi != undefined && this.eventi.length != 0) {
      var primo = this.eventi[0][0].fine
      var eventoDaEliminare: Attivita = this.eventi[0][0];
      this.eventi?.forEach(eventi_sub => {
        eventi_sub?.forEach(evento => {
          if (primo >= evento.fine) {
            primo = evento.fine;
            eventoDaEliminare = evento;
          }
        })
      })

      if (eventoDaEliminare != undefined) {
        setTimeout(elimina, eventoDaEliminare.fine.valueOf() - new Date().valueOf());
      }
    }


    async function elimina() {
      var attivitaDaDb: Attivita[] | null = await readDataFile(environment.db.file) as Attivita[]; //CONTROLLA
      console.log(attivitaDaDb)
      if (attivitaDaDb) {
        attivitaDaDb = attivitaDaDb.map(function (obj) {
          return Attivita.rawToAttivita(obj);
        });
        attivitaDaDb = attivitaDaDb.filter(function (obj) {
          return obj != eventoDaEliminare;
        })
        await saveDataFile(attivitaDaDb, environment.db.file);
        window.location.reload();
      }
    }

  }
}

