import { envVars } from "../../../utils";
import { openaiClient } from "../../../services";
import { ExcuseGeneratorSystemPrompt } from './system-prompt';
import { EventsRepository } from "../../../repositories";
import { parsedGenerateExcuseSchema } from "../../../models";


export async function ExcuseGeneratorUseCase(userId: string, eventId: string): Promise<string> {
  const repo = new EventsRepository();

  const event = await repo.readEntity(eventId, userId);

  const completion = await openaiClient.beta.chat.completions.parse({
    model: envVars.azureOpenAIModelName,    
    messages: [
      ExcuseGeneratorSystemPrompt,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: JSON.stringify({ 
              eventTranscript: event.details.transcript,
              eventTitle: event.details.title, 
              eventDescription: event.details.description,
              eventDuration: event.details.duration,
              eventStatus: event.details.status,
              eventPredictedRating: event.details.predictionRating,
              eventPredictedMessage: event.details.predictionMessage,
            })
          }
        ]
      }
    ],
    response_format: parsedGenerateExcuseSchema
  });


  if(!completion.choices[0].message.parsed) throw new Error("OpenAI didn't return with any value")


  return completion.choices[0].message.parsed.message;
}