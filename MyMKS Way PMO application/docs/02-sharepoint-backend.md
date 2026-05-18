# SharePoint backend

This is the recommended minimum SharePoint backend for the Canvas app.

## List: PMO Projects

Purpose: stores the main project record shown on the homepage and details screen.

Columns:

- `Title` - project name.
- `ProjectCode` - optional unique project reference.
- `Department` - choice.
- `ProjectType` - choice.
- `ProjectObjective` - multiple lines of text.
- `ProjectManager` - person.
- `PrimarySponsor` - person.
- `Submitter` - person.
- `LifecyclePhase` - choice: Initiation, Planning, Delivery, Closure.
- `ProjectStatus` - choice: Draft, Submitted, Planning, Active, On hold, Completed.
- `CompletionPercentage` - number.
- `TShirtSize` - choice.
- `CreatedByApp` - person.
- `LastLifecycleReviewDate` - date/time.

## List: PMO Lifecycle Reviews

Purpose: stores each phase review and PMO decision.

Columns:

- `Title` - generated label, for example `Project name - Planning`.
- `Project` - lookup to PMO Projects.
- `Phase` - choice: Initiation, Planning, Delivery, Closure.
- `Gateway` - choice: Gateway 1, Gateway 2, Gateway 3, Gateway 4 / Closure Gateway.
- `ReviewStatus` - choice: Not submitted, Submitted for Gateway Review, Approved for Gateway Review, Not ready for review.
- `SubmittedBy` - person.
- `SubmittedOn` - date/time.
- `ReviewedBy` - person.
- `ReviewedOn` - date/time.
- `PMOFeedback` - multiple lines of text.

## List: PMO Required Documents

Purpose: defines which documents are required for each lifecycle phase.

Columns:

- `Title` - plain document label, for example `Status Pack`.
- `Phase` - choice.
- `DocumentDescription` - short text.
- `IsRequired` - yes/no.
- `SortOrder` - number.
- `TemplateLink` - hyperlink.

## Document library: PMO Project Documents

Purpose: stores uploaded lifecycle documents.

Recommended folder structure:

```text
PMO Project Documents/
  Project Name/
    Initiation/
    Planning/
    Delivery/
    Closure/
```

Recommended metadata:

- `Project` - lookup to PMO Projects.
- `Phase` - choice.
- `DocumentType` - choice or lookup to PMO Required Documents.
- `ReviewStatus` - choice.
- `UploadedBy` - person.
- `UploadedForGateway` - choice.
- `IsAdditionalDocument` - yes/no.

## List: PMO App Settings

Purpose: stores configurable labels and options without editing the app.

Columns:

- `Title` - setting key.
- `Value` - text.
- `SettingGroup` - choice.
- `IsActive` - yes/no.

