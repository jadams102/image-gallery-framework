import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'firebase/storage';
import { Upload } from '../models/upload.model';
import { UploadService } from './upload.service';

@Injectable()
export class ImageService {
  private uid: string;
  gallery: AngularFireList<Upload[]>;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private uploadService: UploadService) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
    this.gallery = this.database.list('galleries');
  }

  getGallery() {
    return this.gallery;
  }

  getImageById(key: string) {
    return this.database.object('galleries/' + key);
  }

  removeImage(image: Upload) {
    let imageEntry = this.getImageById(image.$key);
    imageEntry.remove();
    this.uploadService.deleteFile(image.title);
  }
}
