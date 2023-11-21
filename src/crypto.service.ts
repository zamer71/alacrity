import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  IV = '5183666c72eec9e4';
  ENCRYPTION_KEY = '12345678901234567890123456789012';

  constructor() {}

  encrypt(value: any, encryptionKey: string): string {
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(encryptionKey),
      this.IV,
    );
    let encryptedValue = cipher.update(JSON.stringify(value), 'utf-8', 'hex');
    encryptedValue += cipher.final('hex');
    return encryptedValue;
  }

  decrypt(encryptedValue: string, decryptionKey: string): string | null {
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
      // In real application this should be logged to some kind of logging system
      console.log(error);
      return null;
    }
  }
}
