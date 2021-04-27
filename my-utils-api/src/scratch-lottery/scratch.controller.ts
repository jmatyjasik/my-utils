import { Controller, Get, HttpService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { GetAllLotteriesResponse } from './model';
import { ScratchService } from './scratch.service';

@Injectable()
@Controller('scratch')
export class ScratchController {

    constructor(private scratchService: ScratchService) {
    }

    @Get('healthcheck')
    healthCheck() {
        return {
            health: true
        }
    }

    @Get('dump')
    async dumpLotteries() {
       this.scratchService.dumpAllLotteries();
       return `Dumped ${new Date()}`;
    }

    @Get('getAll')
    async getAllLotteries() {
      return this.scratchService.getAllLotteries();
    }

}