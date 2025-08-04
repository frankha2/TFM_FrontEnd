import { Component, inject, OnInit, output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TreeModule } from 'primeng/tree';
import { TreeNode } from "primeng/api";
import { PanelModule } from "primeng/panel";
import { SliderModule } from 'primeng/slider';

@Component({
    imports: [ 
        CommonModule,
        FormsModule,
        ButtonModule, 
        InputTextModule, 
        ReactiveFormsModule,
        PanelModule, 
        DialogModule, 
        TreeModule,  
        CardModule, 
        SliderModule
    ],
    selector: 'app-filter-map-component',
    templateUrl: './filter-map.component.html',
    styleUrls: ['./filter-map.component.scss']
})

export class FilterMapComponent implements OnInit {
    // Emite el evento con los valores seleccionados de los filtros.
    filterForm = output<FormGroup>();

    // Variables respecto a los 'estados' y 'nivel de llenado' de los contenedores seleccionados.
    public selectedStatusNode: string = 'Todos';
    public levelSelected: number = 0;
    // Formulario reactivo para los filtros de búsqueda.
    public form!: FormGroup;

    // Menú de los estados a seleccionar. 
    public fillLevels: TreeNode[] = [

        {
            key: '0',
            label: 'Estado',
            type: 'encabezado',
            selectable: false,
            data: { type: 'checkbox'},
            children: [
                { key: '0-0', label: 'Todos', data: 'https://angular.io', type: 'opcion' },
                { key: '0-1', label: 'Alto', data: 'https://angular.io', type: 'opcion' },
                { key: '0-2', label: 'Medio', data: 'https://angular.io', type: 'opcion' },
                { key: '0-3', label: 'Bajo', data: 'https://angular.io', type: 'opcion' },
            ],
        }
    ]

    private fb = inject(FormBuilder);

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            fillLevel: [0],
            status: ['Todos']
        });
    }
    // Guarda el valor seleccionado del nivel de llenado.
    onSelectFillLevel(event: any) {
        this.form?.get('fillLevel')?.setValue(event?.value);

    }
    // Guarda el valor seleccionado del estado de los contenedores.
    onSelectStatus(event: any) {
        if (event?.node?.type !== 'encabezado') {
            this.form?.get('status')?.setValue(event?.node?.label);
            this.selectedStatusNode = event?.node?.label;
        }
    }
    // Envía los valores seleccionados al componente padre.
    onSubmit() {
        this.filterForm?.emit(this.form);
    }

}