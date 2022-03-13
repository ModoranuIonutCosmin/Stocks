import { Component, OnInit } from '@angular/core';
import {NewsPost} from "../../models/news-post";

@Component({
  selector: 'app-news-feed-page',
  templateUrl: './news-feed-page.component.html',
  styleUrls: ['./news-feed-page.component.scss']
})
export class NewsFeedPageComponent implements OnInit {

  newsPosts: NewsPost[] = [{
    title: 'Entering beta dev. stage!',
    body: `<p> We're happy to announce reaching a new milestone in the development of this application. You can track details about new features here, on the news tab. <h1> Features </h1> <ul> <li>Researching stock market options using Machine Learning driven algorithms for technical analysis including prices prediction for next period. </li> <li>Tracking stock market information such as up-to-date current price data as well as historical data</li> <li> Simulating opening a virtual transaction and then checking it's profitability as well as other standard economic metric</li> </ul> </p>`,
    date: new Date(),
    coverImageSrc: 'https://media.istockphoto.com/vectors/green-bull-and-red-bear-vector-id948421046?k=20&m=948421046&s=612x612&w=0&h=K3vuZh1D2jXykXzmwfCEHkwzTv7lQYugan8hfgg5qkc='
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
