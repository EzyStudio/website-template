#!/usr/bin/env node
// store-check.mjs: the store's checks for a whole site, run on your machine.
//
//   node store-check.mjs
//
// Run it from the top of your repository (where template.json is) before every submit. It checks
// the files your next commit holds (git's tracked files plus new files .gitignore does not hide),
// with the same rules submit uses, and prints one PASS or FAIL line per rule. It changes nothing.
// Exit code 0: every check passed. 1: something to fix.
//
// GENERATED for one template release (RULES.kit below). Every release brings its own copy: merge
// the release tag (DEVELOPERS.md, "How updates work") and this file is replaced with the new one.
// Needs Node 18 or later and nothing else (git for the files and the upstream releases).

import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, lstatSync, readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

// The rules, generated from the store's own checks for this release. Do not edit: each release replaces this file.
const RULES = {
  "kit": {
    "template": "astro-static",
    "version": "0.7.15",
    "madeOn": "2026-11-08"
  },
  "versionsUrl": "https://ezystudio.com/api/public/templates/v1/versions",
  "templateFile": "template.json",
  "addOnManifest": "ZXp5c3R1ZGlvLWFwcC5qc29u",
  "managedCoreDir": "src/platform/",
  "seedFile": "prisma/seed.sql",
  "managedCore": null,
  "agentInstructions": {
    "AGENTS.md": "069d0a11b3a3b0866cda3d234c45c91f1a494075cee651aaf6d2c525c578b121",
    "CLAUDE.md": "336cc4fbf19beaada7ccf9986414fa91851a8d7a07dfb3ccbe800a69eed0ab49",
    "docs/agent/accessibility.md": "79cfcc536c8a3a1fcde8c304cb1cb69ffa31694ad98f48094108861ebfef8902",
    "docs/agent/payments.md": "b38d0d5b9a21f93515c2bbe2d0749e185a24b9e573b272b776e56be3efc98287",
    "docs/agent/performance.md": "d288f8491ce767839d067eec70458bbd9097f445ff4e0873b8577b4a22a23e09",
    "docs/agent/plans-catalogue.md": "53dd4132fba245011aeed8f7de190bb58146466cddb8016d82395488752cbbad",
    "docs/agent/publishing.md": "3dbb9488db50f28d9c2bda56795f75d32dad0fa11c99712912edf9a7d08767a8",
    "docs/agent/security.md": "3bb3a1ceff3697304417b7f96a1baa9f55c0409716ee29239bcaf0e340ce8d17",
    "docs/agent/seo.md": "4d865832a52e8b54a0741f64ec3a0bc0ab5ef0153bc2e0988fc8a9ace6242c56",
    "docs/agent/upgrade.md": "41c23d2e490dfbafb223e61d132a177968cb4b621ad1ec96409b3425663250ee",
    "GEMINI.md": "336cc4fbf19beaada7ccf9986414fa91851a8d7a07dfb3ccbe800a69eed0ab49"
  },
  "managedFiles": {
    "CHANGELOG.md": "d99fd556f94f2245034438f7dd4582fc03d218d6596cd4747ac1dc2421df8a35",
    "scripts/managed-files.json": "09d5d3f61eccba6d746b8efe60250fbec774102bac629128be9e78413fb6748d",
    "scripts/platform.mjs": "b608900fdc324ec2c47ebb5a655cd4e836bc57d53ba159615c6f3b88e7fe62db",
    "template.json": "7409b3f1af660928e69338ab3cbe4dfa14550c203c947cd15fba6358e285897a"
  },
  "developerFiles": [
    "DEVELOPERS.md",
    "LICENSE",
    "STORE-LISTING.md",
    "store-check.mjs"
  ],
  "seed": {
    "required": false,
    "exampleSha": null
  },
  "agentFiles": [
    "AGENTS.md",
    "CLAUDE.md",
    "GEMINI.md"
  ],
  "agentDocsDir": "docs/agent/",
  "agentFileName": {
    "source": "^(agents?\\.md|claude(\\.local)?\\.md|gemini\\.md|codex\\.md|copilot-instructions\\.md|\\.cursorrules|\\.windsurfrules|\\.clinerules)$",
    "flags": "i"
  },
  "siteTemplates": [
    "astro-static",
    "astro-app"
  ],
  "allowedHidden": [
    ".gitignore",
    ".gitattributes",
    ".env.example",
    ".editorconfig",
    ".nvmrc",
    ".node-version",
    ".prettierrc",
    ".prettierrc.json",
    ".prettierignore"
  ],
  "deployConfig": {
    "source": "^(wrangler\\.(json|jsonc|toml)|Dockerfile|Makefile|vercel\\.json|netlify\\.toml)$",
    "flags": "i"
  },
  "nativeOrScript": {
    "source": "\\.(sh|bash|zsh|fish|ps1|bat|cmd|com|exe|dll|so|dylib|node|bin|jar|war|deb|rpm|msi|app|apk)$",
    "flags": "i"
  },
  "segment": {
    "source": "^[A-Za-z0-9_@()+[\\]=,.~-]+$",
    "flags": ""
  },
  "version": {
    "source": "^\\d+\\.\\d+\\.\\d+$",
    "flags": ""
  },
  "installScripts": [
    "preinstall",
    "install",
    "postinstall",
    "preprepare",
    "prepare",
    "postprepare",
    "prepublish",
    "dependencies"
  ],
  "nonPostgres": [
    "mysql",
    "mysql2",
    "mariadb",
    "@planetscale/database",
    "mongodb",
    "mongoose",
    "sqlite",
    "sqlite3",
    "better-sqlite3",
    "@libsql/client",
    "libsql",
    "redis",
    "ioredis",
    "@upstash/redis",
    "firebase",
    "firebase-admin",
    "@firebase/firestore",
    "@supabase/supabase-js",
    "faunadb",
    "fauna",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "dynamoose",
    "couchbase",
    "nano",
    "pouchdb",
    "cassandra-driver",
    "neo4j-driver",
    "@prisma/adapter-planetscale",
    "@prisma/adapter-libsql",
    "@prisma/adapter-d1"
  ],
  "secrets": [
    [
      "LS0tLS1CRUdJTiAoPzpSU0EgfEVDIHxEU0EgfE9QRU5TU0ggfFBHUCB8RU5DUllQVEVEICk/UFJJVkFURSBLRVkoPzogQkxPQ0spPy0tLS0t",
      "",
      "a private key"
    ],
    [
      "XGJBS0lBWzAtOUEtWl17MTZ9XGI=",
      "",
      "an AWS access key"
    ],
    [
      "XGIoPzpza3xyaylfbGl2ZV9bMC05QS1aYS16XXsxNix9XGI=",
      "",
      "a live Stripe key"
    ],
    [
      "XGJ3aHNlY19bMC05QS1aYS16XXsyNCx9XGI=",
      "",
      "a Stripe webhook secret"
    ],
    [
      "XGJnaFtwb3Vzcl1fW0EtWmEtejAtOV17MzYsfVxi",
      "",
      "a GitHub token"
    ],
    [
      "XGJnaXRodWJfcGF0X1tBLVphLXowLTlfXXs0MCx9XGI=",
      "",
      "a GitHub token"
    ],
    [
      "XGJ4b3hbYWJwcnNdLVtBLVphLXowLTktXXsxMCx9XGI=",
      "",
      "a Slack token"
    ],
    [
      "XGJBSXphWzAtOUEtWmEtel8tXXszNX1cYg==",
      "",
      "a Google API key"
    ],
    [
      "XGJzay0oPzphbnQtfHByb2otKT9bQS1aYS16MC05Xy1dezMyLH1cYg==",
      "",
      "an AI provider key"
    ],
    [
      "XGJTR1wuW0EtWmEtejAtOV8tXXsyMn1cLltBLVphLXowLTlfLV17NDN9XGI=",
      "",
      "a SendGrid key"
    ],
    [
      "XGJlenlbYS16XV9bQS1aYS16MC05XXsyNCx9XGI=",
      "",
      "an platform token"
    ]
  ],
  "credentials": {
    "files": {
      "source": "(?:\\.(?:[cm]?[jt]sx?|astro|vue|svelte|html?)|(?:^|\\/)package\\.json)$",
      "flags": "i"
    },
    "patterns": [
      {
        "rule": "credentials.ai_tools",
        "source": "(?:[~\\/\\\\]\\.claude(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.claude[\\/\\\\])",
        "flags": "gm",
        "what": "points at Claude Code's sign-in and settings (.claude)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(['\"\\x60])\\.claude\\1",
        "flags": "g",
        "what": "points at Claude Code's sign-in and settings (.claude)",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(?<![\\w.$-])\\.claude\\.json\\b",
        "flags": "g",
        "what": "names Claude Code's settings file (.claude.json)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "\\.credentials\\.json\\b",
        "flags": "g",
        "what": "names Claude Code's sign-in file (.credentials.json)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(?:[~\\/\\\\]\\.codex(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.codex[\\/\\\\])",
        "flags": "gm",
        "what": "points at Codex's sign-in and settings (.codex)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(['\"\\x60])\\.codex\\1",
        "flags": "g",
        "what": "points at Codex's sign-in and settings (.codex)",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.ai_tools",
        "source": "\\bcodex[/\\\\]auth\\.json\\b",
        "flags": "gi",
        "what": "names Codex's sign-in file (codex/auth.json)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "\\bauth\\.json\\b",
        "flags": "g",
        "what": "names an auth.json in the home or settings folder, where AI tools keep their sign-in",
        "near": {
          "source": "homedir|\\bHOME\\b|USERPROFILE|APPDATA|~[/\\\\]|\\/root\\/|\\/home\\/|\\/Users\\/|\\.config\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(?:[~\\/\\\\]\\.cursor(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.cursor[\\/\\\\])",
        "flags": "gm",
        "what": "points at Cursor's settings (.cursor)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(['\"\\x60])\\.cursor\\1",
        "flags": "g",
        "what": "points at Cursor's settings (.cursor)",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.ai_tools",
        "source": "\\bgithub-copilot(?=[/\\\\'\"\\x60])",
        "flags": "g",
        "what": "points at GitHub Copilot's sign-in (github-copilot)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(?:[~\\/\\\\]\\.gemini(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.gemini[\\/\\\\])",
        "flags": "gm",
        "what": "points at Gemini's sign-in and settings (.gemini)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(['\"\\x60])\\.gemini\\1",
        "flags": "g",
        "what": "points at Gemini's sign-in and settings (.gemini)",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(?<![\\w.$-])\\.aider\\.(?:conf|chat|input|tags|model)\\b",
        "flags": "g",
        "what": "points at Aider's settings (.aider)"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(?:[~\\/\\\\]\\.(?:codeium|windsurf|continue)(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.(?:codeium|windsurf|continue)[\\/\\\\])",
        "flags": "gm",
        "what": "points at an AI tool's settings folder"
      },
      {
        "rule": "credentials.ai_tools",
        "source": "(['\"\\x60])\\.(?:codeium|windsurf|continue)\\1",
        "flags": "g",
        "what": "points at an AI tool's settings folder",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.ai_tools",
        "source": "\\.config[/\\\\](?:claude|anthropic|openai|codex|gemini)\\b",
        "flags": "gi",
        "what": "points at an AI tool's settings in ~/.config"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "(?:[~\\/\\\\]\\.ssh(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.ssh[\\/\\\\])",
        "flags": "gm",
        "what": "points at the SSH keys folder (.ssh)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "(['\"\\x60])\\.ssh\\1",
        "flags": "g",
        "what": "points at the SSH keys folder (.ssh)",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\bid_(?:rsa|ed25519|ecdsa|dsa)\\b",
        "flags": "g",
        "what": "names an SSH private key (id_rsa, id_ed25519…)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "(?:[~\\/\\\\]\\.aws(?=[\\/\\\\'\"\\x60]|$)|(?<![\\w.$-])\\.aws[\\/\\\\])",
        "flags": "gm",
        "what": "points at the AWS keys folder (.aws)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "(['\"\\x60])\\.aws\\1",
        "flags": "g",
        "what": "points at the AWS keys folder (.aws)",
        "near": {
          "source": "\\b(?:join|resolve|homedir|HOME|USERPROFILE|readFile\\w*|readdir\\w*|existsSync|stat\\w*|createReadStream|opendir|glob|path|fs)\\b",
          "flags": ""
        }
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\.npmrc\\b",
        "flags": "g",
        "what": "names an .npmrc outside the repository, which holds npm publish tokens",
        "near": {
          "source": "homedir|\\bHOME\\b|USERPROFILE|APPDATA|~[/\\\\]|\\/root\\/|\\/home\\/|\\/Users\\/|\\.config\\b|\\.\\.[\\/\\\\]\\.npmrc",
          "flags": ""
        }
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\.config[/\\\\]gh(?=[/\\\\'\"\\x60]|$)",
        "flags": "gm",
        "what": "points at the GitHub CLI's sign-in (.config/gh)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\.git-credentials\\b",
        "flags": "g",
        "what": "names the saved git passwords file (.git-credentials)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "(?<![\\w.-])[._]netrc\\b",
        "flags": "g",
        "what": "names the saved logins file (.netrc)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\.docker[/\\\\]config\\.json\\b",
        "flags": "g",
        "what": "names Docker's sign-in file (.docker/config.json)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\.kube[/\\\\]config\\b",
        "flags": "g",
        "what": "names Kubernetes' sign-in file (.kube/config)"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\b(?:Login Data|Web Data|Local State|Cookies|cookies\\.sqlite|logins\\.json|key[34]\\.db)\\b",
        "flags": "g",
        "what": "names a browser's saved passwords or cookies",
        "near": {
          "source": "Chrome|Chromium|BraveSoftware|Brave|Firefox|Mozilla|Safari|Microsoft[/\\\\ ]Edge|Opera|Vivaldi|Library[/\\\\]|AppData|\\.config[/\\\\]|Profile|Default[/\\\\'\"\\x60]",
          "flags": ""
        }
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\.mozilla[/\\\\]firefox|Library[/\\\\]+(?:Application Support[/\\\\]+(?:Google[/\\\\]+Chrome|BraveSoftware|Firefox|Microsoft Edge)|Safari|Cookies|Keychains)|\\.config[/\\\\]+(?:google-chrome|chromium|BraveSoftware|microsoft-edge)|AppData[/\\\\]+(?:Local|Roaming)[/\\\\]+(?:Google|Mozilla|BraveSoftware|Microsoft[/\\\\]+Edge)",
        "flags": "g",
        "what": "points at a browser profile (saved passwords, cookies) or the keychain"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "\\bsecurity\\s+(?:find-generic-password|find-internet-password|dump-keychain)\\b|\\blogin\\.keychain|\\.keychain-db\\b",
        "flags": "g",
        "what": "reads the Mac keychain"
      },
      {
        "rule": "credentials.secrets_on_disk",
        "source": "(?<![.\\w])\\/etc\\/(?:passwd|shadow|sudoers|master\\.passwd)\\b",
        "flags": "g",
        "what": "reads the machine's user list or passwords (/etc/passwd)"
      },
      {
        "rule": "credentials.exfil_pattern",
        "source": "(?<![\\w$.])(?:eval|Function)\\s*\\(\\s*(?:atob|Buffer\\.from|unescape|decodeURIComponent|String\\.fromCharCode)\\b",
        "flags": "g",
        "what": "runs decoded text as code (eval or Function of a decoded string)"
      },
      {
        "rule": "credentials.exfil_pattern",
        "source": "String\\.fromCharCode\\s*\\(\\s*(?:0x[0-9a-f]+|\\d+)(?:\\s*[,+^-]\\s*(?:0x[0-9a-f]+|\\d+)){7,}",
        "flags": "gi",
        "what": "builds hidden text from character codes (String.fromCharCode chain)"
      },
      {
        "rule": "credentials.exfil_pattern",
        "source": "(?:\\\\x[0-9a-fA-F]{2}){16,}",
        "flags": "g",
        "what": "hides text as \\x escapes"
      }
    ]
  },
  "limits": {
    "entries": 6000,
    "files": 5000,
    "fileBytes": 10485760,
    "totalBytes": 52428800,
    "pathLength": 240
  }
};

const re = rule => new RegExp(rule.source, rule.flags);
const DEPLOY_CONFIG = re(RULES.deployConfig);
const NATIVE_OR_SCRIPT = re(RULES.nativeOrScript);
const SEGMENT = re(RULES.segment);
const VERSION = re(RULES.version);
const SECRETS = RULES.secrets.map(([source, flags, what]) => [new RegExp(Buffer.from(source, 'base64').toString('utf8'), flags), what]);
const ALLOWED_HIDDEN = new Set(RULES.allowedHidden);
const CREDENTIAL_FILES = re(RULES.credentials.files);
const CREDENTIALS = RULES.credentials.patterns.map(p => ({what: p.what, re: new RegExp(p.source, p.flags.replace('g', '')), near: p.near ? re(p.near) : null}));
const AGENT_FILE_NAME = re(RULES.agentFileName);
const isInstruction = path => RULES.agentFiles.includes(path) || path.startsWith(RULES.agentDocsDir);
const NON_POSTGRES = new Set(RULES.nonPostgres);
const SHOWN = 10;
const MB = 1024 * 1024;

const root = process.cwd();
const sha = content => createHash('sha256').update(content).digest('hex');
/** A file that differs only by Windows line endings: say how to fix that. */
const crlfOnly = (content, expected) =>
  content.includes(13) && sha(Buffer.from(content.toString('utf8').replace(/\r\n/g, '\n'))) === expected;
const contents = new Map();
const results = [];
const pass = (title, note) => results.push({ok: true, title, note});
const fail = (title, note, paths = []) => results.push({ok: false, title, note, paths});
const warn = (title, note, paths = []) => results.push({ok: true, warn: true, title, note, paths});

// ── which files: what the next commit holds ─────────────────────────────────

/** A .gitignore file as rules (the usual subset: comments, !, trailing /, leading /, *, **, ?, [..]). */
function ignoreRules(text, base) {
  const rules = [];
  for (let line of text.split(/\r?\n/)) {
    line = line.replace(/(?<!\\)\s+$/, '');
    if (!line || line.startsWith('#')) continue;
    let negate = false;
    if (line.startsWith('!')) {
      negate = true;
      line = line.slice(1);
    } else if (line.startsWith('\\!') || line.startsWith('\\#')) {
      line = line.slice(1);
    }
    let dirOnly = false;
    if (line.endsWith('/')) {
      dirOnly = true;
      line = line.replace(/\/+$/, '');
    }
    const anchored = line.includes('/');
    line = line.replace(/^\/+/, '');
    if (!line) continue;
    rules.push({negate, dirOnly, anchored, base, regex: globToRegex(line)});
  }
  return rules;
}

function globToRegex(glob) {
  let out = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        const slashAfter = glob[i + 2] === '/';
        out += slashAfter ? '(?:.*/)?' : '.*';
        i += slashAfter ? 2 : 1;
      } else out += '[^/]*';
    } else if (c === '?') out += '[^/]';
    else if (c === '[') {
      const end = glob.indexOf(']', i + 1);
      if (end === -1) out += '\\[';
      else {
        out += '[' + glob.slice(i + 1, end).replace(/^!/, '^').replace(/\\/g, '\\\\') + ']';
        i = end;
      }
    } else if (c === '\\' && i + 1 < glob.length) {
      out += glob[i + 1].replace(/[.*+?^()|[\]{}\\/-]/g, '\\$&');
      i += 1;
    } else out += c.replace(/[.*+?^()|[\]{}\\/-]/g, '\\$&');
  }
  return new RegExp('^' + out + '$');
}

function ignored(rules, rel, isDir) {
  let result = false;
  for (const rule of rules) {
    if (rule.dirOnly && !isDir) continue;
    if (rule.base && !rel.startsWith(rule.base + '/')) continue;
    const local = rule.base ? rel.slice(rule.base.length + 1) : rel;
    const subject = rule.anchored ? local : local.slice(local.lastIndexOf('/') + 1);
    if (rule.regex.test(subject)) result = !rule.negate;
  }
  return result;
}

/** Every file under the root that .gitignore (at any level) does not hide. */
function walk() {
  const out = [];
  const visit = (dir, rel, inherited) => {
    let rules = inherited;
    const gi = join(dir, '.gitignore');
    if (existsSync(gi)) rules = inherited.concat(ignoreRules(readFileSync(gi, 'utf8'), rel));
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (entry.name === '.git') continue;
      const path = rel ? rel + '/' + entry.name : entry.name;
      const isDir = entry.isDirectory();
      if (ignored(rules, path, isDir)) continue;
      if (isDir) visit(join(dir, entry.name), path, rules);
      else out.push(path);
    }
  };
  visit(root, '', []);
  return out;
}

function gitFiles() {
  const git = args =>
    execFileSync('git', args, {cwd: root, stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * MB});
  let prefix;
  try {
    prefix = git(['rev-parse', '--show-prefix']).toString('utf8').trim();
  } catch {
    return null;
  }
  const listed = git(['ls-files', '-z', '--cached', '--others', '--exclude-standard'])
    .toString('utf8')
    .split('\0')
    .filter(Boolean);
  return {prefix, files: [...new Set(listed)]};
}

// ── the checks (app_installs/site_bundle.ts, in its order) ──────────────────

function listed(paths) {
  const shown = paths.slice(0, SHOWN);
  if (paths.length > SHOWN) shown.push('… and ' + (paths.length - SHOWN) + ' more');
  return shown;
}

function readJson(path) {
  try {
    const value = JSON.parse(readFileSync(join(root, path), 'utf8'));
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

/** Why one path is refused, as submit says it, or null. */
function pathProblem(path) {
  if (path.length > RULES.limits.pathLength) return ['bad_path', 'longer than ' + RULES.limits.pathLength + ' characters'];
  if (path.includes('\\') || path.startsWith('/') || path.includes('\0')) return ['bad_path', 'not a plain relative path'];
  const segments = path.split('/');
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === '' || segment === '.' || segment === '..') return ['bad_path', 'not a plain relative path'];
    const last = i === segments.length - 1;
    if (segment.startsWith('.') && !(last && ALLOWED_HIDDEN.has(segment))) return ['hidden', ''];
    if (!SEGMENT.test(segment)) return ['bad_path', 'has characters a path may not use'];
  }
  const base = segments[segments.length - 1];
  if (DEPLOY_CONFIG.test(base)) return ['deploy', ''];
  if (NATIVE_OR_SCRIPT.test(base)) return ['native', ''];
  return null;
}

function run() {
  const kit = RULES.kit;
  console.log('Store check: ' + kit.template + ' template release ' + kit.version + ' (made on ' + kit.madeOn + ')');

  if (!existsSync(join(root, RULES.templateFile))) {
    fail(RULES.templateFile, 'There is no ' + RULES.templateFile + ' here. Run node store-check.mjs from the top of your repository.');
    return;
  }

  // Files.
  let files;
  let source;
  const fromGit = gitFiles();
  if (fromGit && fromGit.prefix) {
    fail('Repository top', 'This folder is ' + fromGit.prefix + ' inside its git repository. The store reads the repository from its top: ' + RULES.templateFile + ' must be there.');
    files = fromGit.files.filter(p => existsOrLink(p));
    source = 'git';
  } else if (fromGit) {
    files = fromGit.files.filter(p => existsOrLink(p));
    source = 'git';
  } else {
    files = walk();
    source = 'walk';
  }
  console.log(
    source === 'git'
      ? 'Checking ' + files.length + ' files: the ones git tracks and new ones .gitignore does not hide.'
      : 'Not a git repository yet: checking all ' + files.length + ' files .gitignore does not hide.'
  );
  if (source === 'git' && fromGit.prefix) return;

  // template.json
  const tpl = readJson(RULES.templateFile);
  if (!tpl) fail(RULES.templateFile, RULES.templateFile + ' is not valid JSON.');
  else if (!RULES.siteTemplates.includes(tpl.template))
    fail(RULES.templateFile, '"template" must be ' + RULES.siteTemplates.map(t => '"' + t + '"').join(' or ') + '.');
  else if (typeof tpl.version !== 'string' || !VERSION.test(tpl.version))
    fail(RULES.templateFile, '"version" must be the template\'s version, like "' + kit.version + '".');
  else if (tpl.template !== kit.template)
    fail(RULES.templateFile, 'This site is on the ' + tpl.template + ' template; this store-check.mjs is for ' + kit.template + '. Put back the template\'s template.json: git checkout v' + kit.version + ' -- template.json');
  else if (tpl.version !== kit.version)
    fail(
      RULES.templateFile,
      'template.json says ' + tpl.version + ', but this store-check.mjs came with release ' + kit.version + '. A merge was left half done: finish it (git merge v' + kit.version + '), or put back the template\'s copy: git checkout v' + kit.version + ' -- template.json store-check.mjs'
    );
  else pass(RULES.templateFile, tpl.template + ' ' + tpl.version + ', the release this store-check.mjs came with');

  const ADD_ON_MANIFEST = Buffer.from(RULES.addOnManifest, 'base64').toString('utf8');
  if (files.includes(ADD_ON_MANIFEST) || existsSync(join(root, ADD_ON_MANIFEST)))
    fail(ADD_ON_MANIFEST, ADD_ON_MANIFEST + ' is for add-ons. A whole site has only ' + RULES.templateFile + ': remove ' + ADD_ON_MANIFEST + '.');

  // package.json
  const pkg = files.includes('package.json') ? readJson('package.json') : null;
  if (!files.includes('package.json')) fail('package.json', 'The site has no package.json at its top level.');
  else if (!pkg) fail('package.json', 'package.json is not valid JSON.');
  else {
    const scripts = pkg.scripts ?? {};
    const runsOnInstall = RULES.installScripts.find(name => scripts && typeof scripts === 'object' && name in scripts);
    if (typeof scripts !== 'object' || Array.isArray(scripts)) fail('package.json', '"scripts" in package.json must be an object.');
    else if (typeof scripts.build !== 'string') fail('package.json', 'package.json needs a "build" script.');
    else if (runsOnInstall)
      fail('package.json', 'package.json has a "' + runsOnInstall + '" script, which npm runs on install in every customer\'s editor. Remove it.');
    else pass('package.json', 'a build script and no install scripts (' + RULES.installScripts.join(', ') + ')');

    const otherDb = [];
    for (const field of ['dependencies', 'devDependencies', 'optionalDependencies']) {
      const deps = pkg[field];
      if (deps && typeof deps === 'object') for (const name of Object.keys(deps)) if (NON_POSTGRES.has(name)) otherDb.push(name + ' (' + field + ')');
    }
    if (otherDb.length)
      fail('Postgres only', 'These connect to a database other than Postgres. A store site keeps its data in its own Postgres database only.', otherDb);
    else pass('Postgres only', 'no package for another database');
  }

  // Paths.
  const byKind = {bad_path: [], hidden: [], deploy: [], native: []};
  for (const path of files) {
    const problem = pathProblem(path);
    if (problem) byKind[problem[0]].push(problem[1] ? path + ': ' + problem[1] : path);
  }
  if (byKind.hidden.length)
    fail('Hidden files', 'Only ' + RULES.allowedHidden.join(', ') + ' may be in a store site. Delete these from the repository (git rm -r --cached <path>) and keep them out with .gitignore.', listed(byKind.hidden));
  else pass('Hidden files', 'only ' + RULES.allowedHidden.join(', '));
  if (byKind.bad_path.length) fail('Paths', 'Plain relative paths only: letters, digits and _ @ ( ) + [ ] = , . ~ -.', listed(byKind.bad_path));
  else pass('Paths', 'every path is plain');
  if (byKind.deploy.length) fail('Deploy config', 'The platform deploys every site itself: remove these.', listed(byKind.deploy));
  else pass('Deploy config', 'none');
  if (byKind.native.length) fail('Shell scripts and native programs', 'Write scripts in JavaScript (scripts/*.mjs) instead.', listed(byKind.native));
  else pass('Shell scripts and native programs', 'none');

  // Links, sizes, secrets: read every file once.
  const links = [];
  const tooBig = [];
  const secrets = [];
  const credentials = [];
  const hashes = new Map();
  const instructionHashes = new Map();
  let total = 0;
  const dirs = new Set();
  for (const path of files) {
    const parts = path.split('/');
    for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join('/'));
    const full = join(root, path);
    const info = lstatSync(full);
    if (info.isSymbolicLink()) {
      links.push(path);
      continue;
    }
    if (!info.isFile()) continue;
    total += info.size;
    if (info.size > RULES.limits.fileBytes) {
      tooBig.push(path + ' (' + (info.size / MB).toFixed(1) + ' MB)');
      continue;
    }
    const content = readFileSync(full);
    if (path.startsWith(RULES.managedCoreDir)) hashes.set(path, sha(content));
    if (isInstruction(path)) instructionHashes.set(path, sha(content));
    if ((RULES.managedFiles && path in RULES.managedFiles) || path === RULES.seedFile) contents.set(path, content);
    if (path.startsWith(RULES.managedCoreDir) || isInstruction(path)) contents.set(path, content);
    if (!content.subarray(0, 8000).includes(0)) {
      const text = content.toString('utf8');
      const hit = SECRETS.find(([pattern]) => pattern.test(text));
      if (hit) secrets.push(path + ': looks like ' + hit[1]);
      if (!path.startsWith(RULES.managedCoreDir) && !RULES.developerFiles.includes(path) && CREDENTIAL_FILES.test(path)) {
        const lines = text.split('\n');
        for (let n = 0; n < lines.length; n++) {
          const line = lines[n];
          if (/^\s*(\/\/|\/\*|\*)/.test(line)) continue;
          const found = CREDENTIALS.find(p => p.re.test(line) && (!p.near || p.near.test(line)));
          if (found) credentials.push(path + ':' + (n + 1) + ': ' + found.what);
        }
      }
    }
  }
  if (links.length) fail('Symbolic links', 'A store site may not hold symbolic links: put the real file there.', listed(links));
  else pass('Symbolic links', 'none');

  // Every managed file: byte for byte this release's (submit: platform_changed,
  // instructions_changed, managed_file_changed). The fix is the same git command for all.
  const restore = [];
  const state = (path, got, expected) => {
    if (!got) {
      restore.push(path);
      return path + ': missing';
    }
    restore.push(path);
    return path + (crlfOnly(contents.get(path) || Buffer.alloc(0), expected) ? ': Windows line endings (CRLF); the template\'s are LF' : ': changed');
  };
  if (RULES.managedCore) {
    const core = new Map(Object.entries(RULES.managedCore));
    const changed = [];
    for (const [path, expected] of core) {
      const got = hashes.get(path);
      if (got !== expected) changed.push(state(path, got, expected));
    }
    for (const path of hashes.keys()) if (!core.has(path)) changed.push(path + ': added (git rm it; your code goes in src/server/ or src/lib/)');
    if (changed.length)
      fail(RULES.managedCoreDir + ' (platform_changed)', 'The template\'s managed core must be exactly release ' + kit.version + '\'s. Your code goes in src/server/ or src/lib/.', listed(changed));
    else pass(RULES.managedCoreDir, 'the template\'s managed core, untouched (' + core.size + ' files)');
  }
  if (RULES.managedFiles) {
    const changed = [];
    for (const [path, expected] of Object.entries(RULES.managedFiles)) {
      const content = contents.get(path);
      const got = content ? sha(content) : null;
      if (got !== expected) changed.push(state(path, got, expected));
    }
    const names = Object.keys(RULES.managedFiles).join(', ');
    if (changed.length) fail('The template\'s own files (managed_file_changed)', names + ' must be exactly release ' + kit.version + '\'s.', listed(changed));
    else pass('The template\'s own files', names + ', untouched');
  }

  // AGENTS.md, CLAUDE.md, GEMINI.md and docs/agent/: byte for byte the template's, and no other
  // instructions for the owner's AI anywhere.
  const instructions = [];
  if (RULES.agentInstructions) {
    const expected = new Map(Object.entries(RULES.agentInstructions));
    for (const [path, want] of expected) {
      const got = instructionHashes.get(path);
      if (got !== want) instructions.push(state(path, got, want));
    }
    for (const path of instructionHashes.keys()) if (!expected.has(path)) instructions.push(path + ': added');
  }
  for (const path of files) {
    const base = path.slice(path.lastIndexOf('/') + 1);
    if (!isInstruction(path) && AGENT_FILE_NAME.test(base)) instructions.push(path + ': instructions for the AI outside the template\'s');
  }
  if (instructions.length)
    fail('Instructions for the AI (instructions_changed)', 'Keep ' + RULES.agentFiles.join(', ') + ' and ' + RULES.agentDocsDir + ' exactly as release ' + kit.version + ' has them, and add no others; describe your app in README.md.', listed(instructions));
  else pass('Instructions for the AI', RULES.agentFiles.join(', ') + ' and ' + RULES.agentDocsDir + ' as the template has them');
  if (restore.length) {
    const crlf = results.some(r => !r.ok && (r.paths || []).some(p => p.includes('CRLF')));
    warn(
      'Put the template\'s files back',
      'git checkout v' + kit.version + ' -- ' + restore.slice(0, 20).join(' ') + (restore.length > 20 ? ' …' : '') + ', then commit.' +
        (crlf ? ' For Windows line endings: git add --renormalize . (the template\'s .gitattributes keeps them LF), then commit.' : '')
    );
  }

  // Sample data (web apps): required, and it adds rows (submit: seed_missing, seed_empty).
  if (RULES.seed.required) {
    const seed = contents.get(RULES.seedFile);
    const text = seed ? seed.toString('utf8').replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/--[^\n]*/g, ' ').trim() : '';
    if (!text)
      fail(RULES.seedFile + ' (seed_missing)', 'Add ' + RULES.seedFile + ' with sample data so the store preview shows a working app; see DEVELOPERS.md › Sample data.');
    else if (!/\binsert\s+into\b/i.test(text))
      fail(RULES.seedFile + ' (seed_empty)', RULES.seedFile + ' adds no rows. Give it at least one INSERT of sample data so the store preview shows a working app; see DEVELOPERS.md › Sample data.');
    else if (RULES.seed.exampleSha && sha(seed) === RULES.seed.exampleSha)
      warn(RULES.seedFile, 'still the template\'s example (its job board\'s sample jobs). Replace it with sample data for your app: it loads into review and your public preview, and fails there if your schema has no "jobs" table.');
    else pass(RULES.seedFile, 'your sample data. The review checks what it may do; load it twice on your machine (npm run db:seed) to be sure it is safe to run twice.');
  }

  if (credentials.length)
    fail('Sign-ins and keys', 'This code reads AI tools\' sign-ins or keys and passwords on the computer that runs it (it runs in the customer\'s editor, next to their AI sign-in). The store refuses it: remove it.', listed(credentials));
  else pass('Sign-ins and keys', 'nothing reads AI tools\' sign-ins or other keys on the computer');

  if (secrets.length) fail('Secrets', 'Remove these and keep keys in the site\'s settings, never in the code.', listed(secrets));
  else pass('Secrets', 'nothing that looks like a live key or token');

  const sizes = [];
  if (files.length > RULES.limits.files) sizes.push(files.length + ' files: at most ' + RULES.limits.files);
  if (files.length + dirs.size + 1 > RULES.limits.entries) sizes.push(files.length + dirs.size + 1 + ' files and folders: at most ' + RULES.limits.entries);
  if (total > RULES.limits.totalBytes) sizes.push((total / MB).toFixed(1) + ' MB in all: at most ' + RULES.limits.totalBytes / MB + ' MB');
  for (const big of tooBig) sizes.push(big + ': at most ' + RULES.limits.fileBytes / MB + ' MB per file');
  if (sizes.length) fail('Size', 'Make the site smaller: big pictures and videos belong in file storage, not the repository.', listed(sizes));
  else pass('Size', files.length + ' files, ' + (total / MB).toFixed(1) + ' MB (limits: ' + RULES.limits.files + ' files, ' + RULES.limits.totalBytes / MB + ' MB, ' + RULES.limits.fileBytes / MB + ' MB per file)');

}

function existsOrLink(path) {
  try {
    lstatSync(join(root, path));
    return true;
  } catch {
    return false;
  }
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
  return 0;
}

/**
 * Known security problems in the packages, as the store's review finds them: npm audit over the
 * lockfile. High or critical fails; moderate and low are listed as notes. Offline is a note, never a
 * failure: the store runs the same audit on every submit.
 */
function audit() {
  const title = 'Known security problems (npm audit)';
  if (!existsSync(join(root, 'package-lock.json'))) {
    fail(title, 'package-lock.json is missing. Run npm install, commit package-lock.json, then run this again.');
    return;
  }
  let out = '';
  try {
    out = execFileSync('npm', ['audit', '--json', '--package-lock-only'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 32 * MB,
    });
  } catch (error) {
    // npm audit exits non-zero when it finds something: its report is still on stdout.
    out = error && error.stdout ? String(error.stdout) : '';
  }
  let data = null;
  try {
    data = JSON.parse(out);
  } catch {
    data = null;
  }
  if (!data || data.error) {
    warn(title, 'npm audit could not run here (offline, or npm is missing). The store runs it when you submit: run this again online.');
    return;
  }
  const found = Object.values(data.vulnerabilities || {});
  if (!found.length) {
    pass(title, 'none in your packages.');
    return;
  }
  const rank = {critical: 4, high: 3, moderate: 2, low: 1, info: 0};
  const lines = (list) =>
    list
      .sort((a, b) => (rank[b.severity] || 0) - (rank[a.severity] || 0))
      .map((v) => {
        const advisories = (v.via || []).filter((x) => x && typeof x === 'object');
        const what = advisories.length
          ? Array.from(new Set(advisories.map((a) => a.title + (a.url ? ' (' + a.url + ')' : '')))).join('; ')
          : 'through ' + (v.via || []).join(', ');
        const fix = v.fixAvailable === true
          ? 'fix: npm audit fix'
          : v.fixAvailable && v.fixAvailable.name
            ? 'fix: update ' + v.fixAvailable.name + ' to ' + v.fixAvailable.version + (v.fixAvailable.isSemVerMajor ? ' (a major version: check your code)' : '')
            : 'no fix published yet: replace or remove ' + v.name;
        return v.severity.toUpperCase() + '  ' + v.name + (v.isDirect ? '' : ' (comes in through another package)') + ': ' + what + '. ' + fix;
      });
  const serious = found.filter((v) => v.severity === 'critical' || v.severity === 'high');
  const minor = found.filter((v) => !(v.severity === 'critical' || v.severity === 'high'));
  if (serious.length) {
    fail(title, serious.length + ' high or critical. Fix these before you submit: the review lists them for staff.', lines(serious));
  } else {
    pass(title, 'no high or critical problem.');
  }
  if (minor.length) warn('Smaller security notes (npm audit)', minor.length + ' moderate or low. Fix them when you can.', lines(minor));
}

/**
 * Is this the template's CURRENT release? Submit refuses any other one. The platform's public answer
 * first, then the upstream remote's tags; neither reachable is a note, never a failure.
 */
async function currentRelease() {
  const title = 'Current template release';
  const tpl = readJson(RULES.templateFile);
  if (!tpl || typeof tpl.version !== 'string' || !VERSION.test(tpl.version)) return;
  let newest = null;
  let from = '';
  if (RULES.versionsUrl) {
    try {
      const res = await fetch(RULES.versionsUrl, {signal: AbortSignal.timeout(5000), headers: {accept: 'application/json'}});
      const body = res.ok ? await res.json() : null;
      const v = body && body[RULES.kit.template];
      if (typeof v === 'string' && VERSION.test(v)) {
        newest = v;
        from = 'the platform';
      }
    } catch {
      // offline: try the upstream tags
    }
  }
  if (!newest) {
    try {
      const out = execFileSync('git', ['ls-remote', '--tags', '--refs', 'upstream'], {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 15000});
      for (const line of out.split('\n')) {
        const m = /refs\/tags\/v(\d+\.\d+\.\d+)$/.exec(line.trim());
        if (m && (!newest || compareVersions(m[1], newest) > 0)) newest = m[1];
      }
      if (newest) from = 'the upstream remote\'s tags';
    } catch {
      // no upstream remote, or offline
    }
  }
  if (!newest) {
    warn(title, 'Couldn\'t find the newest release (offline, or no "upstream" remote: git remote -v). Submit checks it: run this again online.');
    return;
  }
  const order = compareVersions(tpl.version, newest);
  if (order < 0)
    fail(title, 'Your template is ' + tpl.version + '; the current one is ' + newest + '. Merge it before you submit: git fetch upstream --tags, then git merge v' + newest + ', then npm install, npm run check and node store-check.mjs.');
  else if (order > 0 && from === 'the platform')
    fail(title, 'template.json says ' + tpl.version + ', newer than the current release ' + newest + '. Put back the template\'s copy: git checkout v' + newest + ' -- template.json');
  else pass(title, tpl.version + ' (from ' + from + ')');
}

run();
await currentRelease();
audit();

let failed = 0;
for (const r of results) {
  const tag = !r.ok ? 'FAIL' : r.warn ? 'NOTE' : 'PASS';
  if (!r.ok) failed += 1;
  console.log(tag + '  ' + r.title + ': ' + r.note);
  for (const p of r.paths ?? []) console.log('        ' + p);
}
console.log(
  failed
    ? '\n' + (failed === 1 ? '1 check failed. Fix it' : failed + ' checks failed. Fix them') + ', then run node store-check.mjs again.'
    : '\nEvery check passed. Commit, push, then submit the branch in the developer portal.'
);
process.exitCode = failed ? 1 : 0;
