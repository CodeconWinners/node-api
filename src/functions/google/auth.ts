import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GoogleAuthCallbackUseCase, GoogleAuthConsentUseCase } from "../../use-cases";

export async function googleAuthConsent(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const url = GoogleAuthConsentUseCase(context);

  return {
    status: 302,
    headers: {
      Location: url
    }
  };
};


export async function googleAuthCallback(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const code = req.query.get('code');

  if(!code) return { status: 400, jsonBody: { message: "missing code from query parameters" } };

  const result = await GoogleAuthCallbackUseCase(context, code);

  return { status: 200, jsonBody: { ...result } };
}
