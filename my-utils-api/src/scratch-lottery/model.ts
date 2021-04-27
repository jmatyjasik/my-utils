    export interface Result {
        displayContent: boolean;
        highestWin: number;
        popularity: number;
        status: string;
        number: number;
        drawPrice: number;
        pictureUrl: string;
        name: string;
        id: number;
        hit: boolean;
        dateSales?: Date;
    }

    export interface Meta {
        url: string;
    }

    export interface Item {
        result: Result;
        meta: Meta;
        code: number;
    }

    export interface Meta2 {
        pagerUrl: string;
    }

    export interface GetAllLotteriesResponse {
        totalRows: number;
        items: Item[];
        meta: Meta2;
        code: number;
    }



