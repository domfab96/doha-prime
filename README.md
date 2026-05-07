# 🌿 Doha Prime Ventures — React Web App

A full-stack agritech web application for Doha Prime Ventures.
Built with Vite + React + Tailwind CSS + React Router DOM.

---

## ⚡ Quick Start

### Step 1 — Scaffold the Vite project (run once)

```bash
# Create a new Vite + React project
npm create vite@latest doha-prime-ventures -- --template react
cd doha-prime-ventures

# Install core dependencies
npm install react-router-dom

# Install Tailwind CSS and PostCSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

### Step 2 — Replace generated files with the provided source

Copy all files from this package into the project root, overwriting the defaults:

```
doha-prime-ventures/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── PhotoPlaceholder.jsx
    │   └── ProductCard.jsx
    └── pages/
        ├── Home.jsx
        ├── About.jsx
        ├── Projects.jsx
        ├── Store.jsx
        ├── Records.jsx
        └── Admin.jsx
```

### Step 3 — Install and run

```bash
npm install
npm run dev
```

Open: http://localhost:5173

---

## 📁 Project Structure

| File | Purpose |
|------|---------|
| `App.jsx` | Root router — all 6 routes defined here |
| `components/Navbar.jsx` | Sticky, transparent-on-hero navbar |
| `components/Footer.jsx` | Full footer with links & contact |
| `components/PhotoPlaceholder.jsx` | Reusable image slot (swap with `<img>`) |
| `components/ProductCard.jsx` | Store product card with WhatsApp buy |
| `pages/Home.jsx` | Landing page with hero, stats, quick links |
| `pages/About.jsx` | Company profile, founder bio, team grid |
| `pages/Projects.jsx` | Abuja fish farm + Jos orchard + events |
| `pages/Store.jsx` | Product grid with category filter |
| `pages/Records.jsx` | Live farm data table from Google Sheets |
| `pages/Admin.jsx` | PIN-protected dashboard with sub-panels |

---

## 🖼️ Replacing Photo Placeholders

Search the project for `[Add Photo Here:` to find every image slot.

Each placeholder is a `<PhotoPlaceholder>` component:

```jsx
// Before (placeholder)
<PhotoPlaceholder label="Hero Farm Background" height="h-96" icon="🌾" />

// After (your real image)
<img
  src="/images/hero-farm.jpg"
  alt="Doha Prime Ventures farm background"
  className="w-full h-96 object-cover rounded-xl"
/>
```

Put your images in `public/images/` and reference them as `/images/filename.jpg`.

---

## 🔗 Connecting Google Sheets (Farm Records)

1. Create a Google Sheet with these columns:
   `pond | batch | species | stocked | fingerlings | stockingDensity | currentWeight | fcr | mortality | feedType | status`

2. Go to **Extensions → Apps Script** and paste:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const records = data.slice(1).map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
  return ContentService
    .createTextOutput(JSON.stringify({ records }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → **New deployment → Web app → Anyone → Deploy**

4. Copy the URL and replace `SHEET_API_URL` in `src/pages/Records.jsx`

---

## 📱 WhatsApp Integration

Update the phone number in `src/components/ProductCard.jsx`:

```js
const WHATSAPP_NUMBER = '2348012345678' // ← Your WhatsApp number (no +)
```

---

## 🔒 Admin Panel

Default demo PIN: **1234**

To use a real auth system, replace the PIN check in `pages/Admin.jsx` with
your preferred solution (Firebase Auth, Supabase, etc.).

---

## 🎨 Colour System

| Token | Hex | Usage |
|-------|-----|-------|
| `forest-700` | `#245227` | Primary buttons, navbar active |
| `forest-900` | `#18361a` | Dark backgrounds |
| `earth-500` | `#d28332` | Accents, badges |
| `cream` | `#faf6ef` | Page backgrounds |

Customise in `tailwind.config.js` → `theme.extend.colors`.

---

## 🚀 Build for Production

```bash
npm run build
# Output: dist/ folder — deploy to Vercel, Netlify, or any static host
```

For Vercel: `vercel --prod`
For Netlify: drag & drop the `dist/` folder.

---

© 2025 Doha Prime Ventures. Built with 🌿
