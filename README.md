# Haven Coming Soon Static Bundle

This folder is upload-ready for a standard Bluehost-style web server.

## Contents

- `index.html` - main page
- `styles.css` - all styling, no external dependencies
- `script.js` - mobile nav, reveal motion, and waitlist form behavior
- `assets/` - copied Haven logo, favicon, and supporting imagery

## Publish

Upload the full contents of this folder to your site root or to a subdirectory on the server. The page uses only relative paths.

## Waitlist Integration

The waitlist form is intentionally vendor-neutral.

- Placeholder mode:
  - Keep `action=""`
  - Keep `data-form-endpoint=""`
  - Keep `data-submit-mode="placeholder"`
- Native provider form post:
  - Set `action="https://your-provider-endpoint"`
  - Leave `data-submit-mode` as `placeholder` or remove it
- AJAX-style inline submit:
  - Set `data-form-endpoint="https://your-provider-endpoint"`
  - Set `data-submit-mode="fetch"`
  - Use a provider that allows browser-side POST requests with CORS

The form already includes a hidden source field:

- `source=coming-soon-bluehost`

## Notes

- No build step is required.
- No npm packages, React, Next.js, or Tailwind are used here.
- If you want the page at the domain root, make sure `index.html` sits at the server root after upload.
