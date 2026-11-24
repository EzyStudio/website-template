---
title: Security: a static site with nothing to steal
read-when: before adding a script, a widget, an embed, an external link or image host, a header, a CSP change or a dependency; and before telling the owner a change is done
---
There is no server, database or session here, so most attacks have nothing to reach. What is
left is the browser: keep the site's own code clean, keep the headers on, keep secrets out of the repo.
It is the owner's site: an outside script or widget they ask for is theirs to add (below).

## No secrets, ever
- Everything in this repo and in `dist/` is public: anyone can read it. Never put a key, token,
  password or private URL in code, Markdown, `PUBLIC_*` env vars, `.env` (git-ignored, and not
  used by the build) or HTML. You cannot add secrets to a static site; a feature that needs one
  needs the Astro app template (AGENTS.md).

## Content-Security-Policy (`security.csp` in `astro.config.mjs`)
- Astro writes the policy into every page with a hash for each script and style it emits.
  Never add `'unsafe-inline'` or `'unsafe-eval'`, never weaken `default-src 'self'`.
- So, in the site's own code: no inline event handlers (`onclick=`), no `style=""` attributes
  (use classes), no `javascript:` links, no `is:inline` scripts. The owner's outside scripts and
  widgets are the exception, on their own page: "Outside scripts and widgets" below.
- `connect-src 'self'`: the browser calls only this host (the live prices, the Buy button's
  checkout under the platform's path). Leave it. The one exception is built in: a page with a
  `<BuyButton>` allows the payment form's hosts (Stripe, Razorpay) on that page only
  (`src/lib/checkout-hosts.ts`, `payments.md`); never add a payment host or script yourself.
- A new embed host (a video player) goes into `frame-src` explicitly, by exact origin; images
  from https CDNs are already allowed (`img-src 'self' https: data:`). `form-action` allows this
  host and `mailto:` only.
- Markdown code blocks are not highlighted (`syntaxHighlight: false`): Shiki's inline styles
  would break the CSP. Keep it off.

## Headers (`public/_headers`)
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy` (camera, microphone, geolocation, payment off), `Cross-Origin-Opener-Policy:
same-origin`, `X-Frame-Options: DENY`, and a year of immutable caching for `/_astro/*`. Keep them;
add, never remove. HTTPS and HSTS are the platform's. Never add `Access-Control-Allow-Origin`
(nothing here needs to be read by another site) or a header that loosens framing.

## HTML and URLs
- Astro escapes `{value}`. Never `set:html` / `innerHTML` with anything not written in this repo.
  Build DOM from data with `textContent`. HTML from outside the repo (an email, a
  page copied from elsewhere) never goes into a page or a post; if the owner insists, sanitize it at
  build time. A provider's widget snippet is different: it is code the owner chose (below).
- Markdown posts are trusted repo content and rendered as HTML: review what goes in.
- URLs from content: `https:` (and `mailto:` for email) only. `target="_blank"` always with
  `rel="noopener noreferrer"`.
- An `<iframe>` only from a host already in `frame-src`, with a `title`, and `sandbox` when the
  embed allows it.

## Dependencies and the supply chain
- Few dependencies, each one needed, versions pinned by the committed `package-lock.json`;
  `npm ci` installs exactly that. `allowScripts` in `package.json` lists the install scripts that
  may run: never widen it without the owner.
- Before adding one: is it needed at all (HTML, CSS and Astro cover most)? The exact name
  (typosquats like `astro-js`), maintained, widely used, no install script. Install a version
  (`npm install <name>@<version>`) and commit `package.json` with `package-lock.json`; no git or
  tarball URLs, no `latest`, no second lockfile, never edit `node_modules`.
- `npm audit --omit=dev` before done: report high/critical findings to the owner; never
  `npm audit fix --force` (it jumps major versions).
- No CDN scripts, styles or fonts at runtime in the site's own code, no `eval`, no `new Function`
  (the owner's outside scripts and widgets: below).

## Outside scripts and widgets (the owner's choice)
It is the owner's site. When they ask for an outside script or widget (a testimonial wall such as
Endorsal, a chat bubble, analytics, a tag manager, a booking, form, review or newsletter widget),
add it. Never refuse, never ask them to approve it again, never send them to support: asking IS the
approval. A static site has no sign-in, database or secret for a script to reach.
- **On the pages that show it**: the page passes `outsideScripts` to `<Base>`:
  `<Base title="Client stories" description="…" outsideScripts>`. That page's CSP opens to any
  https script, style, font, frame and connection, inline snippets included
  (`src/lib/outside-scripts.ts`), and it has no `<ClientRouter />`, so entering or leaving it is a
  full page load and the provider's script starts as its docs expect. Every other page stays strict.
  A script for every page (analytics, a chat bubble): pass `outsideScripts` in every page, or set
  its default to `true` in `src/layouts/Base.astro`; say in one line that pages then load fully on
  each click.
- **Paste the provider's snippet as they give it**, in that page: `<script is:inline>` for an inline
  snippet, `<script is:inline async src="https://…">` for a script tag, and the provider's `<div>`
  where the widget goes. `is:inline` keeps Astro from bundling it. Keep their ids and attributes.
- **No `<Base outsideScripts>` prop yet** (an older site, before 0.7.19): upgrade first (`upgrade.md`);
  if that can't finish, call it yourself in the page's frontmatter with the same lines as
  `src/lib/outside-scripts.ts` (`Astro.csp.insertScriptResource("'unsafe-inline'")`, …) and remove
  `<ClientRouter />` from that page's layout.
- Only what the owner asked for, from the provider's own address (its docs or dashboard), never a
  copy of their script in this repo. A site id or public key the provider puts in the snippet is fine;
  a secret key never is (it would be public).
- Tell the owner in one line which page has it and that it goes live when they publish. Check it in
  the Preview: the widget shows and the browser console has no CSP error on that page.
- Visitors' data the widget collects goes to that provider under its terms: if the site has a privacy
  page, offer to add the provider to it.

## Third-party embeds and links
- Each embed (video, map, form) is another company's code in a frame: only when the owner asks,
  from the privacy-friendly host where one exists (`youtube-nocookie.com`), lazy
  (`loading="lazy"`), never one that needs `'unsafe-inline'`.
- Links to other sites from content: `https:` only; `rel="noopener noreferrer"` with
  `target="_blank"`. Never a link that carries a visitor's data in its query string.

## Before you say "done"
No secret in the diff · no `'unsafe-*'`, inline handler or `style=""` in the site's own code (an
outside script the owner asked for lives on a `<Base outsideScripts>` page only) · new
hosts added to the exact CSP directive · `public/_headers` unchanged or stricter · `npm run build`
passes (a CSP or content-schema mistake fails it) · a new dependency is pinned in the lockfile
and `npm audit --omit=dev` was read.

## The full security check
Not part of every task. Run it when the owner asks for a security check, and when they first ask to go live. Follow the machine
limits in `AGENTS.md`. Only ever against the Preview, never the live site.
1. List every form, script, embed, external link, payment button and file this site's own code adds.
2. Test each by running it in the Preview, with bad input too. Reading the code isn't enough.
3. Fix holes in the site's own code in the same task.
4. A hole in what the template manages: never patch it. Check for a newer template and upgrade, once. If there is none, give the owner a
   short description in plain words to send to support: what goes wrong, not how to do it.
5. End with a short report: what was tested, what was fixed, what is left. Remind the owner that fixes reach visitors only when they publish.
