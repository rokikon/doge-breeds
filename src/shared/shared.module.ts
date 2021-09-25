import { DragDropModule } from '@angular/cdk/drag-drop'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { TableComponent } from './components/table/table.component';

const MATERIAL = [
  MatIconModule,
  MatDialogModule,
  DragDropModule,
]

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    ...MATERIAL,
  ],
  exports: [
    TableComponent,
    ...MATERIAL,
  ]
})
export class SharedModule { }
