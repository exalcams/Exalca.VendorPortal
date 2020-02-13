import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationDetails } from 'app/models/master';
import { Guid } from 'guid-typescript';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { RFQHeader, RFQWithItem, RFQItem } from 'app/models/rfq.module';
import { Router } from '@angular/router';
import { MatIconRegistry, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { MasterService } from 'app/services/master.service';
import { TransformService } from 'app/services/Transform.service';
import { AdapterService } from 'app/services/adapter.service';
import { RFQService } from 'app/services/rfq.service';
import { ShareParameterServiceService } from 'app/services/share-parameter-service.service';
import { DatePipe } from '@angular/common';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { BehaviorSubject } from 'rxjs';
import { NotificationDialogComponent } from 'app/notifications/notification-dialog/notification-dialog.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-rfqresponse',
  templateUrl: './rfqresponse.component.html',
  styleUrls: ['./rfqresponse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RFQResponseComponent implements OnInit {
  authenticationDetails: AuthenticationDetails;
  MenuItems: string[];
  CurrentUserName: string;
  CurrentUserID: Guid;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  IsProgressBarVisibile: boolean;
  SelectedRFQ: RFQHeader;
  SelectedRFQWithItem: RFQWithItem;
  RFQResponseFormGroup: FormGroup;
  RFQResponseItemFormGroup: FormGroup;
  RFQItemColumns: string[] = ['ITEM', 'MATERIAL', 'SHORT_TEXT', 'QTY', 'PRICE', 'PER_QTY', 'DELIVERY_DATE',
    'RESPDELDATE', 'PLANT', 'DELVEIRY_ADDRESS', 'SCHEDULE', 'SCHEDULED_QTY', 'VENDOR_MATERIAL_NUMBER',
    'TAX_CODE', 'INCO_TERM', 'EXPIRY_DATE', 'COUNTRY_OF_ORIGIN', 'MANUFACTURAR'
  ];
  RFQItemFormArray: FormArray = this._formBuilder.array([]);
  RFQItemDataSource = new BehaviorSubject<AbstractControl[]>([]);
  constructor(
    private _router: Router,
    matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _masterService: MasterService,
    private _transformService: TransformService,
    private _adapterService: AdapterService,
    private _rfqService: RFQService,
    private _shareParameterService: ShareParameterServiceService,
    private dialog: MatDialog,
    private _datePipe: DatePipe
  ) {
    this.SelectedRFQ = this._shareParameterService.GetRFQ();
    if (this.SelectedRFQ) {

    } else {
      this._router.navigate(['/rfq/dashboard']);
    }
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    this.IsProgressBarVisibile = false;
  }

  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.CurrentUserName = this.authenticationDetails.userName;
      this.CurrentUserID = this.authenticationDetails.userID;
      this.MenuItems = this.authenticationDetails.menuItemNames.split(',');
      if (this.MenuItems.indexOf('RFQ Response') < 0) {
        this.notificationSnackBarComponent.openSnackBar('You do not have permission to visit this page', SnackBarStatus.danger);
        this._router.navigate(['/auth/login']);
      }
    } else {
      this._router.navigate(['/auth/login']);
    }
    this.RFQResponseFormGroup = this._formBuilder.group({
      EXCAHANGE_RATE: ['', Validators.required],
      BIDNING_PERIOD: ['', Validators.required],
      YOUR_REFERENCE: ['', Validators.required],
      CONTACT_PERSON: ['', Validators.required],
      TELEPHONE: ['', Validators.required],
      LONG_TEXT_TABLE: ['', Validators.required],
      PAYMENT_TERMS: ['', Validators.required],
    });
    this.RFQResponseItemFormGroup = this._formBuilder.group({
      RFQItems: this.RFQItemFormArray
    });
    // this.SelectedRFQWithItem.PURCAHSE_PERDIOD_END
    this.GetRFQByRFQNumber();
  }

  GetRFQByRFQNumber(): void {
    this.IsProgressBarVisibile = true;
    this._rfqService.GetRFQByRFQNumber(this.SelectedRFQ.RFQNUMBER).subscribe(
      (data) => {
        this.IsProgressBarVisibile = false;
        this.SelectedRFQWithItem = data as RFQWithItem;
        if (this.SelectedRFQWithItem) {
          this.SetRFQHeaderValues();
          if (this.SelectedRFQWithItem.RFQItems && this.SelectedRFQWithItem.RFQItems.length) {
            this.SelectedRFQWithItem.RFQItems.forEach(x => {
              this.SetRFQItemValues(x);
            });
          }
        }
      },
      (err) => {
        console.error(err);
        this.IsProgressBarVisibile = false;
      }
    );
  }

  SetRFQHeaderValues(): void {
    this.RFQResponseFormGroup.get('EXCAHANGE_RATE').patchValue(this.SelectedRFQWithItem.EXCAHANGE_RATE);
    this.RFQResponseFormGroup.get('BIDNING_PERIOD').patchValue(this.SelectedRFQWithItem.BIDNING_PERIOD);
    this.RFQResponseFormGroup.get('YOUR_REFERENCE').patchValue(this.SelectedRFQWithItem.YOUR_REFERENCE);
    this.RFQResponseFormGroup.get('CONTACT_PERSON').patchValue(this.SelectedRFQWithItem.CONTACT_PERSON);
    this.RFQResponseFormGroup.get('TELEPHONE').patchValue(this.SelectedRFQWithItem.TELEPHONE);
    this.RFQResponseFormGroup.get('PAYMENT_TERMS').patchValue(this.SelectedRFQWithItem.PAYMENT_TERMS);
    this.RFQResponseFormGroup.get('LONG_TEXT_TABLE').patchValue(this.SelectedRFQWithItem.LONG_TEXT_TABLE);
  }

  SetRFQItemValues(adpterItem: RFQItem): void {
    const row = this._formBuilder.group({
      ITEM: [adpterItem.ITEM, Validators.required],
      MATERIAL: [adpterItem.MATERIAL, Validators.required],
      SHORT_TEXT: [adpterItem.SHORT_TEXT, Validators.required],
      QTY: [adpterItem.QTY, Validators.required],
      PRICE: [adpterItem.PRICE, Validators.required],
      PER_QTY: [adpterItem.PER_QTY, Validators.required],
      DELIVERY_DATE: [adpterItem.DELIVERY_DATE, Validators.required],
      RESPDELDATE: [adpterItem.RESPDELDATE, Validators.required],
      PLANT: [adpterItem.PLANT, Validators.required],
      DELVEIRY_ADDRESS: [adpterItem.DELVEIRY_ADDRESS, Validators.required],
      SCHEDULE: [adpterItem.SCHEDULE, Validators.required],
      SCHEDULED_QTY: [adpterItem.SCHEDULED_QTY, Validators.required],
      VENDOR_MATERIAL_NUMBER: [adpterItem.VENDOR_MATERIAL_NUMBER, Validators.required],
      TAX_CODE: [adpterItem.TAX_CODE, Validators.required],
      INCO_TERM: [adpterItem.INCO_TERM, Validators.required],
      EXPIRY_DATE: [adpterItem.EXPIRY_DATE, Validators.required],
      COUNTRY_OF_ORIGIN: [adpterItem.COUNTRY_OF_ORIGIN, Validators.required],
      MANUFACTURAR: [adpterItem.MANUFACTURAR, Validators.required],
    });
    row.get('ITEM').disable();
    row.get('MATERIAL').disable();
    row.get('SHORT_TEXT').disable();
    row.get('QTY').disable();
    row.get('DELIVERY_DATE').disable();
    row.get('PLANT').disable();
    this.RFQItemFormArray.push(row);
    this.RFQItemDataSource.next(this.RFQItemFormArray.controls);
  }

  GetHeaderValues(): void {
    this.SelectedRFQWithItem.EXCAHANGE_RATE = this.RFQResponseFormGroup.get('EXCAHANGE_RATE').value;
    this.SelectedRFQWithItem.BIDNING_PERIOD = this.RFQResponseFormGroup.get('BIDNING_PERIOD').value;
    this.SelectedRFQWithItem.YOUR_REFERENCE = this.RFQResponseFormGroup.get('YOUR_REFERENCE').value;
    this.SelectedRFQWithItem.CONTACT_PERSON = this.RFQResponseFormGroup.get('CONTACT_PERSON').value;
    this.SelectedRFQWithItem.TELEPHONE = this.RFQResponseFormGroup.get('TELEPHONE').value;
    this.SelectedRFQWithItem.PAYMENT_TERMS = this.RFQResponseFormGroup.get('PAYMENT_TERMS').value;
    this.SelectedRFQWithItem.LONG_TEXT_TABLE = this.RFQResponseFormGroup.get('LONG_TEXT_TABLE').value;
  }

  GetRFQItemValues(): void {
    const RFQItemsArr = this.RFQResponseItemFormGroup.get('RFQItems') as FormArray;
    RFQItemsArr.controls.forEach((x) => {
      const ItemID = x.get('ITEM').value;
      const SelectedRFQItem = this.SelectedRFQWithItem.RFQItems.filter(y => y.ITEM === ItemID)[0];
      SelectedRFQItem.PRICE = x.get('PRICE').value;
      SelectedRFQItem.PER_QTY = x.get('PER_QTY').value;
      SelectedRFQItem.RESPDELDATE = this._datePipe.transform(x.get('RESPDELDATE').value, 'dd.MM.yyyy');
      SelectedRFQItem.DELVEIRY_ADDRESS = x.get('DELVEIRY_ADDRESS').value;

      SelectedRFQItem.SCHEDULE = x.get('SCHEDULE').value;
      SelectedRFQItem.SCHEDULED_QTY = x.get('SCHEDULED_QTY').value;
      SelectedRFQItem.VENDOR_MATERIAL_NUMBER = x.get('VENDOR_MATERIAL_NUMBER').value;
      SelectedRFQItem.TAX_CODE = x.get('TAX_CODE').value;

      SelectedRFQItem.INCO_TERM = x.get('INCO_TERM').value;
      SelectedRFQItem.EXPIRY_DATE = this._datePipe.transform(x.get('EXPIRY_DATE').value, 'dd.MM.yyyy');
      SelectedRFQItem.COUNTRY_OF_ORIGIN = x.get('COUNTRY_OF_ORIGIN').value;
      SelectedRFQItem.MANUFACTURAR = x.get('MANUFACTURAR').value;
    });
  }

  SubmitClicked(): void {
    if (this.RFQResponseFormGroup.valid) {
      if (this.RFQResponseItemFormGroup.valid) {
        const Actiontype = 'Respond';
        const Catagory = 'RFQ';
        this.OpenConfirmationDialog(Actiontype, Catagory);
      } else {
        this.ShowValidationErrors(this.RFQResponseItemFormGroup);
      }
    } else {
      this.ShowValidationErrors(this.RFQResponseFormGroup);
    }
  }
  OpenConfirmationDialog(Actiontype: string, Catagory: string): void {
    const dialogConfig: MatDialogConfig = {
      data: {
        Actiontype: Actiontype,
        Catagory: Catagory
      },
    };
    const dialogRef = this.dialog.open(NotificationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.UpdateRFQ();
        }
      });
  }

  UpdateRFQ(): void {
    this.GetHeaderValues();
    this.GetRFQItemValues();
    this.SelectedRFQWithItem.STATUS = 'Responded';
    this.IsProgressBarVisibile = true;
    this._rfqService.UpdateRFQ(this.SelectedRFQWithItem).subscribe(
      (data) => {
        this.IsProgressBarVisibile = false;
        this.notificationSnackBarComponent.openSnackBar('RFQ responded successfully', SnackBarStatus.success);
        this._router.navigate(['/rfq/dashboard']);
      },
      (err) => {
        console.error(err);
        this.IsProgressBarVisibile = false;
        this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
      }
    );
  }

  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      if (!formGroup.get(key).valid) {
        console.log(key);
      }
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
      if (formGroup.get(key) instanceof FormArray) {
        const FormArrayControls = formGroup.get(key) as FormArray;
        Object.keys(FormArrayControls.controls).forEach(key1 => {
          if (FormArrayControls.get(key1) instanceof FormGroup) {
            const FormGroupControls = FormArrayControls.get(key1) as FormGroup;
            Object.keys(FormGroupControls.controls).forEach(key2 => {
              FormGroupControls.get(key2).markAsTouched();
              FormGroupControls.get(key2).markAsDirty();
              if (!FormGroupControls.get(key2).valid) {
                console.log(key2);
              }
            });
          } else {
            FormArrayControls.get(key1).markAsTouched();
            FormArrayControls.get(key1).markAsDirty();
          }
        });
      }
    });
  }
}
