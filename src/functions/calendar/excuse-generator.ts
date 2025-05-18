import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ExcuseGeneratorUseCase } from "../../use-cases";

export async function ExcuseGenerator(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = req.query.get('userId');
  const eventId = req.query.get('eventId');

  if(!userId) return { status: 400, jsonBody: { message: "missing userId from query parameters" } };
  if(!eventId) return { status: 400, jsonBody: { message: "missing eventId from query parameters" } };

  const message = await ExcuseGeneratorUseCase(userId, eventId);


  return {
    status: 200,
    jsonBody: { message: message },
  };
};
