import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SecureDataService } from './secure-data.service';
import { EncryptInput } from './stored-data.entity';

@Controller('secure-data')
export class SecureDataController {
  constructor(private readonly secureDataService: SecureDataService) {}

  @Post()
  async storeData(@Body() body: EncryptInput): Promise<{ message: string }> {
    await this.secureDataService.storeData(body);
    return { message: 'Data stored successfully.' };
  }

  @Get()
  async retrieveData(
    @Query('id') id: string,
    @Query('decryptionKey') decryptionKey: string,
  ): Promise<any[]> {
    return await this.secureDataService.retrieveData(id, decryptionKey);
  }
}
