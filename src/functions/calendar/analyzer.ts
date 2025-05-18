import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { AnalyzeAllEventsUseCase, SetEventTranscriptUseCase } from "../../use-cases";
import { TranscriptSchema } from "../../models";

export async function CalendarAnalyzeAll(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };

  const result = await AnalyzeAllEventsUseCase(userId);

  return { status: 200, jsonBody: { items: result } };
}


export async function AnalyzeEventTranscript(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');
  const eventId = req.query.get('eventId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };
  if(!eventId) return { status: 400, jsonBody: { message: "missing eventId from query parameters" } };

  const transcript = await req.json() as TranscriptSchema;

  const event = await SetEventTranscriptUseCase(userId, eventId, transcript);

  return {
    status: 200,
    jsonBody: { items: event },
  };
};


