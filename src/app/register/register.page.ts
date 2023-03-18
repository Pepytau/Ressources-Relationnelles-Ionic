import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = this.fb.group({
    mail: ['', Validators.required],
    alias: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
