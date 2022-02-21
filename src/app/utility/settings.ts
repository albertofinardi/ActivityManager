export class Settings {
    attivitaPerPagina: number;
    anticipo: number;
    tempoPerPagina: number;
    aule: string[];
    piani: string[];

    constructor(_attivitaPerPagina: number, _anticipo: number, _tempoPerPagina: number, _aule: string[], _piani: string[]) {
        this.attivitaPerPagina = _attivitaPerPagina;
        this.anticipo = _anticipo;
        this.tempoPerPagina = _tempoPerPagina;
        this.aule = _aule;
        this.piani = _piani;
    }

    static default() {
        return new Settings(3, 30, 5, [], []);
    }

    static rawToSettings(obj: any) {
        return new Settings(obj.attivitaPerPagina, obj.anticipo, obj.tempoPerPagina, obj.aule.split(',').map((element: string) => { return element.trim(); }), obj.piani.split(',').map((element: string) => { return element.trim(); }));
    }
}