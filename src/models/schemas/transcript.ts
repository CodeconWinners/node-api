import * as z from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

export const transcriptSchema = z.object({
  results: z.array(
    z.object({
      speaker: z.string(),
      content: z.string(),
      timeInSeconds: z.number(),
    })
  )
})

export type TranscriptSchema = z.infer<typeof transcriptSchema>;

export const parsedTranscriptSchema = zodResponseFormat(transcriptSchema, 'transcript-schema');