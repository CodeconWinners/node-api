
export const envVars = {
  get nodeEnv(): 'test' | 'prod' | 'local' {
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim() as 'test' | 'prod' | 'local' : 'prod';
  },

  get googleClientId() {
    return checkVariable('GOOGLE_CLIENT_ID');
  },

  get googleClientSecret() {
    return checkVariable('GOOGLE_CLIENT_SECRET');
  },

  get googleRedirectUri() {
    return checkVariable('GOOGLE_REDIRECT_URI');
  },

  get cosmosConnection() {
    return checkVariable('COSMOS_DB_CONNECTION');
  },

  get cosmosDbName() {
    return checkVariable('COSMOS_DB_NAME');
  },

  get cosmosDbEventsContainer() {
    return checkVariable('COSMOS_DB_EVENTS_CONTAINER_NAME');
  },

  get cosmosDbTokensContainer() {
    return checkVariable('COSMOS_DB_TOKENS_CONTAINER_NAME');
  },

  get openaiKey() {
    return checkVariable('OPENAI_KEY');
  },

  get azureOpenAIModelName() {
    return checkVariable('OPENAI_MODEL', 'gpt-4o');
  }
};

function checkVariable(envVarName: string, defaultValue: unknown = undefined): string {
  const variable = process.env[envVarName];

  if(!variable && defaultValue === undefined) {
    if(envVars.nodeEnv === 'test') {
      console.error(`TEST MODE: ${envVarName} missing from the environment variables list`);
      return '';
    }

    throw new Error(`${envVarName} missing from the environment variables list`);
  }

  return variable ?? `${defaultValue}`;
}