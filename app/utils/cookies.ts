import { createCookie } from '@remix-run/node'; // or "@remix-run/cloudflare"

export const gdprConsent = createCookie('gdpr-consent', {
  maxAge: 31536000, // One Year
});
