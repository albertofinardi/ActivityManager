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
export function rawToAttivita(obj: any){
  return new Attivita (obj.nome, obj.descrizione, obj.aula, obj.piano, obj.inizio,obj.fine, obj.note);
}

export function sortAttivita(array : Attivita[]){
  return array.sort(function(a:Attivita, b:Attivita){
    if(a.inizio < b.inizio){
      return -1;
    }
    if(a.inizio > b.inizio){
      return 1;
    }
    return a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
  })
}