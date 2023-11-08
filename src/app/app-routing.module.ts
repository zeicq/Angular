import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Reset } from './reset/reset.component';

const routes: Routes = [
  { path: 'reset', component: Reset }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

