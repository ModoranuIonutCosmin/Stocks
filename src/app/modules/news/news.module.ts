import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsFeedPageComponent } from './pages/news-feed-page/news-feed-page.component';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    NewsItemComponent,
    NewsFeedPageComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule
  ]
})
export class NewsModule { }
