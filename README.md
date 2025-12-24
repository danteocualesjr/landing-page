# GTM AI Landing Page

A professional, high-converting landing page for GTM AI product launch with waitlist signup functionality.

## Features

- Full-screen hero section with compelling value proposition
- Email signup form with validation
- Success state with animated checkmark
- Responsive design for all devices
- Clean, modern UI optimized for conversions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Backend Integration

Currently, the email submission uses a mock API call. To integrate with your backend:

1. Open `src/components/LandingPage.jsx`
2. Find the `handleSubmit` function
3. Replace the mock API call with your actual endpoint:

```javascript
await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
```

## Tech Stack

- React 18
- Vite
- Vanilla CSS

# landing-page








