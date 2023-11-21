import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { StoreRepository } from './store.repository';

@Injectable()
export class SecureDataService {
  IV = '5183666c72eec9e4';
  ENCRYPTION_KEY = '12345678901234567890123456789012';

  constructor(private readonly storeRepository: StoreRepository) {}

  async storeData({ id, encryption_key, value }): Promise<void> {
    const encryptedValue = this.encrypt(value, encryption_key);
    this.storeRepository.store(id, encryptedValue);
  }

  async retrieveData(id: string, decryptionKey: string): Promise<any[]> {
    const results = [];
    const data = this.storeRepository.retrieve(id);

    data.forEach((item) => {
      const decryptedValue = this.decrypt(item.value, decryptionKey);
      if (!decryptedValue) {
        // In real application this should be logged to some kind of logging system
        console.log('Decryption failed.', { id, decryptionKey });
      } else {
        results.push(JSON.parse(decryptedValue));
      }
    });

    return results;
  }

  private encrypt(value: any, encryptionKey: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(encryptionKey),
      this.IV,
    );
    let encryptedValue = cipher.update(JSON.stringify(value), 'utf-8', 'hex');
    encryptedValue += cipher.final('hex');
    return encryptedValue;
  }

  private decrypt(
    encryptedValue: string,
    decryptionKey: string,
  ): string | null {
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        decryptionKey,
        this.IV,
      );
      let decryptedValue = decipher.update(encryptedValue, 'hex', 'utf-8');
      decryptedValue += decipher.final('utf-8');
      return decryptedValue;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
