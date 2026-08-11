# Plan: GoatCounter Analytics

## Goal

Track pageviews and visitor data without cookies, without a consent banner, and
without a paid plan. GoatCounter is free for open source / non-commercial
projects and requires only a script tag — no npm packages, no React integration.

---

## Step-by-step

### 1. Create a GoatCounter account

1. Go to https://www.goatcounter.com
2. Click **Sign up**
3. Choose a site code — this becomes your dashboard URL:
   `https://<your-code>.goatcounter.com`
   Suggestion: `mu-randomizer`
4. Enter your email and the site URL: `https://marvel-united-randomizer.vercel.app`
5. Confirm your email

---

### 2. Add the tracking script to `index.html`

In `app/index.html`, add the following before `</body>`:

```html
<script
  data-goatcounter="https://<your-code>.goatcounter.com/count"
  async
  src="//gc.zgo.at/count.js"
></script>
```

Replace `<your-code>` with the code chosen in step 1.

The script is async, lightweight (~3.5 KB), and does not set cookies.

---

### 3. Verify tracking is working

1. Deploy the change to Vercel (push to `main` triggers auto-deploy)
2. Visit https://marvel-united-randomizer.vercel.app — wait ~30 seconds
3. Open your GoatCounter dashboard: `https://<your-code>.goatcounter.com`
4. Confirm a pageview appears

---

### 4. (Optional) Exclude local development hits

GoatCounter ignores `localhost` by default, so no extra configuration is needed
for local dev. If you ever want to also ignore Vercel preview deployments, add
a path filter in the GoatCounter dashboard under **Settings > Ignore**.

---

## What you get

| Metric | Available |
|---|---|
| Pageviews over time | Yes |
| Unique visitors (estimated) | Yes |
| Referrers (where traffic comes from) | Yes |
| Countries | Yes |
| Browser / OS | Yes |
| Pages / paths visited | Yes |
| Realtime | No (updates every ~10 min) |

---

## What you don't get

- Individual user tracking
- Session recording
- Conversion funnels
- Realtime dashboard

None of those are needed for this project.

---

## Notes

- Free tier requires the project to be non-commercial. This qualifies.
- No GDPR consent banner needed — GoatCounter does not use cookies or
  fingerprinting.
- The script tag is the entire integration. No SDK, no React context, no hooks.
