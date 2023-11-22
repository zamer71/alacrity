import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SecureDataService } from './secure-data.service';
import { RequestModel } from './request.model';

@Controller('secure-data')
export class SecureDataController {
  constructor(private readonly secureDataService: SecureDataService) {}

  @Post()
  async storeData(@Body() body: RequestModel): Promise<{ message: string }> {
    return await this.secureDataService.storeData(body);
  }

  @Get()
  async retrieveData(
    @Query('id') id: string,
    @Query('decryptionKey') decryptionKey: string,
  ): Promise<any[]> {
    return await this.secureDataService.retrieveData(id, decryptionKey);
  }
}
