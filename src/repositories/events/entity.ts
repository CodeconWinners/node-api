import { randomUUID } from 'crypto';
import { RatingMeetingEnum, MeetingStatusEnum, TranscriptSchema } from '../../models';



export class EventsEntity {
  // is is the meeting id from the calendar
  id: string = randomUUID();

  // pKey is the userId
  pKey: string;

  details: {
    title: string,
    date: Date,
    time: string, //"10:00"
    duration: number, // 60 in seconds
    description: string,
    transcript?: TranscriptSchema,
    status: MeetingStatusEnum,
    predictionMessage?: string, // message to show on the AI expectation of the meeting
    transcriptionMessage?: string, // message to show the AI understanding of the transcript
    predictionRating?: RatingMeetingEnum,
    transcriptionRating?: RatingMeetingEnum,
  }

  createdTime: string = new Date().toISOString();
  updatedTime: string = new Date().toISOString();

  constructor({ userId }: { userId: string }) {
    this.pKey = userId;
  }
}

