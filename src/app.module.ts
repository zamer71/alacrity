import { Module } from '@nestjs/common';
import { SecureDataController } from './secure-data.controller';
import { SecureDataService } from './secure-data.service';
import { StoreRepository } from './store.repository';

@Module({
  imports: [],
  controllers: [SecureDataController],
  providers: [SecureDataService, StoreRepository],
})
export class AppModule {}
