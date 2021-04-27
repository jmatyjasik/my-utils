import { Controller, Get, HttpService, Injectable } from '@nestjs/common';

@Injectable()
@Controller('scratch')
export class ScratchController {

    constructor(private httpService: HttpService) {
    }

    @Get('healthcheck')
    healthCheck() {
        return {
            health: true
        }
    }

    @Get('refresh')
    async refresh() {
        const result =  await this.httpService.get('')
        .toPromise();

        return result.data;

    }
}
