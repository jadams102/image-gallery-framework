import { Component, OnInit, Input } from '@angular/core';
import { Upload } from '../models/upload.model';
import { UploadService } from '../services/upload.service'
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() galleryName;

  files: FileList;
  upload: Upload;
  addingImages: boolean;

  constructor(private uploadService: UploadService, private imageService: ImageService) { 
  }

  ngOnInit() {
    this.addingImages = false;
  }

  toggleAddingImages() {
    if(!this.addingImages) {
      this.addingImages = true;
    } else {
      this.addingImages = false;
    }
  }

  handleFiles(event){
    this.files = event.target.files
  }

  uploadFiles(title: string){
    this.uploadService.setUploadPath(this.galleryName.toLowerCase());
    const filesToUpload = this.files;
      this.upload = new Upload(filesToUpload[0]);
      this.upload.name = title;
      this.upload.gallery = this.galleryName;
      this.uploadService.uploadFiles(this.upload);
  }
}