import { registerLocaleData } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Attivita} from 'src/app/utility/attivita';
import localeIt from '@angular/common/locales/it';
import { emit, listen } from '@tauri-apps/api/event';
import { environment } from 'src/environments/environment';
import { Settings } from 'src/app/utility/settings';
import { readDataFile, saveDataFile } from 'src/app/utility/store';

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
    var settingsLocal = await readDataFile(environment.settings.file) as Settings
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
      var attivitaDaDb : Attivita[] | null = await readDataFile(environment.db.file);
      if(attivitaDaDb){
        attivitaDaDb.push(payload);
        attivitaDaDb = Attivita.sortAttivita(attivitaDaDb);
      }else{
        attivitaDaDb = [payload];
      }
      saveDataFile(attivitaDaDb, environment.db.file)
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
