import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaAttivitaComponent } from './nuova-attivita.component';

describe('NuovaAttivitaComponent', () => {
  let component: NuovaAttivitaComponent;
  let fixture: ComponentFixture<NuovaAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovaAttivitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovaAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
