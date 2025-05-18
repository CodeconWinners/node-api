import { EventsEntity } from "repositories/events";
import { EventDto } from "../../models";
import { ReadEventsUseCase } from "../google";
import { AnalyzeEvent } from "../../use-cases";
import { EventsRepository } from "../../repositories";


export async function AnalyzeAllEventsUseCase(userId: string): Promise<EventsEntity[]> {
  const repo = new EventsRepository();

  const googleEvents = await ReadEventsUseCase(userId);

  let events = googleEvents.map(event => new EventDto(userId, event).eventEntity);

  const tasks: Promise<EventsEntity>[] = [];

  for(const event of events) {
    tasks.push(AnalyzeEvent(event).then(res => {
      event.details = {
        ...event.details,
        predictionMessage: res.predictionMessage,
        predictionRating: res.predictionRating,
      }

      return event;
    }))
  }

  events = await Promise.all(tasks);

  await repo.saveEntities(events);

  return events;
}