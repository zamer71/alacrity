import { Injectable } from '@nestjs/common';
import { StoreRepository } from './store.repository';
import { RequestModel } from './request.model';
import { CryptoService } from './crypto.service';
import { ApplicationError, ResponseModel, ResponseOK } from './response.model';

@Injectable()
export class SecureDataService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  storeData = async ({
    id,
    encriptionKey,
    value,
  }: RequestModel): Promise<ResponseModel> => {
    const encryptedValue = this.cryptoService.encrypt(value, encriptionKey);
    if (!encryptedValue) {
      // In real application this should be logged to some kind of logging system
      return { message: ApplicationError.encryption };
    }

    const result = await this.storeRepository.store(id, encryptedValue);
    return { message: result ? ResponseOK : ApplicationError.db };
  };

  retrieveData = async (id: string, decryptionKey: string): Promise<any[]> => {
    const results = [];
    const data = await this.storeRepository.retrieve(id);

    data.forEach((item) => {
      const decryptedValue = this.cryptoService.decrypt(
        item.value,
        decryptionKey,
      );

      if (!decryptedValue) {
        // In real application this should be logged to some kind of logging system
        console.log(ApplicationError.decryption);
        return results;
      } else {
        const value = this.parseDecryptedValue(decryptedValue);
        if (!value) {
          console.log(ApplicationError.decryption);
          return results;
        }
        results.push({ id: item.id, value });
      }
    });

    return results;
  };

  private parseDecryptedValue(value: string): string | null {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
}
