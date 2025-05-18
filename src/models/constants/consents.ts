export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events.owned',
  'https://www.googleapis.com/auth/meetings.space.created',
];

export const OPENID_SCOPES = [
  'openid',
  'email',
  'profile'
];


export const GRANT_SCOPES = [
  ... GOOGLE_SCOPES,
  ... OPENID_SCOPES,
];
