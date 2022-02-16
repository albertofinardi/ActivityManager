import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InterfaceComponent } from './user/interface/interface.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NuovaAttivitaComponent } from './user/nuova-attivita/nuova-attivita.component';
import { ImpostazioniComponent } from './user/impostazioni/impostazioni.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InterfaceComponent,
    NuovaAttivitaComponent,
    ImpostazioniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "it-IT" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
