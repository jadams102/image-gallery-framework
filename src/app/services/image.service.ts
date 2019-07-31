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
  allGalleries: AngularFireList<any[]>;

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase, private uploadService: UploadService) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
    this.allGalleries = this.database.list('galleries');
  }

  setGallery(galleryPath: string) {
    this.gallery = this.database.list('galleries/' + galleryPath + '/');
  }

  getGallery() {
    return this.gallery;
  }

  deleteGallery(galleryPath: string) {
    const galleryToDelete = this.database.list('galleries/' + galleryPath + '/');
    galleryToDelete.remove();

  }

  getImageById(galleryPath: string, key: string) {
    return this.database.object('galleries/' + galleryPath + '/' + key);
  }

  removeImage(image: Upload) {
    let imageEntry = this.getImageById(image.gallery.toLowerCase(), image.$key);
    imageEntry.remove();
    this.uploadService.deleteFile(image.title, image.gallery.toLowerCase());
  }
}
