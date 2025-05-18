import { EventsEntity } from "../../repositories/events";
import { EventsRepository } from "../../repositories";
import { TranscriptSchema } from "../../models";
import { AnalyzeEvent, AnalyzeTranscript } from "../../use-cases";


export async function ReadCalendarEventsUseCase(userId: string): Promise<EventsEntity[]> {
  const repo = new EventsRepository();

  const events = await repo.readEntities(userId);

  return events;
}


export async function SetEventTranscriptUseCase(userId: string, eventId: string, transcript: TranscriptSchema): Promise<EventsEntity> {
  const repo = new EventsRepository();

  let event = await repo.readEntity(eventId, userId);

  if(!event) throw new Error('Falha ao encontrar evento');

  event = await AnalyzeTranscript({ ...event, details: {... event.details, transcript } })
    .then(res => {
      event.details = {
        ...event.details,
        transcriptionMessage: res.transcriptionMessage,
        transcriptionRating: res.transcriptionRating
      }

      return event;
    })

  await repo.saveEntity(event);

  return event;
}