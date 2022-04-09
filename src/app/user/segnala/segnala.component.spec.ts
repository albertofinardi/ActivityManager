import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegnalaComponent } from './segnala.component';

describe('SegnalaComponent', () => {
  let component: SegnalaComponent;
  let fixture: ComponentFixture<SegnalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegnalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegnalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
