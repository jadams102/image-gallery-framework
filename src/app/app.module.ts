import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { config } from './api-keys'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component'

import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/authguard.service';
import { ImageService } from './services/image.service';
import { UploadService } from './services/upload.service';
import { GalleryImageDetailComponent } from './gallery-image-detail/gallery-image-detail.component';
import { GalleryOneComponent } from './gallery-one/gallery-one.component';
import { GalleryTwoComponent } from './gallery-two/gallery-two.component';

export const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    GalleryComponent,
    AboutComponent,
    BlogComponent,
    FooterComponent,
    LoginComponent,
    UploadComponent,
    GalleryImageDetailComponent,
    GalleryOneComponent,
    GalleryTwoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [AngularFireAuth, AuthenticationService, AuthGuard, ImageService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
