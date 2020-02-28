import { IndiaMedication } from "./india-medication.interface";
import { IndiaBilling, defaultIndiaBilling } from "./india-billing.interface";

export class IndiaOrderMedicationImpl implements IndiaBilling {

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

    constructor(billing: IndiaBilling = defaultIndiaBilling) {
        this.medications = billing.medications;
        this.priceBeforeDiscount = billing.priceBeforeDiscount;
        this.discountIsPercentage =  billing.discountIsPercentage;
        this.discount = billing.discount;
        this.discountAccepted = billing.discountAccepted;
        this.priceAfterDiscount = billing.priceAfterDiscount;
        this.cgst = billing.cgst;
        this.sgst = billing.sgst;
        this.cgstAmount = billing.cgstAmount;
        this.sgstAmount = billing.sgstAmount;
        this.netPrice = billing.netPrice;
        this.balance = billing.balance;
    }

    calculatePriceBeforeDiscount(): void {
        let price: number = 0;
        this.medications.forEach((medication: IndiaMedication) => {
            price += medication.netPrice || 0;
        });

        this.priceBeforeDiscount = price;
    }

    calculatePriceAfterDiscount(): void {
        if(this.discountIsPercentage) {
            this._subtractPercentageDiscount();
        } else {
            this._subtractMonetaryDiscount();
        }
    }

    calculateCgstAmount(): void {
        const taxableAmount: number = this._getPriceForTaxCalculation();
        this.cgstAmount = this._calculatePercentageOfValue(this.cgst, taxableAmount);
    }

    calculateSgstAmount(): void {
        const taxableAmount: number = this._getPriceForTaxCalculation();
        this.sgstAmount = this._calculatePercentageOfValue(this.sgst, taxableAmount);
    }

    calculateNetPrice(): void {
        const taxableAmount: number = this._getPriceForTaxCalculation();
        this.netPrice = taxableAmount + this.cgstAmount + this.sgstAmount;
    }

    // TODO: Update this once payments are added 
    calculateBalance(): void { 
        this.balance = this.netPrice;
    }

    private _subtractPercentageDiscount(): void {
        const discountAmount = this._calculatePercentageOfValue(this.discount, this.priceBeforeDiscount);
        this.priceAfterDiscount = this.priceBeforeDiscount - discountAmount;
    }

    private _subtractMonetaryDiscount(): void {
        this.priceAfterDiscount = this.priceBeforeDiscount - this.discount;
    }

    private _getPriceForTaxCalculation(): number {
        return this.discountAccepted ? this.priceAfterDiscount : this.priceBeforeDiscount;
    }

    private _calculatePercentageOfValue(percentage: number, value: number): number {
        return (percentage * 100) * (value * 100) / (100 * 100 * 100);
    }
}