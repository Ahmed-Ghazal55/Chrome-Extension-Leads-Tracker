# Chrome Extension — Leads Tracker

A legacy Manifest V3 Chrome extension to save web links manually or from the active browser tab.

## Status
**Learning/maintenance project — not yet reviewed for Chrome Web Store publication.** The popup is HTML, CSS and vanilla JavaScript. Saved URLs live in `localStorage` under `myLeads`; this is intentionally retained for existing saved data.

## Load locally
1. Review the source before installation, especially any downloaded archives.
2. Open `chrome://extensions`, enable **Developer mode**.
3. Select **Load unpacked**, then choose the repository folder containing `manifest.json`.
4. Test saving a valid https URL, saving an active web tab, reopening the popup, and double-clicking **Delete All** (confirmation required).

## Security improvements already applied
- URLs restricted to http/https and normalized through the URL parser.
- The list renders with DOM nodes and `textContent` rather than interpolating user input into `innerHTML`.
- External links use `noopener noreferrer`.
- Deleting links removes only the extension's own storage key.
- Previous links are read from the original `myLeads` storage key.

## Important safety note
The directory `inaccordantly/` contains ZIP files that have **not been verified**. Do **not** execute or distribute them until their provenance and contents have been audited independently. They are not required to load the unpacked extension.

## Maintenance roadmap
1. Audit ZIP provenance, Git history, account security, permissions and dependency/license provenance.
2. Manually verify popup flows and error handling in Chrome; add repeatable browser tests.
3. Separate UI and persistence modules; consider `chrome.storage.local` with one-time migration of old data.
4. Add search, tags, import/export with schema validation, empty states and accessible controls.
5. Review minimal permissions, extension icons, Content Security Policy and store policy compliance.
6. Add screenshots and a release checklist before publishing.

No Chrome Web Store listing or full automated testing has been verified.
