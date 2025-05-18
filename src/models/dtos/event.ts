import { calendar_v3 } from "googleapis";
import { MeetingStatusEnum } from "../../models/enums";
import { EventsEntity } from "../../repositories/events";


export class EventDto{

  eventEntity: EventsEntity;

  getStatus(status: string) {
    switch(status){
      case 'confirmed':
        return MeetingStatusEnum.CONFIRMED;
      case 'tentative':
        return MeetingStatusEnum.TENTATIVE;
      default:
        return MeetingStatusEnum.DECLINED
    }
  }

  constructor(userId: string, googleEvent: calendar_v3.Schema$Event ) {
    this.eventEntity = new EventsEntity({ userId });
    
    this.eventEntity.id = googleEvent.id;


    const startDateTime = new Date(googleEvent.start?.dateTime || googleEvent.start?.date); // Might be all-day
    const endDateTime = new Date(googleEvent.end?.dateTime || googleEvent.end?.date);

    const title = googleEvent.summary || '';
    const date = new Date(startDateTime.toDateString()); // just the date
    const time = startDateTime.toTimeString().slice(0, 5); // "HH:MM"
    const duration = (endDateTime.getTime() - startDateTime.getTime()) / 1000; // in seconds
    const description = googleEvent.description || '';
    const status = this.getStatus(googleEvent.status); // custom mapping

    this.eventEntity.details = {
      title,
      date,
      time,
      duration,
      description,
      status: status,
    }
  }

}