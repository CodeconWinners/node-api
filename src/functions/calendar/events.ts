import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ReadCalendarEventsUseCase, SetEventTranscriptUseCase } from "../../use-cases";
import { TranscriptSchema } from "models";

export async function CalendarReadEvents(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };

  const events = await ReadCalendarEventsUseCase(userId);
  return {
    status: 200,
    jsonBody: { items: events },
  };
};
