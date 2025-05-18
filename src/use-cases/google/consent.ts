import { GRANT_SCOPES } from '../../models';
import { InvocationContext } from '@azure/functions';
import { oauth2Client } from '../../services';
import { envVars } from '../../utils';

export function GoogleAuthConsentUseCase(context: InvocationContext): string {
  context.info('attempting to get redirect url with consents');
  
  const url = oauth2Client.generateAuthUrl({
    redirect_uri: envVars.googleRedirectUri,
    access_type: 'offline',
    scope: GRANT_SCOPES,
    prompt: 'consent',
  });

  return url;
}