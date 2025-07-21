import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TreeModule } from 'primeng/tree';
import { TreeNode } from "primeng/api";
import { CheckboxModule } from "primeng/checkbox";
import { PanelModule } from "primeng/panel";
import { SliderModule } from 'primeng/slider';

@Component({
    imports: [ 
        CommonModule, 
        CheckboxModule,
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

    // Variables respecto a los 'estados' y 'nivel de llenado' de los contenedores seleccionados.
    public selectedStatus!: TreeNode;
    public levelSelected: number = 0;
    // Menú de los estados a seleccionar. 
    public fillLevels: TreeNode[] = [

        {
            key: '0',
            label: 'Estado',
            data: { type: 'checkbox'},
            children: [
                { key: '0-0', label: 'Todos', data: 'https://angular.io', type: 'url' },
                { key: '0-1', label: 'Alto', data: 'https://angular.io', type: 'url' },
                { key: '0-2', label: 'Medio', data: 'https://angular.io', type: 'url' },
                { key: '0-3', label: 'Bajo', data: 'https://angular.io', type: 'url' },
            ],
        }
    ]

    ngOnInit(): void {

    }
    // Guarda el valor seleccionado del nivel de llenado.
    onSelectFillLevel(event: any) {
        this.levelSelected = event?.value;

    }
    // Guarda el valor seleccionado del estado de los contenedores.
    onSelectStatus(event: any) {
        if (event?.node?.label != 'Estado') {
            this.selectedStatus = event?.node?.label;
        }
    }

}