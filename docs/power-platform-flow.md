# Power Platform Flow Design

## Primary flow

Flow name: `MyMKSWay - Project Intake Submission`

Trigger:

- SharePoint `When an item is created or modified` on the `Projects` list

Core actions:

1. Read the new or updated project item
2. If `Document Folder Path` is empty, create a folder in `Project Documents`
3. Copy the required templates into the project folder based on score and data sensitivity
4. Update the project item with the folder path, score, t-shirt size, and governance route
5. Send confirmation to the project manager and sponsor
6. If governance route is `Full Board`, create an approval task or escalation

## Scoring responsibility

Two workable options:

- App-driven scoring:
  The SPFx app calculates score instantly for the user and saves the result to SharePoint.

- Flow-driven scoring:
  Power Automate recalculates score after submission for a controlled server-side outcome.

Recommended first version:

- Calculate score in the SPFx app for immediate UX
- Recalculate or validate in Power Automate for governance integrity

## Template routing rules

- Always provide `Simple project brief` and `Business case`
- Add `Risk assessment` when score is 50 or above
- Add `Data/privacy checklist` when `Sensitive Data = Yes`
- Add `Delivery plan` and `Benefits tracker` when t-shirt size is `Large`

## Optional second flow

Flow name: `MyMKSWay - Document Completion Reminder`

Trigger:

- Scheduled flow each weekday morning

Actions:

1. Find submitted projects missing required documents
2. Notify the project manager
3. Update a reminder count or last reminder date

## Optional Power Apps use

Power Apps fits well for:

- an admin maintenance app for project templates
- a PMO triage app for reviewing and updating governance outcomes
- a mobile-friendly operational app for approvers

SPFx still makes sense as the primary homepage experience because it embeds cleanly into SharePoint and gives more control over the landing page UI.
