import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

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
  {
    path: 'advance-search',
    loadChildren: () => import('./pages/advance-search/advance-search.module').then( m => m.AdvanceSearchPageModule)
  },
  {
    path: 'advance-search-filter',
    loadChildren: () => import('./pages/filter/advance-search-filter/advance-search-filter.module').then( m => m.AdvanceSearchFilterPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
