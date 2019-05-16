import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
