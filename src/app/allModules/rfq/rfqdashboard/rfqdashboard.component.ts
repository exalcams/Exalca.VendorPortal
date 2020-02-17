import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationDetails } from 'app/models/master';
import { Guid } from 'guid-typescript';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { Router } from '@angular/router';
import { MatIconRegistry, MatSnackBar, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { MasterService } from 'app/services/master.service';
import { TransformService } from 'app/services/Transform.service';
import { AdapterService } from 'app/services/adapter.service';
import { DatePipe } from '@angular/common';
import { RFQService } from 'app/services/rfq.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { RFQHeader } from 'app/models/rfq.module';
import { ShareParameterServiceService } from 'app/services/share-parameter-service.service';
import { fuseAnimations } from '@fuse/animations';
import { NotificationDialogComponent } from 'app/notifications/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-rfqdashboard',
  templateUrl: './rfqdashboard.component.html',
  styleUrls: ['./rfqdashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RFQDashboardComponent implements OnInit {
  authenticationDetails: AuthenticationDetails;
  MenuItems: string[];
  CurrentUserName: string;
  CurrentUserID: Guid;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  IsProgressBarVisibile: boolean;
  SelectedRFQ: RFQHeader;
  RFQs: RFQHeader[] = [];
  BGClassName: any;
  RFQColumns: string[] = ['RFQNUMBER', 'RFQTYPE', 'CURRENCY', 'SUBMISSION_STARTS', 'SUBMISSION_CLOSE',
    'PURCAHSE_PERDIOD_START', 'PURCAHSE_PERDIOD_END', 'STATUS', 'Action'];
  RFQDataSource: MatTableDataSource<RFQHeader>;
  selection = new SelectionModel<RFQHeader>(true, []);

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
      if (this.MenuItems.indexOf('RFQ Dashboard') < 0) {
        this.notificationSnackBarComponent.openSnackBar('You do not have permission to visit this page', SnackBarStatus.danger);
        this._router.navigate(['/auth/login']);
      }
    } else {
      this._router.navigate(['/auth/login']);
    }
    this.ResetValues();
    this.GetRFQByVendor();
  }

  ResetValues(): void {
    this.RFQs = [];
    this.ResetCheckbox();
  }
  ResetCheckbox(): void {
    this.selection.clear();
    if (this.RFQDataSource && this.RFQDataSource.data) {
      this.RFQDataSource.data.forEach(row => this.selection.deselect(row));
    }
  }

  GetRFQByVendor(): void {
    this.IsProgressBarVisibile = true;
    this._rfqService.GetRFQByVendor(this.CurrentUserName).subscribe(
      (data) => {
        this.RFQs = data as RFQHeader[];
        this.RFQDataSource = new MatTableDataSource(this.RFQs);
        this.IsProgressBarVisibile = false;
      },
      (err) => {
        console.error(err);
        this.IsProgressBarVisibile = false;
      }
    );
  }

  // RowSelected(data: RFQHeader): void {
  //   this.SelectedRFQ = data;
  // }

  onChangeChk($event, data: RFQHeader): void {
    // this.selection.toggle(data);
    // if ($event.source.checked) {
    //   this.SelectedRFQ = data;
    // } else {
    //   if (this.selection.selected && this.selection.selected.length && this.selection.selected.length > 0) {
    //     this.SelectedRFQ = this.selection.selected[this.selection.selected.length - 1];
    //   } else {
    //     this.SelectedRFQ = null;
    //   }
    // }
    if ($event.source.checked) {
      this.SelectedRFQ = data;
    } else {
      this.SelectedRFQ = null;
    }
  }

  RespondRFQ(rfq: RFQHeader): void {
    this.SelectedRFQ = rfq;
    // if (this.SelectedRFQ.STATUS.toLowerCase() === 'released') {
    //   this.notificationSnackBarComponent.openSnackBar('RFQ has already been realeased', SnackBarStatus.danger);
    // } else {
    //   this._shareParameterService.SetRFQ(this.SelectedRFQ);
    //   this._router.navigate(['/rfq/response']);
    // }
    this._shareParameterService.SetRFQ(this.SelectedRFQ);
    this._router.navigate(['/rfq/response']);
  }
}
