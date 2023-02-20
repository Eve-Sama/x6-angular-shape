import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { G6Component } from './pages/g6/g6.component';
import { X6Component } from './pages/x6/x6.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'x6',
    pathMatch: 'full',
  },
  { path: 'g6', component: G6Component },
  { path: 'x6', component: X6Component },
  { path: '**', redirectTo: 'x6' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
