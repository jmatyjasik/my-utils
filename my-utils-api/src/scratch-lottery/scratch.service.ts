import { HttpService, Injectable } from '@nestjs/common';
import { json } from 'express';
import * as fs from 'fs';
import { GetAllLotteriesResponse } from './model';
import { LotteryDetailsResponse, Prize } from './model_details';

@Injectable()
export class ScratchService {

    lotteriesDbName = 'scratch_lotteries.json'

    constructor(private httpService: HttpService) {
    }


    async dumpAllLotteries() {
        const size = 100;
        const getAllLotteries = `https://www.lotto.pl/api/lotteries/zdrapki?name=&status=&yearSalesEnd=&page=1&scratchStatuses=Standard,Novelity,LastChance,Announcement,SalesEnd,Debut&index=1&size=${size}&sort=DateSalesUtc&order=DESC`

        const getLotteryDetails = (id: number) => {
            return this.httpService.get(`https://www.lotto.pl/api/lotteries/zdrapki/${id}/page/74`);
        }

        const result = await this.httpService.get(getAllLotteries).toPromise();
        const response = result.data as GetAllLotteriesResponse;

        const lotteries = response.items.map(i => {
            return {
                name: i.result.name,
                id: i.result.id
            }
        })

        let all = [];

        const responses = await Promise.all(
            lotteries.map(id => getLotteryDetails(id.id).toPromise())
        );

        responses.forEach((response) => {
            all.push(response.data);
        });

        fs.writeFileSync(this.lotteriesDbName, JSON.stringify(all), 'utf8');
    }

    getAllLotteries(){
        let fileContent = fs.readFileSync(this.lotteriesDbName, 'utf8');
        if(!fileContent){
            this.dumpAllLotteries();
        }

        fileContent = fs.readFileSync(this.lotteriesDbName, 'utf8');

        const savedLotteries = JSON.parse(fileContent) as LotteryDetailsResponse[];

        const mapPrizes = (prizes: Prize[], circulation: number, circulationAdjusted: number) => {

            return prizes.map(i => {
                return  {
                    quantity: i.quantity,
                    quantityLeft: i.quantityLeft,
                    prize: i.prize,
                    probabilityPercent: i.quantity / circulation * 100,
                    probabilityAdjustedPercent: i.quantityLeft / circulationAdjusted * 100,
                }
            });
        }

        const calculateExpectedValue = (prizes: Prize[], circulation: number, circulationAdjusted: number) => {
            let expected = 0;
            let expectedAdjusted = 0;

            prizes.forEach(prize => {
                expected = expected + prize.prize * prize.quantity / circulation;
                expectedAdjusted = expectedAdjusted + prize.prize * prize.quantityLeft / circulationAdjusted;
            });

            return {
                expected,
                expectedAdjusted
            };
        }


        return savedLotteries
            .filter(i => i.result.status !== 'SalesEnd')
            .map(l => {

                const winingSum = l.result.prizes.reduce((total, prize) => total + prize.quantity, 0);
                const winingLeftSum = l.result.prizes.reduce((total, prize) => total + prize.quantityLeft, 0);
                const circulationAdjusted = l.result.circulation * winingLeftSum / winingSum;
                const expected = calculateExpectedValue(l.result.prizes, l.result.circulation, circulationAdjusted);

                return {
                    profitabilityPercent: expected.expected/l.result.drawPrice * 100,
                    profitabilityAdjustedPercent: expected.expectedAdjusted/l.result.drawPrice * 100,
                    name: l.result.name,
                    description: l.result.description,
                    imageUrl: l.result.scratchImageUrl,
                    expextedValue: expected.expected,
                    adjustedExpectedValue: expected.expectedAdjusted,
                    ticketPrice: l.result.drawPrice,
                    mainPrize: l.result.highestWin,
                    circulation: l.result.circulation,
                    circulationAdj: circulationAdjusted,
                    prizes: mapPrizes(l.result.prizes, l.result.circulation, circulationAdjusted),
                    winningSum: winingSum,
                    winingLeftSum: winingLeftSum
                }

            });
    }

    
}
