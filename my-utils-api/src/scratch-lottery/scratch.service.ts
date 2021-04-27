import { HttpService, Injectable } from '@nestjs/common';
import { json } from 'express';
import * as fs from 'fs';
import { GetAllLotteriesResponse } from './model';

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

        return JSON.parse(fileContent);
    }
}
