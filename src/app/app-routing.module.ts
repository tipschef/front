import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './common-tipschef/components/home/home.component';
import {SignUpComponent} from './common-tipschef/components/sign-up/sign-up.component';
import {LogInComponent} from './common-tipschef/components/log-in/log-in.component';
import {WallComponent} from './common-tipschef/components/wall/wall.component';
import {AuthGuard} from './common-tipschef/guard/auth.guard';
import {ProfileComponent} from './common-tipschef/components/profile/profile.component';
import {RecipeDetailComponent} from './common-tipschef/components/recipe-detail/recipe-detail.component';
import {LikedRecipeComponent} from './common-tipschef/components/liked-recipe/liked-recipe.component';
import {SearchUserComponent} from './common-tipschef/components/search-user/search-user.component';
import {BookDetailComponent} from './common-tipschef/components/book-detail/book-detail.component';
import {TipschefSubscriptionComponent} from './common-tipschef/components/tipschef-subscription/tipschef-subscription.component';
import {GiftSubscriptionComponent} from './common-tipschef/components/gift-subscription/gift-subscription.component';
import {BookPurchaseComponent} from "./common-tipschef/components/book-purchase/book-purchase.component";
import {SubscriptionListComponent} from './common-tipschef/components/subscription-list/subscription-list.component';
import {FollowComponent} from "./common-tipschef/components/follow/follow.component";

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WallComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'follow',
    component: FollowComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'liked-recipe',
    component: LikedRecipeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'book-purchase',
    component: BookPurchaseComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchUserComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'subscriptions',
    component: SubscriptionListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: WallComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'cook',
    loadChildren: () => import('./cook/cook.module').then(m => m.CookModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-tipschef/admin-tipschef.module').then(m => m.AdminTipschefModule),
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'recipe/:recipe_id',
    component: RecipeDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'subscribe/:username',
    component: TipschefSubscriptionComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'gift-subscription/:username',
    component: GiftSubscriptionComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'book/:book_id',
    component: BookDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':username',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
