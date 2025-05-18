import { openaiClient } from '../../../services';
import { CheckingTrainingSystemPrompt } from './system-prompt';
import { parsedCheckingTrainingSchema, CheckingTrainingSchema, ICheckTrainingRequest } from '../../../models';
import { envVars } from '../../../utils';

export async function CheckTrainingUseCase(option: ICheckTrainingRequest): Promise<CheckingTrainingSchema> {

  const completion = await openaiClient.beta.chat.completions.parse({
    model: envVars.azureOpenAIModelName,    
    messages: [
      CheckingTrainingSystemPrompt,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: JSON.stringify({ option })
          }
        ]
      }
    ],
    response_format: parsedCheckingTrainingSchema
  });

  if(!completion.choices[0].message.parsed) throw new Error("OpenAI didn't return with any value")

  return completion.choices[0].message.parsed;
}
