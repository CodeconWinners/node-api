import { Container, CosmosClient, Database } from '@azure/cosmos';
import { envVars } from '../utils';

export class CosmosDBConnection {
  isInitialized: boolean = false;
  database: Database;
  container: Container;
  client: CosmosClient;

  constructor(containerName) {
    if(envVars.nodeEnv !== 'test')
      this.initContainer(containerName);
  }

  initContainer(containerName): Container {
    this.client = new CosmosClient(envVars.cosmosConnection);

    this.database = this.client.database(envVars.cosmosDbName);

    this.container = this.database.container(containerName);
    this.isInitialized = true;

    console.info(`Cosmos DB Connection stablished for container ${containerName} with connection named ${containerName}`);

    return this.container;
  }
}
