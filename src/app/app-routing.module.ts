import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImpostazioniComponent } from './user/impostazioni/impostazioni.component';
import { InterfaceComponent } from './user/interface/interface.component';
import { NuovaAttivitaComponent } from './user/nuova-attivita/nuova-attivita.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'interface', component: InterfaceComponent, children: [
      { path: '', redirectTo: '/interface/nuova', pathMatch: 'full' },
      { path: 'nuova', component: NuovaAttivitaComponent },
      { path: 'impostazioni', component: ImpostazioniComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
