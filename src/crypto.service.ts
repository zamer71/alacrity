import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  IV = '5183666c72eec9e4';

  constructor() {}

  encrypt(value: any, encryptionKey: string): string | null {
    try {
      const cipher = crypto.createCipheriv(
        'aes-256-ctr',
        Buffer.from(encryptionKey),
        this.IV,
      );
      let encryptedValue = cipher.update(JSON.stringify(value), 'utf-8', 'hex');
      encryptedValue += cipher.final('hex');
      return encryptedValue;
    } catch (error) {
      // In real application this should be logged to some kind of logging system
      return null;
    }
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
      return null;
    }
  }
}
