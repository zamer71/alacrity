export class ResponseModel {
  message: string;
}

export enum ApplicationError {
  db = 'Data saving error',
  encryption = 'Encryption Key is wrong',
  decryption = 'Decryption Key is wrong',
}

export const ResponseOK = 'Data stored successfully.';
