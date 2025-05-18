import { openaiClient } from '../../../services';
import { AnalyzeEventSystemPrompt, AnalyzeTranscriptSystemPrompt } from './system-prompt';
import { parsedEventSchema, AnalyzeEventSchema, AnalyzeTranscriptSchema, parsedAnalyzeTranscriptSchema } from '../../../models';
import { envVars } from '../../../utils';
import { EventsEntity } from '../../../repositories';

export async function AnalyzeEvent(event: EventsEntity): Promise<AnalyzeEventSchema>{

  const completion = await openaiClient.beta.chat.completions.parse({
    model: envVars.azureOpenAIModelName,    
    messages: [
      AnalyzeEventSystemPrompt,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: JSON.stringify({ 
              eventTitle: event.details.title, 
              eventDescription: event.details.description,
              eventDuration: event.details.duration
            })
          }
        ]
      }
    ],
    response_format: parsedEventSchema
  });


  if(!completion.choices[0].message.parsed) throw new Error("OpenAI didn't return with any value")


  return completion.choices[0].message.parsed;
}


export async function AnalyzeTranscript(event: EventsEntity): Promise<AnalyzeTranscriptSchema>{

  const completion = await openaiClient.beta.chat.completions.parse({
    model: envVars.azureOpenAIModelName,    
    messages: [
      AnalyzeTranscriptSystemPrompt,
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
    response_format: parsedAnalyzeTranscriptSchema
  });


  if(!completion.choices[0].message.parsed) throw new Error("OpenAI didn't return with any value")


  return completion.choices[0].message.parsed;
}

