import * as z from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

export const generateExcuseSchema = z.object({
  message: z.string(),
})

export type GenerateExcuseSchema = z.infer<typeof generateExcuseSchema>;

export const parsedGenerateExcuseSchema = zodResponseFormat(generateExcuseSchema, 'generate-excuse-schema');
