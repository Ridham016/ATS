import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
<<<<<<< Updated upstream
    redirectTo: 'applicant-registration-form',
=======
    redirectTo: 'login',
>>>>>>> Stashed changes
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
  {
    path: 'applicant-list-page',
    loadChildren: () => import('./pages/applicant-list-page/applicant-list-page.module').then( m => m.ApplicantListPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
