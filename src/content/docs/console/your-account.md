---
title: Your settings
description: Your account, password, passkeys, defaults, notifications, tokens and machines — everything about you rather than about one project.
---

Open **Settings** from the account menu (top right). It holds everything about
*you* rather than about any one project: who you are, how you sign in, your
defaults, and the tokens and machines you own. It lives at `/settings`.

## The layout

<!-- WAITS: R521 -->
The same layout as [Project settings](/console/project-settings/#the-layout):
the menu on the left, one pane beside it, one address per section. The page
heading is **Settings**, and each pane starts with its name and a sentence.

| Menu | Holds |
|---|---|
| **Account** | Email (read-only), username, avatar |
| **Password** | Change your own |
| **Passkeys** | Sign in with your device |
| **Defaults** | Your default agent, and a model and effort per agent |
| **Notifications** | The browsers told when something waits for you |
| *Access* — **Agent tokens** | Tokens you have minted for agents |
| *Access* — **API tokens** | Tokens for your own applications, and their webhooks |
| *Access* — **Machines** | The computers that run agents for you |

- `/settings` opens on **Account**; the others are `/settings/password`,
  `/settings/passkeys`, `/settings/defaults`, `/settings/notifications`,
  `/settings/tokens`, `/settings/api-tokens` and `/settings/runners`. Older
  addresses redirect.
- **Pending edits** keep across menus; a menu with one shows an amber dot. Today
  only the username goes through the save bar — *1 change not saved · Account ·
  Discard · Save settings*. A half-typed password is not a pending setting and
  is not kept. Everything else acts at once and says so in a snackbar.
- Going away with an unsaved username asks first (*Leave without saving?*).
- **On a phone** `/settings` is a list of menus under two headings, with a
  **‹ Settings** link back from a pane.

If your instance predates this layout you will see the same sections one at a
time beside the menu, with Password as the landing section.

## Account

**Email** is what you sign in with and is read-only here; an administrator
changes it. Your **username** is derived from your email's local part the first
time you sign in (`ben.moez@…` → `ben-moez`), made unique if it collides, and
it prefixes every new project's slug (`<username>-<name>`) so two people can
both call a project "Billing" without colliding. Change it here; nothing
already created is renamed. A preview under the field shows the slug a new
project would get. Pick an **avatar** from twelve colours and a set of glyphs.

## Password

At least twelve characters. If you lose it, an administrator issues a new one;
there is no reset by email. Changing it asks for the current one.

## Passkeys

A passkey signs you in with a fingerprint, a face or a PIN, beside the
password. Adding one asks for your current password first, and needs the
console on `https` or `localhost`. Your password keeps working. You can then
sign in from the login page, and the terminal's browser sign-in accepts one too.

## Defaults

Your default **agent** (Claude Code, Codex or Antigravity), and, for each agent,
a **model** and an **effort** per weight ("What each weight means for …"),
rather than one fallback model. These apply when nothing closer to the work
says otherwise: the order is the card, then you, then the project's default
agent, then the machine. A model is only ever used with the agent it belongs
to.

## Notifications

The browsers that are told when something is waiting on you, and which things
reach you.

## Agent tokens

A token can only grant what *you* currently hold. Since the privilege model, that
means each scope is tied to a [privilege](/console/team-access/#tokens-follow-privileges)
on the project — you can mint a scope only while you hold its privilege, and it
is checked again at every call. A token belonging to someone who has since lost
access, or whose team's grant is paused, stops working with that access rather
than quietly outliving it.

Live tokens are listed; revoked ones sit behind a disclosure. **Change
access…** widens or narrows an existing token without minting a new one, and
the secret does not change, so a runner whose config gains a project reaches it
on its very next call. A new token's secret is shown once, in a dialog with
**Copy token** and **Close**.

:::note[A run's own token isn't here]
A `cawdr_` token minted for one running session is machinery of that run, not a
credential you manage; the API omits it from this list.
:::

## API tokens

The same rule, the same list, for a token your *own application* holds — a
support tool that files what customers report, a dashboard that shows where a
card has got to. An API token starts `cawa_`, holds at most three scopes
(`backlog:write`, `cards:file`, `cards:read`) and reaches a small versioned
surface of its own. Under each live token sits its **webhook**: the URL
cawdev calls when a card moves, its signing secret shown once in a dialog
(**Copy secret**, **Close**), *Send a test*, *Rotate secret* (asks first) and
the last deliveries. The whole of it is the
[Integration API](/api/integration/) section.

## Machines

Your computers that run agents — yours only, never anyone else's, with no
administrator exception. Each row shows whether it is **Live** or **Away** with
a phrase such as "seen 3s ago", what it serves and what it is driving.

**Unfinished work** lists any checkout a machine is holding that needs a
decision:

| Action | Does |
|---|---|
| **Release** | Frees the reservation only — touches no file, ends resumability |
| **Show changes** | What is actually sitting uncommitted in that checkout |
| **Stash** | Set it aside without losing it |
| **Commit** | With a message you write |
| **Reset…** | Asked twice, and says exactly what it drops |

**Disconnect machine** (formerly *Forget*) retires a machine that has gone for
good, behind a confirmation. Each row also shows what the machine may do
without asking — its accepted tool rules and whether it accepts new ones from
the console, and **Allow everything**, which Codex and Antigravity need before
they may write. **Auto-resume** (per machine, off by default) picks a run back
up after the usage limit lifts.

Signed-in browser sessions survive an API restart, so an upgrade does not sign
you out.
