export class Attivita {
    nome: string;
    descrizione: string;
    aula: string;
    piano: string;
    inizio: Date;
    fine: Date;
    note: string;
  
    constructor(_nome: string, _descrizione: string, _aula: string, _piano: string, _inizio: Date, _fine: Date, _note: string) {
      this.nome = _nome;
      this.descrizione = _descrizione;
      this.aula = _aula;
      this.piano = _piano;
      this.inizio = _inizio;
      this.fine = _fine;
      this.note = _note;
    }
  }