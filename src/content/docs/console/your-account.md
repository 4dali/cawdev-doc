---
title: Your settings
description: Your account, password, passkeys, defaults, notifications, tokens and machines — everything about you rather than about one project.
---

Open **Settings** from the account menu (top right). It holds everything about
*you* rather than about any one project: who you are, how you sign in, your
defaults, and the tokens and machines you own. It lives at `/settings`.

## The layout

The same layout as [Project settings](/console/project-settings/#the-layout):
the menu on the left, one pane beside it, one address per section. The page
heading is **Settings**, and each pane starts with its name, in the pane's own
head, and a sentence.

| Menu | Holds |
|---|---|
| **Account** | Email (read-only), username, avatar |
| **Password** | Change your own |
| **Passkeys** | Sign in with your device |
| **Defaults** | Your default agent, and a model and effort per agent |
| **Notifications** | What tells you, by which channel, and the browsers told |
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

Which things tell you, and how. Every browser that agreed to be told is listed
at the top, with the switch that turns notifications on for this one; every
switch on the page acts at once and a message names what it did.

Thirteen kinds, grouped as Runs, Cards, Reviews and Teams & access, each with three switches:

- **In app** keeps a row in your own feed, the one you can come back to. It is on
  for every kind. Turning it off stops the rows, not the push or the mail.
- **Push** sends a notification to your browsers. It carries the project and
  what is waiting, never the question or what an agent wrote, because a
  notification sits on a lock screen.
- **Email** sends one mail with the same words and a link. It is off for
  everything until you turn it on. If the column is greyed out with *Mail is not
  set up on this instance*, ask your administrator.

### What tells you, and who

You are never told about something you did yourself.

| What happened | Who hears it | Push | Email |
|---|---|---|---|
| A card is assigned to you, or taken off you (*Assigned*) | The new assignee; the previous one hears *took you off* | on | off |
| A card you filed, watch, are assigned or commented on moves: Merged, Shipped, Declined with its reason (*Card moved*) | Those people, the person who filed it included | on | off |
| A comment on a card you follow, or a mention of you in one (two kinds: *Commented* and *Mentioned*) | Those people | on | off |
| A branch you wrote or watch is reviewed, or marked Done or Not done (*Branch reviewed*) | Its author, the cards' watchers and anyone named | on | off |
| A review is handed to you by name (*Review handed to you*) | The person it was handed to (an unassigned request is every member's, and tells nobody) | on | off |
| A question is waiting, or a permission request is | Whoever can answer it (two kinds: *Question* and *Permission request*) | on | off |
| A run you started finishes (*Run finished*) | You | off | off |
| A run you started fails (*Run failed*) | You | off | off |
| Your team's sprint starts or completes (two kinds: *Sprint started* and *Sprint completed*) | The team's members | off | off |
| You are added to a project or a team, your role changes, or a project is shared with your team (*Access changed*) | You; for a share, the team's members | off | off |
| Feedback you filed becomes a card or an issue, or is declined (*Feedback accepted* and *Feedback declined*) | You, with the reason if one was given | off | off |

Not told on purpose: being removed from a project or a team, a new issue (the
Roadmap's untriaged count says so), a card added to a sprint (its history says
so), and a run you stopped yourself.

A **branch reviewed** notification goes to the person who offered the branch,
whoever started its coding run, the card's watchers and anyone `@`-mentioned in
the review, but never the reviewer.

### The bell and the notification centre

The bell in the top bar opens your unread notifications over the page you are
on. The **notification centre**, at `/notifications`, is the same feed as a page,
with three tabs:

| Tab | Shows |
|---|---|
| **Unread** | What you have not read |
| **All** | Everything kept for you |
| **From cawdev** | Announcements from your administrator |

Beside the tabs are a project filter and a kind filter. Rows sit under a
heading for each day, with **Load older** at the end, and a read or unread
button on every row. What you have not read carries a dot and the word *New*.
Opening the page marks nothing read; opening a row does.

A question or a permission request that is answered, and a run notice you have
looked at, mark their rows read by themselves, so the feed never says something
is waiting on you when Waiting on you says it is not. A row shows only while you
can still see what it is about: leave a project or a team and its rows go from
your feed and your count. Read rows are kept 30 days, everything 90, and at most
1000 per person.

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
