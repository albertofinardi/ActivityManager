import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    attivitaInCorso: new FormControl('true')
  })

  onSubmit(){
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
