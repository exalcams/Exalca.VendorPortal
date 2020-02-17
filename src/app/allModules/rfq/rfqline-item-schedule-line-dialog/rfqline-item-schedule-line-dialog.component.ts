import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ChangePasswordDialogComponent } from 'app/allModules/authentication/change-password-dialog/change-password-dialog.component';
import { RFQLineItemSchedule } from 'app/models/rfq.module';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'rfqline-item-schedule-line-dialog',
  templateUrl: './rfqline-item-schedule-line-dialog.component.html',
  styleUrls: ['./rfqline-item-schedule-line-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RFQLineItemScheduleLineDialogComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RFQLineItemSchedule[],
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  YesClicked(): void {
    this.matDialogRef.close(this.data);
  }
  CloseClicked(): void {
    this.matDialogRef.close(null);
  }

}
