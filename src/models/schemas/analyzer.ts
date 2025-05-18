import * as z from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

export const analyzeEventSchema = z.object({
  predictionMessage: z.string(),
  predictionRating: z.number(),
})

export type AnalyzeEventSchema = z.infer<typeof analyzeEventSchema>;

export const parsedEventSchema = zodResponseFormat(analyzeEventSchema, 'analyze-event-schema');



export const analyzeTranscriptSchema = z.object({
  transcriptionMessage: z.string().nullable(),
  transcriptionRating: z.number().nullable(),
})

export type AnalyzeTranscriptSchema = z.infer<typeof analyzeTranscriptSchema>;

export const parsedAnalyzeTranscriptSchema = zodResponseFormat(analyzeTranscriptSchema, 'analyze-transcript-schema');