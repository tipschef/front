import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { BookCardComponent } from './components/book-card/book-card.component';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RecipeScrollComponent } from './components/recipe-scroll/recipe-scroll.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { LikedRecipeComponent } from './components/liked-recipe/liked-recipe.component';
import {WallComponent} from './components/wall/wall.component';
import {RouterModule} from '@angular/router';
import { SearchUserComponent } from './components/search-user/search-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material-module/material.module';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { TipschefSubscriptionComponent } from './components/tipschef-subscription/tipschef-subscription.component';
import { GiftSubscriptionComponent } from './components/gift-subscription/gift-subscription.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { FollowComponent } from './components/follow/follow.component';
import {SwiperModule} from 'swiper/angular';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [
    ProfileComponent,
    RecipeCardComponent,
    BookCardComponent,
    RecipeScrollComponent,
    RecipeDetailComponent,
    LikedRecipeComponent,
    WallComponent,
    SearchUserComponent,
    SafeHtmlPipe,
    BookDetailComponent,
    TipschefSubscriptionComponent,
    GiftSubscriptionComponent,
    SubscriptionListComponent,
    FollowComponent,
    MessageComponent
  ],
    exports: [
        RecipeCardComponent,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ScrollingModule,
        RouterModule,
        ReactiveFormsModule,
        SwiperModule
    ]
})
export class CommonTipschefModule { }
