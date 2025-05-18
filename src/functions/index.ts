import { app } from '@azure/functions';



import { googleAuthConsent, googleAuthCallback } from './google';

app.http('google-auth-consent', {
  route: 'google/auth/consent',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: googleAuthConsent
});

app.http('google-auth-callback', {
  route: 'google/auth/callback',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: googleAuthCallback
});



import { googleEventsRead, googleEventRead } from './google';

app.http('google-events-read', {
  route: 'google/events/read',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: googleEventsRead
})

app.http('google-event-read', {
  route: 'google/event/read',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: googleEventRead
})



import { OpenaiGenerateTranscript } from './openai';

app.http('openai-transcript-generate', {
  route: 'openai/transcript/generate',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: OpenaiGenerateTranscript
})



import { CalendarAnalyzeAll, CalendarReadEvents, AnalyzeEventTranscript, ExcuseGenerator } from './calendar';

app.http('calendar-analyze-all', {
  route: 'calendar/analyze-all',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: CalendarAnalyzeAll
})

app.http('calendar-read-events', {
  route: 'calendar/read-events',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: CalendarReadEvents
})

app.http('calendar-events-transcript', {
  route: 'calendar/event-transcript',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: AnalyzeEventTranscript
})

app.http('calendar-excuse-generator', {
  route: 'calendar/excuse-generator',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: ExcuseGenerator
})



import { generateTrainingPrompt, checkTrainingPrompt } from './training';

app.http('training-generate', {
  route: 'training/generate',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: generateTrainingPrompt
})

app.http('training-check', {
  route: 'training/check',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: checkTrainingPrompt
})



