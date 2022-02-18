import { Component, OnInit } from '@angular/core';
import { Attivita } from 'src/app/utility/attivita';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-modifica-attivita',
  templateUrl: './modifica-attivita.component.html',
  styleUrls: ['./modifica-attivita.component.css']
})
export class ModificaAttivitaComponent implements OnInit {

  eventi : Attivita[] | undefined = [new Attivita("Prova1", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova2", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova3", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova4", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova5", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova6", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova7", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh'),new Attivita("Prova8", "prova", "56", "1 piano", new Date(Date.now() + 29 * 60000), new Date(Date.now() + 10 * 60000), 'Boh')] 

  constructor() { 
    registerLocaleData(localeIt, 'it-IT');
  }

  ngOnInit(): void {
  }

}
