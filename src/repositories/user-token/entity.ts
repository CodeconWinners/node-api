import { randomUUID } from 'crypto';
import { Auth } from 'googleapis';

export class GoogleUserTokensEntity {
  // ID as userId, agendas are discriminated inside of it
  id: string = randomUUID();

  // pKey is 'google' for now as we only use google as an external provider;
  pKey: string = 'test';

  tokens: Auth.Credentials = {};

  createdTime: string = new Date().toISOString();
  updatedTime: string = new Date().toISOString();

  constructor() { }
}

