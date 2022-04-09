import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emit } from '@tauri-apps/api/event';
import { notify } from 'src/app/utility/notification';
import { Settings } from 'src/app/utility/settings';
import { readDataFile, saveDataFile } from 'src/app/utility/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.css']
})
export class ImpostazioniComponent implements OnInit {
  
  settingsForm = new FormGroup({
    attivitaPerPagina : new FormControl(3, Validators.min(0) && Validators.required),
    anticipo: new FormControl(30, Validators.min(0) && Validators.required),
    tempoPerPagina: new FormControl(5, Validators.min(1) && Validators.required),
    aule: new FormControl('', Validators.required),
    piani: new FormControl('', Validators.required)
  })

  async onSubmit(){
    const value = Settings.rawToSettings(this.settingsForm.getRawValue())
    await saveDataFile(value, environment.settings.file)
    this.initSettings();
    await emit(environment.eventi.settings, value);
    await notify('Impostazioni salvate', 'Le nuove preferenze sono state salvate con successo')
  }

  async initSettings(){
    var settingsVar = await readDataFile(environment.settings.file) as any
    if(!settingsVar){
      settingsVar = Settings.default()
    }
    Object.keys(settingsVar).forEach(key => {
      if(Array.isArray(settingsVar![key as keyof Settings])){
        this.settingsForm.controls[key].setValue(settingsVar![key as keyof Settings].join());
      }else{
        this.settingsForm.controls[key].setValue(settingsVar![key as keyof Settings]);
      }
    });
  }

  constructor() { 
    this.initSettings();
  }

  ngOnInit(): void {

  }

}
