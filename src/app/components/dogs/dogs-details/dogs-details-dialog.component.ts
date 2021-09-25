import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Dog } from '../dogs';

@Component({
  selector: 'app-dogs-details',
  templateUrl: './dogs-details-dialog.component.html',
  styleUrls: ['./dogs-details-dialog.component.scss']
})
export class DogsDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<DogsDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
