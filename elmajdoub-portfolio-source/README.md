# Elmajdoub — Frontend Portfolio

A responsive personal portfolio built with React, Tailwind CSS v4, and Vite. An editorial layout, a custom SVG hero illustration, and restrained motion keep the focus on the person and their work.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist` folder to a static host. This is a single page with section anchors, so no router configuration is needed.

## Make it yours

Edit `src/profile.js` to update your name, about text, email, GitHub, LinkedIn, location, and projects. Empty social links stay hidden; the contact area shows a clear pending message until an email is provided. Replace planned project rows only when you have actual work to show. Update the title and description in `index.html` as needed.

## Features

- Responsive desktop and mobile layouts
- Accessible mobile navigation and native project dialog
- Keyboard focus styles, skip link, and reduced motion support
- Scroll reveals, hero entrance, and subtle pointer interaction
- No external image, font, or API dependency
- Honest project status, with no invented experience or testimonials

## Project structure

`src/main.jsx` contains the React components. `src/profile.js` is the editable content. `src/styles.css` combines Tailwind with custom responsive styles. `public/favicon.svg` is the local favicon.

## Before applying

1. Add your real email and GitHub URL.
2. Build the two planned projects, then add their real demo and repository links.
3. Be ready to explain each component, state variable, event handler, and responsive layout.
4. Add screenshots and project-specific README files to your repositories.

This portfolio was built with AI assistance. Review and understand the code before presenting it in an interview.
