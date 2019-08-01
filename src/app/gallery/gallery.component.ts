import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Upload } from '../models/upload.model';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryName: string;
  images: Upload[][];
  keys: String[];
  user: Observable<firebase.User>;

  constructor(private authService: AuthenticationService, private imageService: ImageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.galleryName = 'TestGallery'
    this.imageService.setGallery(this.galleryName.toLowerCase());
    this.imageService.getGallery().valueChanges().subscribe((data) => {
      this.imageService.getGallery().snapshotChanges().pipe(
        map(actions => actions.map(a=> ({key: a.key}))
        )).subscribe(keys => {
          this.images = data;
          this.keys = keys.map(item => item.key);
          console.log(this.keys);
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
  }

  goToImageDetail(gallery: string, key: string) {
    this.router.navigate([gallery, key]);
  }

  deleteImage(image) {
    this.imageService.removeImage(image);
  }

}
