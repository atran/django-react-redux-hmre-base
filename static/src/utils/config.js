export const SERVER_URL = `${document.location.protocol}//${document.location.host}`;

const API_BASE = process.env.API_URL;
const API_VERSION = 'v1';
export const API_URL = `${API_BASE}/${API_VERSION}`;
