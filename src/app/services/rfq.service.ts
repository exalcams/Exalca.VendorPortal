import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { RFQWithItem, RFQHeader, RFQWithLineItem, RFQLineItemSchedule } from 'app/models/rfq.module';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RFQService {
  baseAddress: string;
  constructor(private _httpClient: HttpClient, private _authService: AuthService) {
    this.baseAddress = _authService.baseAddress;
  }

  // Error Handler
  errorHandler(error: HttpErrorResponse): Observable<string> {
    return throwError(error.error || error.message || 'Server Error');
  }

  UpdateRFQ(rFQWithItem: RFQWithLineItem): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/RFQ/UpdateRFQ`,
      rFQWithItem,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  UpdateRFQStatus(RFQNUMBER: string, STATUS: string): Observable<any> {
    return this._httpClient.get<any>(`${this.baseAddress}api/RFQ/UpdateRFQStatus?RFQNUMBER=${RFQNUMBER}&STATUS=${STATUS}`)
      .pipe(catchError(this.errorHandler));
  }

  GetRFQByVendor(Vendor: string): Observable<RFQHeader[] | string> {
    return this._httpClient.get<RFQHeader[]>(`${this.baseAddress}api/RFQ/GetRFQByVendor?Vendor=${Vendor}`)
      .pipe(catchError(this.errorHandler));
  }

  GetRFQByRFQNumber(RFQNUMBER: string): Observable<RFQWithLineItem | string> {
    return this._httpClient.get<RFQWithLineItem>(`${this.baseAddress}api/RFQ/GetRFQByRFQNumber?RFQNUMBER=${RFQNUMBER}`)
      .pipe(catchError(this.errorHandler));
  }

  GetRFQLineItemSchedulesByItem(RFQNUMBER: string, ITEM: string): Observable<RFQLineItemSchedule[] | string> {
    return this._httpClient.get<RFQLineItemSchedule[]>(`${this.baseAddress}api/RFQ/GetRFQLineItemSchedulesByItem?RFQNUMBER=${RFQNUMBER}&ITEM=${ITEM}`)
      .pipe(catchError(this.errorHandler));
  }


}
