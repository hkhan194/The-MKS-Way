# Fake Canvas app plan

The fake Canvas app is a repo-based prototype that looks and behaves like the intended Power Apps Canvas app. It is useful for review, sprint planning, and stakeholder sign-off before the real Power Apps build.

## Important note

This is not a real `.msapp` file. It is a mock built with web files, using Canvas-style naming and layout conventions so the real Power Apps build is easier to follow.

## What to build in the fake app

- `scrHome` style homepage with project gallery.
- `scrProjectDetails` style project detail panel.
- `scrLifecycle` style lifecycle governance view.
- Current phase card above lifecycle flow.
- Gateway readiness and what comes next sections.
- Required documents with plain labels.
- Additional document button.
- Submit for Gateway Review button.
- PMO review buttons: Approved for Gateway Review and Not ready for review.
- Outlook email draft behaviour with SharePoint links.

## Suggested fake app folder

```text
fake-canvas-app/
  index.html
  styles.css
  app.js
  data/
    sample-projects.json
    lifecycle-documents.json
```

## Naming convention

Use Power Apps style names even in the fake app:

- Screens: `scrHome`, `scrProjectDetails`, `scrLifecycle`
- Containers: `conCurrentPhase`, `conLifecycleFlow`, `conPMOReview`
- Galleries: `galProjects`, `galRequiredDocuments`
- Buttons: `btnApprovedForGatewayReview`, `btnNotReadyForReview`
- Variables: `varSelectedProject`, `varSelectedPhase`, `varReviewStatus`

## Acceptance criteria

- The fake app should show the same layout and workflow as the intended Canvas app.
- It should not rely on React-specific terminology in user-facing text.
- It should be simple enough for PMO users to review without knowing the implementation.
- It should make the eventual Power Apps screen build obvious.

