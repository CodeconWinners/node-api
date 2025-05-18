import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ReadEventsUseCase, ReadEventUseCase } from "../../use-cases";


export async function googleEventsRead(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };

  const result = await ReadEventsUseCase(userId);

  return { status: 200, jsonBody: { message: result } };
}


export async function googleEventRead(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');
  const eventId = req.query.get('eventId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };
  if(!eventId) return { status: 400, jsonBody: { message: "missing eventId from query parameters" } };

  const result = await ReadEventUseCase(userId, eventId);

  return { status: 200, jsonBody: { message: result } };
}
