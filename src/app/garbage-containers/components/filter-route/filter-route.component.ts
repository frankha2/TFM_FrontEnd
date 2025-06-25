import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { FilterRoute } from "../../interfaces/filter-route.interface";

@Component({
    imports: [CardModule, ReactiveFormsModule, ButtonModule, InputTextModule],
    selector: 'app-filter-route',
    templateUrl: './filter-route.component.html',
    styleUrls: ['./filter-route.component.scss']
})

export class FilterRouteComponent implements OnInit {

    @Output() filterApplied = new EventEmitter<FilterRoute>();

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
        this.filterApplied.emit(
        {
            latitude: this.formGroup.value.latitude, 
            longitude: this.formGroup.value.longitude, 
            status: this.formGroup.value.status
        });
    }
}