import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';

// In real application some kind of database should be used

@Injectable()
export class StoreRepository {
  private readonly filePath: string = path.join(__dirname, './data.json');

  store = async (id: string, value: any): Promise<boolean> => {
    const data = await this.loadDataFromFile();
    const existingIndex = data.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      data[existingIndex].value = value;
    } else {
      data.push({ id, value });
    }

    return await this.saveDataToFile(data);
  };

  retrieve = async (id: string): Promise<any[]> => {
    const data = await this.loadDataFromFile();

    if (id.endsWith('*')) {
      return data
        .filter((item) => item.id.startsWith(id.replace('*', '')))
        .map((item) => ({ id: item.id, value: item.value }));
    } else {
      return data
        .filter((item) => item.id === id)
        .map((item) => ({ id: item.id, value: item.value }));
    }
  };

  private loadDataFromFile = async (): Promise<any[]> => {
    try {
      const data = await readFile(this.filePath, { encoding: 'utf-8' });
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };

  private saveDataToFile = async (data: any[]): Promise<boolean> => {
    try {
      await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (error) {
      return false;
    }
  };
}
