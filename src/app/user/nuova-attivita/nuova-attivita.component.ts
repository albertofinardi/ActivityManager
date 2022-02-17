import { registerLocaleData } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Attivita } from 'src/app/utility/attivita';
import localeIt from '@angular/common/locales/it';

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
    inizio: new FormControl({}, Validators.required),
    fine: new FormControl({}, Validators.required),
  })

  constructor() {
    registerLocaleData(localeIt, 'it-IT')
  }

  ngOnInit(): void {
    //this.readData()
  }

  submit() {
    this.eventi.push(this.nuovaAttivitaData.getRawValue())
    console.log(this.eventi)
  }

  controllaOra() {
    var hInizio = this.nuovaAttivitaData.controls['inizio'].value?.hour;
    var hFine = this.nuovaAttivitaData.controls['fine'].value?.hour;
    var mInizio = this.nuovaAttivitaData.controls['inizio'].value?.minute;
    var mFine = this.nuovaAttivitaData.controls['fine'].value?.minute;
    if (hInizio && hFine && mInizio && mFine)
      return hInizio > hFine || (hInizio == hFine && mInizio >= mFine)
    else
      return true
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
