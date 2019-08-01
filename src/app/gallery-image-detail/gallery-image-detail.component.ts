import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Upload } from '../models/upload.model';
import { ImageService } from '../services/image.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-gallery-image-detail',
  templateUrl: './gallery-image-detail.component.html',
  styleUrls: ['./gallery-image-detail.component.scss']
})
export class GalleryImageDetailComponent implements OnInit {

  constructor(private seo: SeoService, private authService: AuthenticationService, private imageService: ImageService, private route: ActivatedRoute, private router: Router,) { }

  galleryName: string;
  imageKey: string;
  imageToDisplay: any;
  user: Observable<firebase.User>

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.galleryName = urlParameters['name']
      this.imageKey = urlParameters['id'];
    });
    this.imageService.getImageById(this.galleryName.toLowerCase(), this.imageKey).valueChanges().subscribe(
      data => {
        this.imageToDisplay = data;
      }
    )
    this.user = this.authService.authUser();
    this.seo.generateTags({
      title: this.galleryName + ' ' + this.imageToDisplay.name , 
      description: 'This is the original test gallery', 
      image: 'https://instafire-app.firebaseapp.com/assets/meerkat.jpeg',
      slug: 'galleryzero'
    })
  }

  navToGallery() {
    this.router.navigate([this.imageToDisplay.gallery.toLowerCase()])
  }

  deleteImage() {
    this.imageService.removeImage(this.imageToDisplay.gallery, this.imageKey, this.imageToDisplay.name)
    this.router.navigate([this.imageToDisplay.gallery]);
    window.location.reload();
  }

}
