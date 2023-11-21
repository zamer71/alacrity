import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SecureDataService } from './secure-data.service';

@Controller('secure-data')
export class SecureDataController {
  constructor(private readonly secureDataService: SecureDataService) {}

  @Post()
  async storeData(@Body() body: any): Promise<{ message: string }> {
    await this.secureDataService.storeData(body);
    return { message: 'Data stored successfully.' };
  }

  @Get()
  async retrieveData(
    @Query('id') id: string,
    @Query('decryption_key') decryptionKey: string,
  ): Promise<any[]> {
    return await this.secureDataService.retrieveData(id, decryptionKey);
  }
}