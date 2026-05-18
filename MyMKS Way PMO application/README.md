# MyMKS Way PMO application

This folder is the build pack for moving the current PMO prototype into a Power Apps Canvas application with SharePoint as the backend.

The current React app should be treated as the visual and workflow prototype. The production version should be rebuilt in Power Apps Canvas using SharePoint lists, SharePoint document libraries, and Power Automate flows for Outlook and Microsoft Teams.

## Folder contents

- `docs/01-step-by-step-prep.md` - what needs to be prepared before the build starts.
- `docs/02-sharepoint-backend.md` - SharePoint lists, libraries, and fields.
- `docs/03-canvas-screen-map.md` - Power Apps Canvas screens and components.
- `docs/04-fake-canvas-app-plan.md` - how to create a repo-based fake Canvas app for review/demo.
- `docs/05-power-automate-flows.md` - email, Teams, and gateway review automation plan.

## Recommended build order

1. Prepare the SharePoint site, lists, document library, and permissions.
2. Build the fake Canvas app prototype in this folder so the team can sign off the screens.
3. Rebuild the signed-off screens in Power Apps Canvas.
4. Connect Canvas controls to SharePoint data.
5. Add Power Automate flows for PMO review emails and Teams meeting steps.
6. Export and unpack the Power Apps app into `powerapps/exports` for version control.

