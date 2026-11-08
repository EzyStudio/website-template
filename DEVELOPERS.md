# EzyStudio Website template — developer guide

This repository is the **Website template** (`astro-static`) that every EzyStudio website starts
from: Astro, every page prerendered, no server and no database. It is published for developers who
build **static site listings for the [EzyStudio App Store](https://ezystudio.com/app-store)** on their
own computer. You build a whole site on this template, submit it, and every customer who installs
it gets a new site made from your code.

This repository is the ONLY place to get the template: there is no download. Clone it, and take
every release with `git merge`.

Files for you, the developer (submit leaves all four out, so they never reach a customer's site):
- `DEVELOPERS.md` (this guide) and `LICENSE`.
- `STORE-LISTING.md`: every store rule for a whole site, in plain words.
- `store-check.mjs`: the store's checks for this release, on your machine: `node store-check.mjs`.

`README.md` is the template's own setup guide (it ships into every site, so it never names us);
`AGENTS.md` and `docs/agent/` are the rules for the AI that works on the site, yours first, then the
customer's.

**License:** this template belongs to EzyStudio and is **not open source** ([`LICENSE`](LICENSE)).
You may use and change it only to build sites and apps that run on EzyStudio. Using it, or anything
made from it, anywhere else (other hosting, other products, other templates) is not allowed. The code
you write yourself stays yours.

## Contents

1. [Quick start](#1-quick-start)
2. [Clone and remotes](#2-clone-and-remotes)
3. [Build your site](#3-build-your-site)
4. [The template's own files](#4-the-templates-own-files)
5. [Check it like submit does](#5-check-it-like-submit-does)
6. [Submit](#6-submit)
7. [How updates work](#7-how-updates-work)
8. [FAQ](#8-faq)
9. [For your AI](#9-for-your-ai)
10. [Reporting problems and suggesting changes](#10-reporting-problems-and-suggesting-changes)

Links: [developer docs](https://ezystudio.com/developers/docs) ·
[developer program](https://ezystudio.com/developers) ·
[developer portal](https://ezystudio.com/dev) ·
[the Web App template](https://github.com/EzyStudio/web-app-template) (sign-in, a database, a dashboard)

## 1. Quick start

You need Node.js 22.12+, npm and git.

```bash
git clone https://github.com/EzyStudio/website-template.git my-site
cd my-site
git remote rename origin upstream
npm install
npm run dev                                   # http://localhost:4321
```

## 2. Clone and remotes

```bash
git clone https://github.com/EzyStudio/website-template.git my-site
cd my-site
git remote rename origin upstream             # the template: releases come from here
git remote add origin git@github.com:<you>/<your-repo>.git
git push -u origin main
```

- **Clone; don't press "Use this template" and don't copy the files.** A clone keeps the template's
  history, so each release merges into your work with one `git merge`.
- **Watch releases:** on https://github.com/EzyStudio/website-template press **Watch → Custom →
  Releases**. Every submission, a first version and every update, must be on the template's
  CURRENT release.
- Keep `upstream`: `node store-check.mjs` and `npm run platform -- check` read its release tags.

## 3. Build your site

- Read `AGENTS.md` and `docs/agent/` first, and have your AI read them before every task.
- Every word lives in `src/content/site.ts`, posts in `src/content/blog/`, pages in `src/pages/`.
  Never the template's own files ([section 4](#4-the-templates-own-files)).
- Describe your site in `README.md`: what it is, where things live, what an owner usually changes.
- No secrets, no install scripts, no deploy config, no server code. A static site has no database,
  so it has no sample data either.
- Rules in full: `STORE-LISTING.md`, and
  [Building an app](https://ezystudio.com/developers/docs/building-apps),
  [Best practices](https://ezystudio.com/developers/docs/best-practices).

## 4. The template's own files

These are the template's, and every release replaces them. Never change, add to or delete them:

| Group | Files | Refused at submit as |
| --- | --- | --- |
| Instructions for the customer's AI | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `docs/agent/` | `instructions_changed` |
| The template's own files | `template.json`, `CHANGELOG.md`, `scripts/platform.mjs`, `scripts/managed-files.json` | `managed_file_changed` |

Submit compares each byte for byte with the release your `template.json` names. Put them back with
git, from the tag of the release you are on (`v` + the version in `template.json`, such as `v1.4.2`).
`npm run platform -- check` and `node store-check.mjs` print this command with your tag filled in:

```bash
git checkout v<the version in template.json> -- docs/agent AGENTS.md CLAUDE.md GEMINI.md template.json CHANGELOG.md scripts/platform.mjs scripts/managed-files.json
```

A file you added under `docs/agent/`: move it out, then `git rm` it. Line endings count: the
template's `.gitattributes` keeps every text file LF, also on Windows. A copy that turned them into
CRLF anyway: `git add --renormalize .`, then commit.

## 5. Check it like submit does

`store-check.mjs` and `STORE-LISTING.md` are in this repository and every release brings their new
copies. From the top of your repository:

```bash
node store-check.mjs                          # the same checks as submit
npm run platform -- check                     # the template's own files, a newer release
npm run check                                 # the production build
```

`node store-check.mjs` fails when your template is behind the current release ("Your template is
<yours>; the current one is <newest>. Merge it before you submit.") and when one of the template's own
files changed. Offline, the release check is a note.

## 6. Submit

1. **Join the developer program** at https://ezystudio.com/developers; your team then works in the
   [developer portal](https://ezystudio.com/dev).
2. Push your branch to GitHub.
3. Open [Submit an app](https://ezystudio.com/dev/submit): the listing, screenshots, and under
   **App code** connect GitHub and pick the repository and branch. The checks run at once; after a
   push, press **Check again**.
4. Pricing, then send it for review. Before Submit the portal checks the branch's latest commit
   again: while the template is behind or one of its files changed, **Submit stays off** and says
   what to run. Submitting freezes that commit.

[Submitting](https://ezystudio.com/developers/docs/submitting) ·
[Review](https://ezystudio.com/developers/docs/review). Once approved, the store hosts a public
preview of your site, so people can try it before installing.

## 7. How updates work

**Template releases** (from `upstream`) are tagged `vX.Y.Z`. Every submission, a first version and
every update, must be on the current one. Merge each one:

```bash
git status                                    # clean: commit your work first
git fetch upstream --tags
git describe --tags --abbrev=0 upstream/main     # the newest release
git merge "$(git describe --tags --abbrev=0 upstream/main)"
npm install
npm run check
node store-check.mjs
```

Conflicts:
- `package-lock.json`: `git checkout --theirs package-lock.json`, then `npm install`, then commit.
- The template's own files ([section 4](#4-the-templates-own-files)) and `DEVELOPERS.md`,
  `LICENSE`, `STORE-LISTING.md`, `store-check.mjs`: `git checkout --theirs <file>`.
- Your files: keep your work, bring over what the template changed.
- `git merge --abort` puts everything back.
- "untracked working tree files would be overwritten" (`store-check.mjs`, `STORE-LISTING.md`): you
  copied them in from an old download: delete them (and their `.gitignore` lines), then merge again.

Then follow the release's `docs/agent/upgrade.md`, run `node store-check.mjs` (the merge brought its
new copy), push and submit an update. **Your own updates** reach customers as "Update available",
merged into their copy. Tag your own versions with a prefix of your own (`site-v1.2.0`), never
`v1.2.0`: the `v*` tags are the template's releases. [Updates](https://ezystudio.com/developers/docs/updates).

## 8. FAQ

**Do I need an EzyStudio account to build?** No. You need an approved developer account only to submit.

**I started from a zip of an older template.** There is no zip any more. Clone this repository
fresh and copy your own files in (never the template's own files), or connect your copy once:
`git remote add upstream https://github.com/EzyStudio/website-template.git`, `git fetch upstream --tags`,
`git merge v<your template.json version> --allow-unrelated-histories` (keep your side of your files,
`--theirs` for the template's), then merge the newest release as usual.

**Where do my own docs go?** `README.md`. Never a second `AGENTS.md` or another AI instruction file.

**Can I host the site elsewhere?** No: the license allows building sites that run on EzyStudio.

## 9. For your AI

Exact steps for a coding agent with only this repository, from its root; stop and report if one
fails. Never skip a step to make a check pass.

1. **Every task:** read `AGENTS.md`, then the `docs/agent/` topic for the work, then
   `STORE-LISTING.md` once per session.
2. **Set up:** `node -v` is 22.12 or later (`.nvmrc`); `git remote -v` lists `upstream` (a fresh clone
   lists it as `origin`: `git remote rename origin upstream`; no remote for this template at all:
   `git remote add upstream https://github.com/EzyStudio/website-template.git`); `npm install`;
   `npm run dev` (http://localhost:4321, or the address it prints).
3. **Build the site** in the developer's own files only (`src/content/`, `src/pages/`,
   `src/components/`, `src/layouts/`, `src/styles/`, `src/assets/`, `public/`), by `AGENTS.md` and
   `docs/agent/`. Describe it in `README.md`.
4. **Never touch the template's own files**: `docs/agent/`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`,
   `template.json`, `CHANGELOG.md`, `scripts/platform.mjs`, `scripts/managed-files.json` (and
   `DEVELOPERS.md`, `LICENSE`, `STORE-LISTING.md`, `store-check.mjs`). If one changed:
   `git checkout v<version in template.json> -- <file>`.
5. **Keep the template current:** `git fetch upstream --tags`; `git describe --tags --abbrev=0 upstream/main`
   is the newest release: compare it with `version` in `template.json`. Newer one out: `git status`
   clean (commit first); `git merge "$(git describe --tags --abbrev=0 upstream/main)"`. Resolve: `package-lock.json` → `git checkout --theirs package-lock.json`, then `npm install`;
   the files in step 4 → `--theirs`; the developer's files → keep theirs and bring over the
   template's change. Then `npm install` and the new `docs/agent/upgrade.md`, from its step 2. If it
   can't finish: `git merge --abort`, and say so.
6. **Check, and fix every failure** (then run them again until all pass): `npm run check`,
   `npm run platform -- check`, `node store-check.mjs` (every line PASS or NOTE).
7. **Ready to submit?** Only when every box is true, report this list to the developer with each box
   ticked, and anything you could not do:
   - [ ] `template.json` is the newest release (`git describe --tags --abbrev=0 upstream/main`).
   - [ ] `git status` is clean; no merge in progress, no conflict markers (`git grep -nE '^(<{7}|>{7}) '` finds nothing).
   - [ ] The template's own files (step 4) are untouched: `npm run platform -- check` says so.
   - [ ] `npm run check` passes.
   - [ ] `node store-check.mjs` passes (no FAIL).
   - [ ] `README.md` describes the site for its owner and their AI.
   - [ ] No keys, passwords or real people anywhere in the repository.
   Then the developer pushes and submits in the developer portal.

## 10. Reporting problems and suggesting changes

This repository is where releases are published; it is read-only for everyone outside the team.

- **Nobody pushes to `main`.** `main` and the `v*` release tags are protected: they change only
  with a release. Work in your own repository (`origin`), never in this one.
- **Found a bug, or something unclear?** Open an issue here, with the template version
  (`template.json`), what you did and what you saw. Never paste a `.env`, a key or customer data.
- **Want to suggest a change?** Fork this repository and open a pull request against `main`. We
  review it, and when we take it, the change goes out in the next release (the pull request is then
  closed with "Included in vX.Y.Z"). Pull requests are not merged here directly, because every
  release replaces these files from our own source.
- **Security problem?** Don't open a public issue: email support@ezystudio.com with "Security" in the subject.
