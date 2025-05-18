import { Container } from '@azure/cosmos';
import { GoogleUserTokensEntity } from './entity';
import { CosmosDBConnection } from '../cosmos';
import { envVars } from '../../utils';

export class GoogleUserTokensRepository {
  private connection: CosmosDBConnection;
  private container: Container;

  constructor() {
    this.connection = new CosmosDBConnection(envVars.cosmosDbTokensContainer);
    this.container = this.connection.container;
  }

  async readEntity(userId: string): Promise<GoogleUserTokensEntity | undefined> {
    // partitionKey as test is mocked for now
    const result = await this.container.item(userId, 'test').read<GoogleUserTokensEntity>();

    return result.resource;
  }

  async saveEntity(entity: GoogleUserTokensEntity): Promise<GoogleUserTokensEntity | undefined> {
    if (!entity.createdTime) entity.createdTime = new Date().toISOString(); 
    entity.updatedTime = new Date().toISOString();

    const result = await this.container.items.upsert<GoogleUserTokensEntity>(entity);

    return result.resource;
  }

  async removeEntity(id: string, pKey: string): Promise<boolean> {
    try {
      await this.container.item(id, pKey).delete();
    } catch(e) {
      console.error(`failure on removing the entity with id:'${id}' and pKey:'${pKey}'`, e);
      return false;
    }
    return true;
  }
}
