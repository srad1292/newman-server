export interface IndiaMedication {
    quantity: number;
    maximumRetailPrice: number;
    priceBeforeDiscount: number;
    discountIsPercentage: boolean;
    discount: number;
    discountAccepted: boolean;
    priceAfterDiscount: number;
    netPrice: number;
}


export const defaultIndiaMedication: IndiaMedication  = {
    quantity: 1,
    maximumRetailPrice: 0,
    priceBeforeDiscount: null,
    discountIsPercentage: true,
    discount: null,
    discountAccepted: null,
    priceAfterDiscount: null,
    netPrice: null
}