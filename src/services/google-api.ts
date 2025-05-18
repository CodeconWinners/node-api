import { google } from "googleapis";
import { envVars } from "../utils";

export const oauth2Client = new google.auth.OAuth2(
  envVars.googleClientId,
  envVars.googleClientSecret,
  envVars.googleRedirectUri,
);