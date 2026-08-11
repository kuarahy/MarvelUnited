# Plan: SEO Improvements

## Goal

Improve discoverability and link previews across search engines and board game
communities (Reddit, Discord, BGG). No new dependencies. All changes are static
files or additions to `index.html`.

---

## Items

### 1. Open Graph + Twitter Card tags (`index.html`)

When a user shares the link on Discord, Reddit, or BGG, the embed currently
shows no image, no description, and a blank title.

Add to `<head>`:

```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://marvel-united-randomizer.vercel.app/" />
<meta property="og:title" content="Marvel United Randomizer" />
<meta property="og:description" content="Randomize heroes, villains, and expansions for the Marvel United board game. Includes team builder, custom campaigns, and branching scenarios." />
<meta property="og:image" content="https://marvel-united-randomizer.vercel.app/og-image.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Marvel United Randomizer" />
<meta name="twitter:description" content="Randomize heroes, villains, and expansions for the Marvel United board game." />
<meta name="twitter:image" content="https://marvel-united-randomizer.vercel.app/og-image.png" />
```

---

### 2. `robots.txt` and `sitemap.xml` (`public/`)

Vercel serves everything in `public/` at the root. Neither file exists today.

**`public/robots.txt`**
```
User-agent: *
Allow: /
Sitemap: https://marvel-united-randomizer.vercel.app/sitemap.xml
```

**`public/sitemap.xml`**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://marvel-united-randomizer.vercel.app/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### 3. Social preview image (`public/og-image.png`)

A static `1200x630` PNG placed in `public/`. Referenced by OG and Twitter tags above.

Design guidance:
- Dark background consistent with the app's theme
- "Marvel United Randomizer" as headline text
- Subtitle: "Heroes · Villains · Expansions · Campaigns"
- No character art that could trigger copyright issues — use geometric/abstract Marvel-adjacent styling or just clean typography

Tool options: Figma, Canva, or a simple HTML-to-image script.

---

### 4. Structured data (`index.html`)

A `SoftwareApplication` JSON-LD block signals to Google what the page is.
Eligible for a richer search result panel (not guaranteed).

Add inside `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Marvel United Randomizer",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web",
  "url": "https://marvel-united-randomizer.vercel.app/",
  "description": "Randomize heroes, villains, and expansions for the Marvel United board game. Includes team builder, custom campaigns, and branching scenarios.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

---

## Order of execution

| # | Item | Effort |
|---|---|---|
| 1 | OG + Twitter tags | Low — pure HTML |
| 2 | robots.txt + sitemap.xml | Low — two static files |
| 3 | og-image.png | Medium — needs design work |
| 4 | Structured data | Low — pure HTML, depends on final URL being stable |

Do 1, 2, and 4 together in one commit. Do 3 separately once the image is ready.
