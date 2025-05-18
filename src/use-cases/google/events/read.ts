import { calendar_v3, google } from "googleapis";
import { GoogleUserTokensRepository } from "../../../repositories";
import { oauth2Client } from "../../../services";

export async function ReadEventsUseCase(userId: string): Promise<calendar_v3.Schema$Event[]> {

  const repo = new GoogleUserTokensRepository();

  const entity = await repo.readEntity(userId);

  oauth2Client.setCredentials(entity.tokens);

  oauth2Client.refreshAccessToken();

  const now = new Date();
  const timeMin = new Date(now.setDate(now.getDate() - 30)).toISOString();
  const timeMax = new Date(now.setDate(now.getDate() + 30)).toISOString();

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 100,
  });

  await repo.saveEntity(entity);

  const events = res.data.items;

  return events;
}