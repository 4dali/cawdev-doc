---
title: Your account
description: Username, password, your default model, notifications, agent tokens, and the runners that work on your behalf.
---

One area, behind the account menu, and it holds everything about *you* rather
than about any one project — six sections.

| Section | Holds |
|---|---|
| **Account** | Your username — the prefix on every new project you create |
| **Password** | Change your own |
| **Defaults** | Your fallback model, used when a session doesn't name one |
| **Notifications** | The browsers told when something waits for you |
| **Agent tokens** | Tokens you've minted for agents |
| **Runners** | The machines that can run sessions for you |

## Account and username

Your username is derived from your email's local part the first time you sign
in (`ben.moez@…` → `ben-moez`), made unique if it collides, and it's what
prefixes every new project's slug (`<username>-<name>`) so two people can both
call a project "Billing" without colliding. Change it here; nothing else
changes retroactively.

## Agent tokens

A token can only grant what *you* currently hold — evaluated against your
membership at the moment it's used, not the moment it was minted, so a token
belonging to someone who's since lost access to a project dies with that
access rather than quietly outliving it.

Live tokens are listed; revoked ones sit behind a disclosure so the page isn't
mostly dead rows. **Change access…** lets you widen or narrow an existing
token's grants without minting a new one and updating every config that uses
it — the secret itself doesn't change, so a runner whose config gains a
project reaches it on its very next call.

:::note[A run's own token isn't here]
A `cawdr_` token minted for one running session is machinery of that run, not
a credential you manage — the API omits it from this list entirely.
:::

## Runners

Your own machines only — never anyone else's, full stop. Each row shows
whether it's live, stopped cleanly, or not seen recently; what it serves; and
what it's currently driving.

**Unfinished work** lists any checkout a runner is holding that needs a
decision:

| Action | Does |
|---|---|
| **Release** | Frees the reservation only — touches no file, ends resumability |
| **Show changes** | What's actually sitting uncommitted in that checkout |
| **Stash** | Set it aside without losing it |
| **Commit** | With a message you write |
| **Reset…** | Asked twice, and says exactly what it drops |

**Forget** retires a runner that's gone for good. A machine's `what it may do
without asking` — its accepted tool rules, and whether it currently accepts
new ones from the console at all — is shown on the same row, since it's the
same kind of decision as the rest of this page: machinery you own, listed so
you can retire or adjust it.
