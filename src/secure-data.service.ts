import { Injectable } from '@nestjs/common';
import { StoreRepository } from './store.repository';
import { EncryptInput } from './stored-data.entity';
import { CryptoService } from './crypto.service';

@Injectable()
export class SecureDataService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly cryptoService: CryptoService,
  ) { }

  async storeData({ id, encriptionKey, value }: EncryptInput): Promise<void> {
    console.log('Storing data', { id, encriptionKey, value });
    const encryptedValue = this.cryptoService.encrypt(value, encriptionKey);
    this.storeRepository.store(id, encryptedValue);
  }

  async retrieveData(id: string, decryptionKey: string): Promise<any[]> {
    const results = [];
    const data = this.storeRepository.retrieve(id);

    data.forEach((item) => {
      const decryptedValue = this.cryptoService.decrypt(
        item.value,
        decryptionKey,
      );
      if (!decryptedValue) {
        // In real application this should be logged to some kind of logging system
        console.log('Decryption failed.', { id, decryptionKey });
      } else {
        results.push(JSON.parse(decryptedValue));
      }
    });

    return results;
  }
}
