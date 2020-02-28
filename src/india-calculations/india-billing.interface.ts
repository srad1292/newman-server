import { IndiaMedication } from "./india-medication.interface";

export interface IndiaBilling {
    medications: IndiaMedication[];
    priceBeforeDiscount: number;
    discountIsPercentage: boolean;
    discount: number;
    discountAccepted: boolean;
    priceAfterDiscount: number;
    cgst: number;
    sgst: number;
    cgstAmount: number;
    sgstAmount: number;
    netPrice: number;
    balance: number;
}


export const defaultIndiaBilling: IndiaBilling  = {
    medications: [],
    priceBeforeDiscount: null,
    discountIsPercentage: true,
    discount: null,
    discountAccepted: null,
    priceAfterDiscount: null,
    cgst: 0,
    sgst: 0,
    cgstAmount: null,
    sgstAmount: null,
    netPrice: null,
    balance: null
}