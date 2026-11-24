/**
 * BUILD TIME: opens the Content-Security-Policy of ONE page to the owner's outside scripts and
 * widgets (a testimonial wall, a chat bubble, analytics, a booking or form widget, a tag manager),
 * as the provider's snippet needs them (docs/agent/security.md "Outside scripts and widgets").
 * `<Base outsideScripts>` calls it; every other page keeps the strict policy in astro.config.mjs.
 *
 * With `'unsafe-inline'` in a directive, Astro emits no hashes for it (a hash would switch
 * `'unsafe-inline'` off), so the provider's inline snippet, the scripts it loads and the styles
 * it injects all run. The same page drops `<ClientRouter />` (Base.astro): entering or leaving it
 * is a full page load, so the browser applies THIS page's policy (a client-side swap keeps the
 * previous page's) and the provider's script starts fresh, as its docs expect.
 */
interface CspApi {
  insertDirective: (directive: string) => void;
  insertScriptResource: (resource: string) => void;
  insertStyleResource: (resource: string) => void;
}

const ANY = ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:', 'blob:'];

export function allowOutsideScripts(csp: CspApi | undefined): void {
  if (!csp) return;
  for (const source of ANY) csp.insertScriptResource(source);
  for (const source of ["'self'", "'unsafe-inline'", 'https:']) csp.insertStyleResource(source);
  csp.insertDirective("connect-src 'self' https: wss:");
  csp.insertDirective('frame-src https:');
  csp.insertDirective("font-src 'self' https: data:");
  csp.insertDirective("img-src 'self' https: data: blob:");
  csp.insertDirective("media-src 'self' https: blob:");
  csp.insertDirective("worker-src 'self' blob:");
  csp.insertDirective("form-action 'self' mailto: https:");
}
