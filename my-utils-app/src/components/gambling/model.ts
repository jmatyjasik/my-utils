export interface Prize {
    quantity: number;
    quantityLeft: number;
    prize: number;
    probabilityPercent: number;
    probabilityAdjustedPercent: number;
}

export interface Lottery {
    profitabilityPercent: number;
    profitabilityAdjustedPercent: number;
    name: string;
    description: string;
    imageUrl: string;
    expextedValue: number;
    adjustedExpectedValue: number;
    ticketPrice: number;
    mainPrize: number;
    circulation: number;
    circulationAdj: number;
    prizes: Prize[];
    winningSum: number;
    winingLeftSum: number;
}