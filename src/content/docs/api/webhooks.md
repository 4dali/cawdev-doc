---
title: Webhooks
description: Be told when a card's phase changes or feedback is dealt with — one signed POST per event, retried, with the last deliveries readable under the token.
---

Rather than polling `GET …/cards/{ref}`, set a **webhook** on the token and
the platform calls your application: a `card.status` whenever a card's
[`phase`](/api/calls/#phase--the-one-word-to-switch-on) changes, and a
`feedback.outcome` when feedback is accepted or refused. Every delivery is
signed with a secret only you and the platform hold, retried when your end
is down, and listed under the token with what your end answered.

## Set one

**Settings → API tokens**, under the token: a **URL**, *Tell it about* —
**Cards this token filed** (the default) or **Every card in its projects** —
and **Save**. You are shown a **signing secret once**; copy it into your
application's configuration beside the token and press *I have copied it*.

Then press **Send a test**. The platform POSTs a `ping` — the envelope with
no subject — so you can check your signature verification before anything
real arrives. It appears under *Last deliveries* with what your end answered.

One webhook per token. Changing the URL or the scope keeps the secret;
**Rotate secret** issues a new one, shown once, and the old one stops
verifying the moment it does. **Remove** deletes the webhook with its
deliveries.

:::note[A person's act, never the token's]
The webhook is set, rotated and removed in the console by the token's owner.
There is no call on the integration surface that touches it — a token that
could point its own deliveries somewhere would be a credential turning itself
into a feed.
:::

## The URL

The platform is calling *out* from inside a deployment, so the URL is held to
a few rules, each named in the `400` when broken:

- `https`, or `http` to `localhost` for a receiver on the machine cawdev
  itself runs on.
- No credentials in it.
- Its host may not resolve to a loopback, private, link-local, carrier-grade
  NAT or multicast address — the platform must not be pointed at its own
  network.
- Redirects are never followed.

## The request

Every delivery is a `POST` with `Content-Type: application/json`, `User-Agent:
cawdev-webhook`, and four headers:

| Header | Carries |
|---|---|
| `X-Cawdev-Event` | `card.status`, `feedback.outcome` or `ping` |
| `X-Cawdev-Delivery` | The delivery's id — also `delivery` in the body |
| `X-Cawdev-Sequence` | A counter per webhook, increasing — also `sequence` in the body. Two deliveries that arrive out of order are told apart by it |
| `X-Cawdev-Signature` | `sha256=<hex>`, below |

The body is an envelope, and for the two real events a subject beside it:

```json
{
  "event": "card.status",
  "delivery": "9c4a…",
  "sequence": 42,
  "sentAt": "2026-09-21T10:02:43Z",
  "token": { "label": "support-tool" },
  "project": { "slug": "my-project", "name": "My project" },
  "card": {
    "ref": "R12",
    "kind": "ROADMAP",
    "title": "Export to CSV",
    "status": "IN_DEVELOPMENT",
    "phase": "CODING",
    "work": { "branch": "r12-export-to-csv", "status": "CODING", "prUrl": null, "note": null, "signedOff": false },
    "run": { "id": "2b7e…", "profile": "CODE", "state": "RUNNING", "startedAt": "2026-09-21T10:02:41Z", "finishedAt": null },
    "path": "/projects/my-project/roadmap/12",
    "url": "https://app.cawdev.com/projects/my-project/roadmap/12",
    "updatedAt": "2026-09-21T10:02:41Z"
  }
}
```

| `event` | Carries | When |
|---|---|---|
| `card.status` | `project` and `card` — the same shape `GET …/cards/{ref}` answers | A card in the webhook's reach changed `phase` |
| `feedback.outcome` | `project` and `feedback` — the same shape `GET …/feedback/{id}` answers | A `WRITER` accepted or refused feedback in the webhook's reach |
| `ping` | The envelope alone | *Send a test* |

*Reach* is the scope you chose: **Cards this token filed** means the cards
and feedback this token filed itself; **Every card in its projects** means
every card on every project the token holds.

## Verify the signature

`X-Cawdev-Signature` is `sha256=` followed by the lower-case hex of
**HMAC-SHA256 over the raw request body bytes**, with the secret as the key.
Compute it over the bytes you received, *before* parsing them, and compare
with a constant-time equality. Reject anything that does not verify before
you read a field of it. A complete receiver in Node, no dependencies:

```js
const crypto = require('node:crypto');
const http = require('node:http');

http.createServer((req, res) => {
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const raw = Buffer.concat(chunks);
    const expected = 'sha256=' + crypto.createHmac('sha256', process.env.SECRET).update(raw).digest('hex');
    const given = req.headers['x-cawdev-signature'] ?? '';
    const ok = expected.length === given.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given));
    if (!ok) { res.writeHead(401); return res.end(); }
    const event = JSON.parse(raw);           // { event, sequence, project, card: { ref, phase, … } }
    console.log(req.headers['x-cawdev-event'], event.card?.ref, event.card?.phase);
    res.writeHead(200); res.end();
  });
}).listen(8787);
```

Run it with `SECRET=whsec_… node receiver.js`, set the webhook to
`http://localhost:8787/` on a local instance, and press *Send a test*.

## Answering, retries, and giving up

Answer **`2xx` within ten seconds**. What happens otherwise:

| Your end answers | The platform |
|---|---|
| `2xx` | Delivered |
| `5xx`, `408`, `429`, a timeout, a refused connection | Retries after 30 s, 1 min, 3 min and 10 min — **five attempts in all**, then it **gave up** |
| Any other `4xx` | Taken as "will keep saying no" — the delivery fails at once |

Ten undelivered deliveries in a row **disable the webhook**; the token's card
says so, and *Save* re-enables it. Two changes to one card inside one backoff
reach you as the later one, and `sequence` tells two deliveries apart when
they arrive out of order.

## Last deliveries

Under the token, the last fifty deliveries newest first: the event, its
sequence, how many attempts, when it was delivered or failed, what your end
answered (the status and the first 200 characters of the body), and why it
is retrying or gave up. Never the body that was sent and never the secret. It
is where "did it send, and what did my server say" is answered without
adding logging to your receiver.

:::tip[Which phases to act on]
Most applications care about a handful: `MERGED` and `SHIPPED` (tell the
customer it landed), `DECLINED` (tell them it will not), `RUN_FAILED`
(somebody should look), and `ACCEPTED`/`REFUSED` on feedback. The rest are a
progress indicator, and `card.status` arrives for every one of them — filter
on `card.phase` rather than on whether a delivery arrived.
:::
