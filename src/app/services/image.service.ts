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
  }



  getGallery(galleryPath: string) {
    this.gallery = this.database.list('galleries/' + galleryPath + '/');
    return this.gallery;
  }

  getImageById(galleryPath: string, key: string) {
    return this.database.object('galleries/' + galleryPath + '/' + key);
  }

  getThumbnail(galleryPath: string) {
       return this.database.list('galleries/' + galleryPath + '/')
  }

  removeImage(gallery: string, key: string, title: string) {
    let imageEntry = this.getImageById(gallery.toLowerCase(), key);
    imageEntry.remove();
    this.uploadService.deleteFile(title, gallery.toLowerCase());
  }
}
