import {Component, Input, OnInit} from '@angular/core';
import {NewsPost} from "../../models/news-post";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  @Input() newsPost: NewsPost = {
    title: 'Entering beta dev. stage!',
    body: `<p> Great </p>`,
    date: new Date(),
    coverImageSrc: 'https://media.istockphoto.com/vectors/green-bull-and-red-bear-vector-id948421046?k=20&m=948421046&s=612x612&w=0&h=K3vuZh1D2jXykXzmwfCEHkwzTv7lQYugan8hfgg5qkc='
  }
  constructor() { }

  ngOnInit(): void {
  }

}
