import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'send-email',
    loadChildren: () => import('./pages/send-email/send-email.module').then( m => m.SendEmailPageModule)
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
  {
    path: 'user-dash-board',
    loadChildren: () => import('./pages/user-dash-board/user-dash-board.module').then( m => m.UserDashBoardPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'applicant-filter',
    loadChildren: () => import('./pages/filter/applicant-filter/applicant-filter.module').then( m => m.ApplicantFilterPageModule)
  },
  {
    path: 'applicant-detail',
    loadChildren: () => import('./pages/applicant-detail/applicant-detail.module').then( m => m.ApplicantDetailPageModule)
  },
  {
    path: 'scheduling-form',
    loadChildren: () => import('./pages/scheduling-form/scheduling-form.module').then( m => m.SchedulingFormPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
