import { calendar_v3, google } from "googleapis";
import { GoogleUserTokensRepository } from "../../../repositories";
import { oauth2Client } from "../../../services";

export async function ReadEventUseCase(userId: string, eventId: string): Promise<calendar_v3.Schema$Event> {

  const repo = new GoogleUserTokensRepository();

  const entity = await repo.readEntity(userId);

  oauth2Client.setCredentials(entity.tokens);

  oauth2Client.refreshAccessToken();

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const res = await calendar.events.get({
    calendarId: 'primary',
    eventId: eventId,
  });

  await repo.saveEntity(entity);

  const event = res.data;

  return event;
}