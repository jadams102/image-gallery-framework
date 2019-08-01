import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Upload } from '../models/upload.model';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-gallery-two',
  templateUrl: './gallery-two.component.html',
  styleUrls: ['./gallery-two.component.scss']
})
export class GalleryTwoComponent implements OnInit {

  galleryName: string;
  images: Upload[][];
  keys: String[];
  user: Observable<firebase.User>;

  constructor(private seo: SeoService, private authService: AuthenticationService, private imageService: ImageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.galleryName = 'GalleryTwo'
    this.imageService.setGallery(this.galleryName.toLowerCase());
    this.imageService.getGallery().valueChanges().subscribe((data) => {
      this.imageService.getGallery().snapshotChanges().pipe(
        map(actions => actions.map(a=> ({key: a.key}))
        )).subscribe(keys => {
          this.images = data;
          this.keys = keys.map(item => item.key);
        })
    })

    // this.imageService.getGallery().snapshotChanges().pipe(
    //   map(actions => 
    //     actions.map(a=> ({key: a.key, ...a.payload.val() }))
    //   ))
    //   .subscribe(data => {
    //   this.images = data.map(item => item.key);
    //   console.log(data);
    // });

    this.user = this.authService.authUser();

    this.seo.generateTags({
      title: 'GalleryTwo' , 
      description: 'This is the second new test gallery', 
      image: 'https://instafire-app.firebaseapp.com/assets/meerkat.jpeg',
      slug: 'gallerytwo'
    })
  }

  goToImageDetail(gallery: string, key: string) {
    this.router.navigate([gallery, key]);
  }

  deleteImage(image: Upload, key) {
    this.imageService.removeImage(image.gallery, key, image.title);
  }

}
