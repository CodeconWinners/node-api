import { openaiClient } from '../../../services';
import { TranscriptSystemPrompt } from './system-prompt';
import { parsedTranscriptSchema, TranscriptSchema } from '../../../models';
import { envVars } from '../../../utils';
import { EventsRepository } from '../../../repositories';

export async function GenerateTranscriptUseCase(userId: string, eventId: string): Promise<TranscriptSchema>{

  const repo = new EventsRepository();

  const event = await repo.readEntity(eventId, userId);

  const completion = await openaiClient.beta.chat.completions.parse({
    model: envVars.azureOpenAIModelName,    
    messages: [
      TranscriptSystemPrompt,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: JSON.stringify({ 
              title: event.details.time,
              description: event.details.description,
              duration: event.details.duration,
            })
          }
        ]
      }
    ],
    response_format: parsedTranscriptSchema
  });


  if(!completion.choices[0].message.parsed) throw new Error("OpenAI didn't return with any value")


  return completion.choices[0].message.parsed;
}