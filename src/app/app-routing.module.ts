import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryOneComponent } from './gallery-one/gallery-one.component';
import { GalleryTwoComponent } from './gallery-two/gallery-two.component';
import { GalleryImageDetailComponent } from './gallery-image-detail/gallery-image-detail.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'galleryzero',
    component: GalleryComponent
  },  
  {
    path: 'galleryone',
    component: GalleryOneComponent
  },  
  {
    path: 'gallerytwo',
    component: GalleryTwoComponent
  },
  {
    path: ':name/:id',
    component: GalleryImageDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
