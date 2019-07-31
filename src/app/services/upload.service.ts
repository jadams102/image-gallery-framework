import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Upload } from '../models/upload.model';
import * as  firebase from 'firebase';

@Injectable()
export class UploadService {

  public basePath = '/galleries';

  constructor(private db: AngularFireDatabase ) { }

  setUploadPath(galleryName: string) {
    this.basePath = '/galleries/' + galleryName;
    console.log(this.basePath);
  }

  uploadFiles(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      console.log(upload.progress);
    },

    (error) => {
      console.log(error);
    },

    ():any => {
      upload.url = uploadTask.snapshot.downloadURL;
      upload.title = upload.file.name;
      this.saveFileData(upload);
    }
  );
}

deleteFile(name, gallery) {
  const storageRef = firebase.storage().ref();
  const imgRef = storageRef.child( '/galleries/' + gallery + '/' + name);
  imgRef.delete()
}

private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log("Files Saved: " + upload.url)
  }
}
