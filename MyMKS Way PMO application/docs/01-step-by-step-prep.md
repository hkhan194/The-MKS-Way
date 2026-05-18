# Step-by-step preparation

Use this checklist before the Canvas app build starts.

## Step 1 - Confirm app scope

- Confirm the app name: `MyMKS Way PMO application`.
- Confirm this is a Power Apps Canvas app.
- Confirm SharePoint is the backend for project data and lifecycle documents.
- Confirm the current React app is the design and workflow reference only.
- Confirm the first production build covers homepage, project details, lifecycle governance, required documents, and PMO review.

## Step 2 - Confirm user roles

- PMO admin: can update lifecycle status, approve gateway review, mark not ready, and manage templates.
- Submitter: can create or submit a project and upload documents.
- Project manager: can update project details and lifecycle documents.
- Sponsor: can view project and gateway status.
- Viewer: can view approved project information only.

## Step 3 - Prepare SharePoint

- Create or confirm the SharePoint site for the PMO app.
- Create the SharePoint lists in `02-sharepoint-backend.md`.
- Create the document library structure for lifecycle files.
- Confirm permissions for PMO, submitters, project managers, and sponsors.
- Confirm whether document templates live in the same library or a separate templates library.

## Step 4 - Prepare Microsoft 365 integration

- Confirm the shared mailbox or sender account for PMO emails.
- Confirm whether Teams notifications go to a channel, chat, or individual submitter.
- Confirm whether meeting invites are created automatically now or only drafted first.
- Confirm whether calendar lookup will be added later through Microsoft Graph or Copilot.

## Step 5 - Prepare data migration

- List the current projects that should be loaded into SharePoint.
- Confirm project fields: project name, owner, sponsor, department, objective, status, lifecycle phase, and completion percentage.
- Confirm existing submitted documents and where they should be stored.
- Confirm whether old prototype-only records should be migrated or ignored.

## Step 6 - Build the fake Canvas app first

- Create a repo-based mock that visually behaves like the Power Apps Canvas version.
- Use Canvas-style naming for screens, containers, galleries, buttons, and variables.
- Keep the mock close to the real app layout, but do not pretend it is an actual `.msapp`.
- Use the fake Canvas app for stakeholder walkthrough and sprint planning.

## Step 7 - Build the real Canvas app

- Create the Canvas app in Power Apps.
- Connect to the SharePoint lists and document library.
- Recreate the signed-off screens and components.
- Add formulas for filters, status updates, uploads, and PMO review.
- Connect buttons to Power Automate flows.

## Step 8 - Test and package

- Test with PMO, submitter, project manager, and sponsor users.
- Test document upload, review status, email draft, Teams message, and permissions.
- Export the Canvas app.
- Unpack the app export into the repository for source control.

