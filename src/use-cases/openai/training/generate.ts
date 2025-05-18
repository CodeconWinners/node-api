import { openaiClient } from '../../../services';
import { GenerateTrainingSystemPrompt } from './system-prompt';
import { GenerateTrainingSchema, parsedGenerateTrainingSchema } from '../../../models';
import { envVars } from '../../../utils';

export async function GenerateTrainingUseCase(): Promise<GenerateTrainingSchema> {

  

  const completion = await openaiClient.beta.chat.completions.parse({
    model: envVars.azureOpenAIModelName,    
    messages: [
      GenerateTrainingSystemPrompt,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: JSON.stringify({  })
          }
        ]
      }
    ],
    response_format: parsedGenerateTrainingSchema
  });

  if(!completion.choices[0].message.parsed) throw new Error("OpenAI didn't return with any value")

  return completion.choices[0].message.parsed;
}
