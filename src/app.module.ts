import { Module } from '@nestjs/common';
import { SecureDataController } from './secure-data.controller';
import { SecureDataService } from './secure-data.service';
import { StoreRepository } from './store.repository';
import { CryptoService } from './crypto.service';

@Module({
  imports: [],
  controllers: [SecureDataController],
  providers: [SecureDataService, StoreRepository, CryptoService],
})
export class AppModule {}
