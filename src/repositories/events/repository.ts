import { Container } from '@azure/cosmos';
import { EventsEntity } from './entity';
import { CosmosDBConnection } from '../cosmos';
import { envVars } from '../../utils';

export class EventsRepository {
  private connection: CosmosDBConnection;
  private container: Container;

  constructor() {
    this.connection = new CosmosDBConnection(envVars.cosmosDbEventsContainer);
    this.container = this.connection.container;
  }

  async readEntity(eventId: string, userId: string): Promise<EventsEntity | undefined> {
    // partitionKey as test is mocked for now
    const result = await this.container.item(eventId, userId).read<EventsEntity>();

    return result.resource;
  }

  async readEntities(userId: string): Promise<EventsEntity[]> {
    const item = await this.container.items.query<EventsEntity>({
      query: 'SELECT * FROM b WHERE b.pKey = @userId',
      parameters: [{ name: '@userId', value: userId }]
    }).fetchAll();

    if(!item.resources.length) return[];  

    return item.resources;
  }

  async saveEntity(entity: EventsEntity): Promise<EventsEntity | undefined> {
    if (!entity.createdTime) entity.createdTime = new Date().toISOString(); 
    entity.updatedTime = new Date().toISOString();

    const result = await this.container.items.upsert<EventsEntity>(entity);

    return result.resource;
  }

  async saveEntities(entities: EventsEntity[]): Promise<EventsEntity[]> {
    const now = new Date().toISOString();

    const upsertPromises = entities.map(entity => {
      if (!entity.createdTime) entity.createdTime = now;
      entity.updatedTime = now;
  
      return this.container.items.upsert<EventsEntity>(entity);
    });
  
    const results = await Promise.all(upsertPromises);
    return results.map(result => result.resource!);
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
