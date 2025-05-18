import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GenerateTranscriptUseCase } from "../../use-cases";

export async function OpenaiGenerateTranscript(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');
  const eventId = req.query.get('eventId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };
  if(!eventId) return { status: 400, jsonBody: { message: "missing eventId from query parameters" } };

  const transcript = await GenerateTranscriptUseCase(userId, eventId);

  return {
    status: 200,
    jsonBody: {
      ...transcript,
    }
  }
}
