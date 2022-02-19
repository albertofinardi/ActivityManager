import { registerLocaleData } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Attivita} from 'src/app/utility/attivita';
import localeIt from '@angular/common/locales/it';
import { emit, listen } from '@tauri-apps/api/event';
import { Store } from 'tauri-plugin-store-api';
import { environment } from 'src/environments/environment';
import { Settings } from 'src/app/utility/settings';

@Component({
  selector: 'app-nuova-attivita',
  templateUrl: './nuova-attivita.component.html',
  styleUrls: ['./nuova-attivita.component.css']
})
export class NuovaAttivitaComponent implements OnInit {

  eventi : Attivita[] = [];
  settings : Settings = Settings.default();

  nuovaAttivitaData = new FormGroup({
    nome: new FormControl('', Validators.required),
    descrizione: new FormControl(''),
    note: new FormControl(''),
    aula: new FormControl('', Validators.required),
    piano: new FormControl('', Validators.required),
    inizio: new FormControl('', Validators.required),
    fine: new FormControl('', Validators.required),
  })

  constructor() {
    registerLocaleData(localeIt, 'it-IT')
    this.initSettings();
    listen(environment.eventi.settings, event => {
      window.location.reload()
    })
  }

  ngOnInit(): void {
    //this.readData()
  }

  async initSettings(){
    const db = new Store(environment.settings.file);
    var settingsLocal = await db.get(environment.settings.nome) as Settings
    if(settingsLocal){
      this.settings = settingsLocal;
    }
  }

  async submit() {
    var inizio = new Date(this.nuovaAttivitaData.controls['inizio'].value);
    var fine = new Date(inizio.toDateString() + ' ' + this.nuovaAttivitaData.controls['fine'].value);
    fine.setSeconds(59);
    this.nuovaAttivitaData.controls['fine'].setValue(fine);
    var payload = Attivita.rawToAttivita(this.nuovaAttivitaData.getRawValue())
    payload = Attivita.convertRaw(payload);
    try {
      const db = new Store(environment.db.file);
      var attivitaDaDb : Attivita[] | null = await db.get(environment.db.nome);
      if(attivitaDaDb){
        attivitaDaDb.push(payload);
        attivitaDaDb = Attivita.sortAttivita(attivitaDaDb);
      }else{
        attivitaDaDb = [payload];
      }
      db.set(environment.db.nome, attivitaDaDb)
      await emit(environment.eventi.nuova, payload)
    }catch(err){
      console.log(err)
    }
  }

  oraValida() {
    var inizio = new Date(this.nuovaAttivitaData.controls['inizio'].value);
    var fine = new Date(inizio.toDateString() + ' ' + this.nuovaAttivitaData.controls['fine'].value);
    return inizio < fine && inizio >= new Date();
  }

}
