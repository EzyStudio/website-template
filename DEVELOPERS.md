# EzyStudio Website template — developer guide

This repository is the **Website template** (`astro-static`) that every EzyStudio website starts
from: Astro, every page prerendered, no server and no database. It is published for developers who
build **static site listings for the [EzyStudio App Store](https://ezystudio.com/app-store)** on their
own computer. You build a whole site on this template, submit it, and every customer who installs
it gets a new site made from your code.

This guide is for you, the developer. It never reaches a customer's site: submit leaves it out.
`README.md` is the template's own setup guide (it ships into every site, so it never names us);
`AGENTS.md` and `docs/agent/` are the rules for the AI that works on the site, yours first, then the
customer's.

**License:** see [`LICENSE`](LICENSE). You may use and change this template to build sites that run
on EzyStudio; the code you write stays yours.

## Contents

1. [Quick start](#1-quick-start)
2. [Clone and remotes](#2-clone-and-remotes)
3. [Build your site](#3-build-your-site)
4. [Check it like submit does](#4-check-it-like-submit-does)
5. [Submit](#5-submit)
6. [How updates work](#6-how-updates-work)
7. [FAQ](#7-faq)
8. [For your AI](#8-for-your-ai)
9. [Reporting problems and suggesting changes](#9-reporting-problems-and-suggesting-changes)

Links: [developer docs](https://ezystudio.com/developers/docs) ·
[developer program](https://ezystudio.com/developers) ·
[developer portal](https://ezystudio.com/dev) ·
[the Web App template](https://github.com/EzyStudio/web-app-template) (sign-in, a database, a dashboard)

## 1. Quick start

You need Node.js 22.12+, npm and git.

```bash
git clone https://github.com/EzyStudio/website-template.git my-site && cd my-site
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
  Releases**. Submit always needs the template's current version.

## 3. Build your site

- Read `AGENTS.md` and `docs/agent/` first, and have your AI read them before every task.
- Every word lives in `src/content/site.ts`, posts in `src/content/blog/`, pages in `src/pages/`.
  **Never change** `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `docs/agent/` or `template.json`: submit
  compares them with the template.
- Describe your site in `README.md`: what it is, where things live, what an owner usually changes.
- No secrets, no install scripts, no deploy config, no server code.
- Rules in full: [Building an app](https://ezystudio.com/developers/docs/building-apps),
  [Best practices](https://ezystudio.com/developers/docs/best-practices).

## 4. Check it like submit does

Download the developer kit from [Templates](https://ezystudio.com/dev/templates). Copy its
`store-check.mjs` and `STORE-LISTING.md` into your repository, add both names to your `.gitignore`,
then:

```bash
node store-check.mjs
npm run check
```

## 5. Submit

1. **Join the developer program** at https://ezystudio.com/developers; your team then works in the
   [developer portal](https://ezystudio.com/dev).
2. Push your branch to GitHub.
3. Open [Submit an app](https://ezystudio.com/dev/submit): the listing, screenshots, and under
   **App code** connect GitHub and pick the repository and branch. The checks run at once; after a
   push, press **Check again**.
4. Pricing, then send it for review. Submitting freezes that commit.

[Submitting](https://ezystudio.com/developers/docs/submitting) ·
[Review](https://ezystudio.com/developers/docs/review). Once approved, the store hosts a public
preview of your site, so people can try it before installing.

## 6. How updates work

**Template releases** (from `upstream`) are tagged `vX.Y.Z`. Merge each one:

```bash
git status                                    # clean: commit your work first
git fetch upstream --tags
git tag -l 'v*' --sort=-v:refname | head -3
git merge v0.7.14
npm install && npm run check
```

Conflicts:
- `package-lock.json`: `git checkout --theirs package-lock.json`, then `npm install`, then commit.
- The template's files (`docs/agent/`, `scripts/platform.mjs`, `CHANGELOG.md`, `AGENTS.md`,
  `CLAUDE.md`, `GEMINI.md`, `DEVELOPERS.md`, `LICENSE`): `git checkout --theirs <file>`.
- Your files: keep your work, bring over what the template changed.
- `git merge --abort` puts everything back.

Then follow the release's `docs/agent/upgrade.md`, download the kit again, run `node store-check.mjs`,
push and submit an update. **Your own updates** reach customers as "Update available", merged into
their copy. [Updates](https://ezystudio.com/developers/docs/updates).

**From a zip** (no shared history): connect once, then merge as above.

```bash
git remote add upstream https://github.com/EzyStudio/website-template.git
git fetch upstream --tags
git merge v<the version in your template.json> --allow-unrelated-histories   # once; keep your side (git checkout --ours <file>), commit
```

## 7. FAQ

**Do I need an EzyStudio account to build?** No. You need an approved developer account only to submit.

**Where do my own docs go?** `README.md`. Never a second `AGENTS.md` or another AI instruction file.

**Can I host the site elsewhere?** No: the license allows building sites that run on EzyStudio.

## 8. For your AI

Exact steps for a coding agent with only this repository, from its root:

1. **Every task:** read `AGENTS.md`, then the `docs/agent/` topic for the work.
2. **Set up:** `node -v` is 22.12 or later (`.nvmrc`); `npm install`; `npm run dev`
   (http://localhost:4321, or the address it prints).
3. **Update** when the developer asks, or `template.json` is below the newest release: `git status`
   clean (commit first); `git fetch upstream --tags`; newest: `git tag -l 'v*' --sort=-v:refname | head -1`;
   `git merge <tag>`. Resolve: `package-lock.json` → `git checkout --theirs` then `npm install`; the
   template's files listed in [How updates work](#6-how-updates-work) → `--theirs`; the developer's
   files → keep theirs and bring over the template's change. Then `npm install`, `npm run check`, and
   the new `docs/agent/upgrade.md` from step 2. If it can't finish: `git merge --abort`, and say so.
4. **Before saying a change is done:** `npm run check`, and `node store-check.mjs` when it is there.

## 9. Reporting problems and suggesting changes

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
