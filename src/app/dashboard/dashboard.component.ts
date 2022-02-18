import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import localeIt from '@angular/common/locales/it';
import { Attivita, rawToAttivita } from '../utility/attivita';
import { listen } from '@tauri-apps/api/event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  date = new Date()

  eventi: Attivita[][] | undefined;
  
  constructor(config: NgbCarouselConfig) {

    listen("nuova-attivita-submit", event => {
      const nuovaAttivita = rawToAttivita(JSON.parse(event.payload as string))
      console.log(nuovaAttivita)
    })

    //this.writeData()
    var eventiLocale : Attivita[] | undefined = [new Attivita("Prova1", "prova", "56", "1 piano", new Date(Date.now() - 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova2", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova3", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova4", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova5", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova6", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova7", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova8", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh')] 

    config.interval = 5000;
    config.showNavigationArrows = false;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.animation = false;
    registerLocaleData(localeIt, 'it-IT');
    eventiLocale = this.readData({anticipo: 30, elementiPerPagina: 3}, eventiLocale)
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  attivitaInCorso(attivita: Attivita){
    return attivita.inizio <= new Date() && attivita.fine >= new Date()
  }

  readData(settings: any, eventiLoc: Attivita[] | undefined) {
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
      var now_anticipo = new Date(Date.now() + settings.anticipo * 60000);
      eventi_validi = eventiLoc.filter(function (evento) {
        return new Date(evento.inizio) <= now_anticipo && new Date(evento.fine) >= now;
      })
      eventiLoc = eventiLoc.filter(function (evento) {
        return new Date(evento.fine) > now;
      })
      this.eventi = sliceIntoChunks(eventi_validi, settings.elementiPerPagina);
    }

    return eventiLoc;
  }

}
