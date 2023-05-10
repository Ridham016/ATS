import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guard/role.guard';
import { MenuPage } from './pages/menu/menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'send-email',
        loadChildren: () =>
          import('./pages/send-email/send-email.module').then(
            (m) => m.SendEmailPageModule
          ),
      },
      {
        path: 'applicant-registration-form',
        loadChildren: () =>
          import(
            './pages/applicant-registration-form/applicant-registration-form.module'
          ).then((m) => m.ApplicantRegistrationFormPageModule),
        //canActivate: [RoleGuard]
      },
      {
        path: 'applicant-list-page',
        loadChildren: () =>
          import('./pages/applicant-list-page/applicant-list-page.module').then(
            (m) => m.ApplicantListPagePageModule
          ),
        // canActivate: [RoleGuard]
      },
      {
        path: 'user-dash-board',
        loadChildren: () =>
          import('./pages/user-dash-board/user-dash-board.module').then(
            (m) => m.UserDashBoardPageModule
          ),
        // canActivate: [RoleGuard]
      },
      {
        path: 'applicant-filter',
        loadChildren: () =>
          import(
            './pages/filter/applicant-filter/applicant-filter.module'
          ).then((m) => m.ApplicantFilterPageModule),
        // canActivate: [RoleGuard]
      },
      {
        path: 'applicant-detail',
        loadChildren: () =>
          import('./pages/applicant-detail/applicant-detail.module').then(
            (m) => m.ApplicantDetailPageModule
          ),
        // canActivate: [RoleGuard]
      },
      {
        path: 'scheduling-form',
        loadChildren: () =>
          import('./pages/scheduling-form/scheduling-form.module').then(
            (m) => m.SchedulingFormPageModule
          ),
        //  canActivate: [RoleGuard]
      },
      {
        path: 'advance-search',
        loadChildren: () =>
          import('./pages/advance-search/advance-search.module').then(
            (m) => m.AdvanceSearchPageModule
          ),
        //  canActivate: [RoleGuard]
      },
      {
        path: 'advance-search-filter',
        loadChildren: () =>
          import(
            './pages/filter/advance-search-filter/advance-search-filter.module'
          ).then((m) => m.AdvanceSearchFilterPageModule),
        // canActivate: [RoleGuard]
      },
      {
        path: 'action-history',
        loadChildren: () =>
          import('./pages/action-history/action-history.module').then(
            (m) => m.ActionHistoryPageModule
          ),
        //canActivate: [RoleGuard]
      },
      {
        path: 'job-posting',
        loadChildren: () =>
          import('./pages/job-posting/job-posting.module').then(
            (m) => m.JobPostingPageModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
  },  {
    path: 'job-description',
    loadChildren: () => import('./pages/job-description/job-description.module').then( m => m.JobDescriptionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
