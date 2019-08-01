import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private seo: SeoService) { }
  
  ngOnInit() {
    
    this.seo.generateTags({
      title: 'Contact Page', 
      description: 'This page will let you contact me', 
      image: 'https://instafire-app.firebaseapp.com/assets/meerkat.jpeg',
      slug: 'contact'
    })
  }

  sendMessage(email: string, message: string) {
    if (email === '') {
      return alert('Please Enter an Email');
    } else if (message === '') {
      return alert('Please Enter a Message')
    } else {
      var destinationEmail = "joeladamsdesign@gmail.com";
      var form = document.createElement('form');
      form.setAttribute("action", "https://formspree.io/" + destinationEmail)
      form.setAttribute("method", "POST")

      // Subject for your email
      var field = document.createElement("input");
      field.setAttribute("type", "hidden");
      field.setAttribute("name", "message");
      field.setAttribute("value", message);
      form.appendChild(field);

      // Contact email address        
      field = document.createElement("input");
      field.setAttribute("type", "hidden");
      field.setAttribute("name", "email");
      field.setAttribute("value", email);
      form.appendChild(field);

      document.body.appendChild(form);
      form.submit();
    }
  }
}
