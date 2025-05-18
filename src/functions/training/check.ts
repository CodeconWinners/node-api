import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CheckTrainingUseCase } from "../../use-cases";
import { ICheckTrainingRequest } from "../../models";


export async function checkTrainingPrompt(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const body = await req.json() as ICheckTrainingRequest;

  const result = await CheckTrainingUseCase(body);

  return { status: 200, jsonBody: result };
}
