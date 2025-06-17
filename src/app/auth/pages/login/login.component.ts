import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [CardModule, CommonModule, ReactiveFormsModule, ButtonModule]
})
export class LoginComponent implements OnInit {

  private _fb = inject(FormBuilder);
  private router = inject(Router);

  public form!: FormGroup;
  
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.router.navigate(['/smartcity']);
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}