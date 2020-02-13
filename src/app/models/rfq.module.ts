export class RFQHeader {
    RFQNUMBER: string;
    RFQTYPE: string;
    EVALUATE_BY?: Date;
    SUBMISSION_STARTS?: Date;
    SUBMISSION_CLOSE?: Date;
    PURCAHSE_PERDIOD_START?: Date;
    PURCAHSE_PERDIOD_END?: Date;
    CURRENCY: string;
    EXCAHANGE_RATE: string;
    VENDOR: string;
    BIDNING_PERIOD: string;
    YOUR_REFERENCE: string;
    CONTACT_PERSON: string;
    TELEPHONE: string;
    LONG_TEXT_TABLE: string;
    PAYMENT_TERMS: string;
    STATUS: string;
    ISXMLCREATED: boolean;
    XMLMOVED_ON?: Date;
    ISACTIVE: boolean;
    CREATED_ON: Date;
    CREATED_BY: string;
    MODIFIED_ON?: Date;
    MODIFIED_BY: string;
}

export class RFQItem {
    RFQNUMBER: string;
    ITEM: string;
    MATERIAL: string;
    SHORT_TEXT: string;
    QTY: number;
    PRICE?: number;
    PER_QTY: string;
    UOM: string;
    DATE_FORMAT: string;
    DELIVERY_DATE: string;
    RESPDELDATE: string;
    PLANT: string;
    DELVEIRY_ADDRESS: string;
    SCHEDULE?: number;
    VENDOR_MATERIAL_NUMBER: string;
    TAX_CODE: string;
    INCO_TERM: string;
    EXPIRY_DATE: string;
    COUNTRY_OF_ORIGIN: string;
    MANUFACTURAR: string;
    SCHEDULED_QTY?: number;
    ISACTIVE: boolean;
    CREATED_ON: Date;
    CREATED_BY: string;
    MODIFIED_ON?: Date;
    MODIFIED_BY: string;
}

export class RFQWithItem {
    RFQNUMBER: string;
    RFQTYPE: string;
    EVALUATE_BY?: Date;
    SUBMISSION_STARTS?: Date;
    SUBMISSION_CLOSE?: Date;
    PURCAHSE_PERDIOD_START?: Date;
    PURCAHSE_PERDIOD_END?: Date;
    CURRENCY: string;
    EXCAHANGE_RATE: string;
    VENDOR: string;
    BIDNING_PERIOD: string;
    YOUR_REFERENCE: string;
    CONTACT_PERSON: string;
    TELEPHONE: string;
    LONG_TEXT_TABLE: string;
    PAYMENT_TERMS: string;
    STATUS: string;
    ISXMLCREATED: boolean;
    XMLMOVED_ON?: Date;
    ISACTIVE: boolean;
    CREATED_ON: Date;
    CREATED_BY: string;
    MODIFIED_ON?: Date;
    MODIFIED_BY: string;
    RFQItems: RFQItem[];
}
