import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// In real application some kind of database should be used

@Injectable()
export class StoreRepository {
  private readonly filePath: string = path.join(__dirname, './data.json');

  store(id: string, value: any): void {
    const data = this.loadDataFromFile();
    const existingIndex = data.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      data[existingIndex].value = value;
    } else {
      data.push({ id, value });
    }

    this.saveDataToFile(data);
  }

  retrieve(id: string): any[] {
    const data = this.loadDataFromFile();

    if (id.endsWith('*')) {
      return data
        .filter((item) => item.id.startsWith(id.replace('*', '')))
        .map((item) => ({ id: item.id, value: item.value }));
    } else {
      return data
        .filter((item) => item.id === id)
        .map((item) => ({ id: item.id, value: item.value }));
    }
  }

  private loadDataFromFile(): any[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private saveDataToFile(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
