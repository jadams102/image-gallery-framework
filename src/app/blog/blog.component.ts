import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private seo: SeoService) { }
  
  ngOnInit() {
    
    this.seo.generateTags({
      title: 'Blog Page', 
      description: 'This page has a blog on it', 
      image: 'https://instafire-app.firebaseapp.com/assets/meerkat.jpeg',
      slug: 'blog'
    })
  }

}
