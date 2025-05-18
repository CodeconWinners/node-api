import * as z from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

export const generateTrainingSchema = z.object({
  test: z.object({
      situation: z.string(),
      options: z.array(z.string()),
    })
})

export type GenerateTrainingSchema = z.infer<typeof generateTrainingSchema>;

export const parsedGenerateTrainingSchema = zodResponseFormat(generateTrainingSchema, 'generate-training-schema');


export const checkingTrainingSchema = z.object({
  result: z.object({
    impulsive : z.number(),
    calm: z.number(),
    cautious: z.number(),
    indecisive: z.number(),
    aggressive: z.number(),
    pacific: z.number(),
  })
})

export type CheckingTrainingSchema = z.infer<typeof checkingTrainingSchema>;

export const parsedCheckingTrainingSchema = zodResponseFormat(checkingTrainingSchema, 'checking-training-schema');