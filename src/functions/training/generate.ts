import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GenerateTrainingUseCase } from "../../use-cases";


export async function generateTrainingPrompt(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const result = await GenerateTrainingUseCase();

  return { status: 200, jsonBody: result };
}
