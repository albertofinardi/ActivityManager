import { Component, OnInit } from '@angular/core';
import { Attivita } from 'src/app/utility/attivita';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { Store } from 'tauri-plugin-store-api';
import { environment } from 'src/environments/environment';
import { emit } from '@tauri-apps/api/event';

@Component({
  selector: 'app-modifica-attivita',
  templateUrl: './modifica-attivita.component.html',
  styleUrls: ['./modifica-attivita.component.css']
})
export class ModificaAttivitaComponent implements OnInit {

  //eventi : Attivita[] | undefined = [new Attivita("Prova1", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova2", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova3", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova4", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova5", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova6", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova7", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova8", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh')] 

  eventi : Attivita[] | null = [];
  constructor() { 
    registerLocaleData(localeIt, 'it-IT');
    this.initDb()
  }

  ngOnInit(): void {
  }

  async initDb(){
    const db = new Store(environment.db.file);
    var attivitaDaDb : Attivita[] | null = await db.get(environment.db.nome);
    if(attivitaDaDb){
      attivitaDaDb = attivitaDaDb.map(function (obj) {
        return Attivita.rawToAttivita(obj);
      });
      attivitaDaDb = Attivita.sortAttivita(attivitaDaDb); /* perchè non riesco a riordinarli al salvataggio ? */
    }
    this.eventi = attivitaDaDb;
  }

  async deleteAll(){
    const db = new Store(environment.db.file);
    await db.set(environment.db.nome, null);
    emit(environment.eventi.elimina);
    this.initDb();
  }



}
