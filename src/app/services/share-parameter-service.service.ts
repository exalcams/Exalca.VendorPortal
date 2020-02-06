import { Injectable } from '@angular/core';
import { RFQHeader } from 'app/models/rfq.module';

@Injectable({
  providedIn: 'root'
})
export class ShareParameterServiceService {
  public CurrentRFQID: string;
  public CurrentRFQ: RFQHeader;
  constructor() { }
  SetRFQID(RFQID: string): void {
    this.CurrentRFQID = RFQID;
  }
  GetRFQID(): string {
    return this.CurrentRFQID;
  }
  SetRFQ(RFQ: RFQHeader): void {
    this.CurrentRFQ = RFQ;
  }
  GetRFQ(): RFQHeader {
    return this.CurrentRFQ;
  }
}
