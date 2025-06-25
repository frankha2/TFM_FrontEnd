import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";

@Component({
    imports: [CardModule, ReactiveFormsModule, ButtonModule, InputTextModule],
    selector: 'app-filter-route',
    templateUrl: './filter-route.component.html',
    styleUrls: ['./filter-route.component.scss']
})

export class FilterRouteComponent implements OnInit {

    private fb: FormBuilder = inject(FormBuilder);

    formGroup!: FormGroup;

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.formGroup = this.fb.group({
            latitude: [''],
            longitude: [''],
            status: [''],
        });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            console.log('Form Data:', formData);
            // Here you can handle the form submission, e.g., filter routes based on the form data.
        } else {
            console.error('Form is invalid');
        }
    }
}