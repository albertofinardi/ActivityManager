import { registerLocaleData } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Attivita, rawToAttivita } from 'src/app/utility/attivita';
import localeIt from '@angular/common/locales/it';
import { emit } from '@tauri-apps/api/event';

@Component({
  selector: 'app-nuova-attivita',
  templateUrl: './nuova-attivita.component.html',
  styleUrls: ['./nuova-attivita.component.css']
})
export class NuovaAttivitaComponent implements OnInit {

  eventi : Attivita[] = [];

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
  }

  ngOnInit(): void {
    //this.readData()
  }

  async submit() {
    var inizio = new Date(this.nuovaAttivitaData.controls['inizio'].value);
    var fine = new Date(inizio.toDateString() + ' ' + this.nuovaAttivitaData.controls['fine'].value);
    this.nuovaAttivitaData.controls['fine'].setValue(fine);
    const payload = rawToAttivita(this.nuovaAttivitaData.getRawValue())
    console.log(payload)
    try {
      await emit('nuova-attivita-submit', payload)
      console.log('Fatto')
    }catch(err){
      console.log(err)
    }
  }

  oraValida() {
    var inizio = new Date(this.nuovaAttivitaData.controls['inizio'].value);
    var fine = new Date(inizio.toDateString() + ' ' + this.nuovaAttivitaData.controls['fine'].value);
    return inizio < fine && inizio >= new Date();
  }
  
/*
  readData(){
    fs.readTextFile(environment.fileName).then(res => {
      if(res){
        var json = JSON.parse(res);
        console.log(json)
        var settings = json.settings;
        json.eventi.forEach((evento: any) => {
            this.eventi.push(jsonToObj(evento))
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }


  writeData(){
    var att : any = [];
    var ev = [new Attivita('Prova', '', '1', '1 piano', new Date(), new Date(), ''),new Attivita('Prova', '', '2', '1 piano', new Date(), new Date(), ''),new Attivita('Prova', '', '3', '1 piano', new Date(), new Date(), ''),new Attivita('Prova', '', '4', '1 piano', new Date(), new Date(), '')]
    ev.forEach(e => {
      att.push(attivitaToObj(e))
    })
    var data = {
      settings: {
        chunkSize: 3,
        anticipo:30
      },
      eventi : att
    }
    let jsonConv = JSON.stringify(data)
    fs.writeFile({contents: jsonConv, path: environment.fileName}).then(res => console.log('fatto'))
  }
  */

}
