import { IndiaMedication, defaultIndiaMedication } from "./india-medication.interface";

export class IndiaOrderMedication implements IndiaMedication {

    quantitiy: number;
    maximumRetailPrice: number;
    priceBeforeDiscount: number;
    discountIsPercentage: boolean;
    discount: number;
    discountAccepted: boolean;
    priceAfterDiscount: number;
    netPrice: number;

    constructor(medication: IndiaMedication = defaultIndiaMedication) {
        this.quantitiy = medication.quantitiy;
        this.maximumRetailPrice = medication.maximumRetailPrice;
        this.priceBeforeDiscount = medication.priceBeforeDiscount;
        this.discountIsPercentage =  medication.discountIsPercentage;
        this.discount = medication.discount;
        this.discountAccepted = medication.discountAccepted;
        this.priceAfterDiscount = medication.priceAfterDiscount;
        this.netPrice = medication.netPrice;
    }

    calculatePriceBeforeDiscount(): void {
        this.priceBeforeDiscount = this.quantitiy * this.maximumRetailPrice;
    }

    calculatePriceAfterDiscount(): void {
        if(this.discountIsPercentage) {
            this._subtractPercentageDiscount();
        } else {
            this._subtractMonetaryDiscount();
        }
    }

    setNetPrice(): void {
        this.netPrice = this.discountAccepted ? this.priceAfterDiscount : this.priceBeforeDiscount; 
    }

    private _subtractPercentageDiscount(): void {
        const discountAmount: number = this._calculatePercentageOfValue(this.discount, this.priceBeforeDiscount);
        this.priceAfterDiscount = this.priceBeforeDiscount - discountAmount;
    }

    private _subtractMonetaryDiscount(): void {
        this.priceAfterDiscount = this.priceBeforeDiscount - this.discount;
    }

    private _calculatePercentageOfValue(percentage: number, value: number): number {
        return (percentage * 100) * (value * 100) / (100 * 100 * 100);
    }
}