export interface Regulation {
    name: string;
    url: string;
}

export interface Prize {
    number: number;
    quantityLeft: number;
    quantity: number;
    prize: number;
}

export interface Result {
    description: string;
    dateSales: Date;
    descriptionAdditional?: any;
    name: string;
    popularity: number;
    status: string;
    number: number;
    flashImageUrl: string;
    scratchImageUrl: string;
    legalNote: string;
    highestWin: number;
    circulation: number;
    drawPrice: number;
    currentWinningsPrizesPool: number;
    hit: boolean;
    regulations: Regulation[];
    prizes: Prize[];
    scratchWins: any[];
}

export interface Meta {
    backUrl: string;
}

export interface LotteryDetailsResponse {
    result: Result;
    meta: Meta;
    code: number;
}