import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';

import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RFQDashboardComponent } from './rfqdashboard/rfqdashboard.component';
import { RFQResponseComponent } from './rfqresponse/rfqresponse.component';
import { SharedModule } from 'app/shared/shared-module';
import { RFQLineItemScheduleLineDialogComponent } from './rfqline-item-schedule-line-dialog/rfqline-item-schedule-line-dialog.component';
import { DecimalPipe } from '@angular/common';

const routes = [
    {
        path: 'dashboard',
        component: RFQDashboardComponent
    },
    {
        path: 'response',
        component: RFQResponseComponent
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        // HttpClientModule,
        // TranslateModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,

        NgxChartsModule,

        FuseSharedModule,

        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule,

        FormsModule,
        NgxMaterialTimepickerModule,

        SharedModule
    ],
    declarations: [RFQDashboardComponent, RFQResponseComponent, RFQLineItemScheduleLineDialogComponent],
    providers: [DecimalPipe],
    entryComponents: [RFQLineItemScheduleLineDialogComponent]
})
export class RFQModule { }
