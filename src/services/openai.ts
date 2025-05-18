import OpenAI from "openai";
import { envVars } from "../utils";



export const openaiClient = new OpenAI({ apiKey: envVars.openaiKey });
