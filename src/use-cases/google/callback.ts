import { InvocationContext } from '@azure/functions';
import { oauth2Client } from '../../services';
import { GoogleUserTokensEntity, GoogleUserTokensRepository } from '../../repositories';

export async function GoogleAuthCallbackUseCase(context: InvocationContext, code: string): Promise<{message: string, userId: string}> {
  context.info('attempting to retrieve authentication from google');

  const repo = new GoogleUserTokensRepository();

  const { tokens } = await oauth2Client.getToken(code);

  const entity = new GoogleUserTokensEntity();

  entity.tokens = tokens;

  await repo.saveEntity(entity);

  context.info('google tokens:', { tokens });

  return { message: 'Sucesso', userId: entity.id };
}