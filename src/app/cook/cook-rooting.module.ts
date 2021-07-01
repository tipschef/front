import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CookComponent} from './cook.component';
import {AuthGuard} from '../common-tipschef/guard/auth.guard';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeCreateComponent} from './components/recipe-create/recipe-create.component';
import {UserInformationComponent} from "./components/user-information/user-information.component";
import {PaymentInformationComponent} from "./components/payment-information/payment-information.component";
import {BankAccountInformationComponent} from "./components/bank-account-information/bank-account-information.component";
import {BookListComponent} from './components/book-list/book-list.component';
import {BookCreateComponent} from './components/book-create/book-create.component';
import {DashComponent} from "./components/dash/dash.component";

const routes: Routes = [
  {
    path: '',
    component: CookComponent,
    children : [
      {
        path: 'dashboard',
        component : DashComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'recipe',
        component : RecipeListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'book',
        component : BookListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'book-create',
        component : BookCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'recipe-create',
        component : RecipeCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'info',
        component : UserInformationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'payment-information',
        component : PaymentInformationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'bank-account-information',
        component : BankAccountInformationComponent,
        canActivate: [AuthGuard],
        data: {roles: ['partner']}
      },
      {
        path: '**',
        component : DashboardComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookRoutingModule {
}
