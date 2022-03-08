import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsFeedPageComponent} from "./pages/news-feed-page/news-feed-page.component";

const routes: Routes = [{
  path: '', component: NewsFeedPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
