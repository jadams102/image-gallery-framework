import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Upload } from '../models/upload.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageZero: Upload[];
  imageOne: Upload[];
  imageTwo: Upload[];


  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getGallery('galleryzero').valueChanges().subscribe(data => {
      this.imageZero = data[0];
    });

    this.imageService.getGallery('galleryone').valueChanges().subscribe(data => {
      this.imageOne = data[0];
    });

    this.imageService.getGallery('gallerytwo').valueChanges().subscribe(data => {
      this.imageTwo = data[0];
    });
  }

}
