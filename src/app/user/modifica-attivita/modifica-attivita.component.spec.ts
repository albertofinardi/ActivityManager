import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaAttivitaComponent } from './modifica-attivita.component';

describe('ModificaAttivitaComponent', () => {
  let component: ModificaAttivitaComponent;
  let fixture: ComponentFixture<ModificaAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaAttivitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
