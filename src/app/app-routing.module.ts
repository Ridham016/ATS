import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'applicant-registration-form',
    pathMatch: 'full'
  },
  {
    path: 'send-email',
    loadChildren: () => import('./send-email/send-email.module').then( m => m.SendEmailPageModule)
  },
  {
    path: 'applicant-registration-form',
    loadChildren: () => import('./pages/applicant-registration-form/applicant-registration-form.module').then( m => m.ApplicantRegistrationFormPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
