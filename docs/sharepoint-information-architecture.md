# SharePoint Information Architecture

## Site assets

- SharePoint site page: `MyMKSWay Home`
- SharePoint list: `Projects`
- SharePoint document library: `Project Documents`
- Optional list: `Project Templates`

## Projects list columns

Use internal names that stay stable after creation.

| Display name | Type | Required | Notes |
| --- | --- | --- | --- |
| Project Name | Single line of text | Yes | Short portfolio name |
| Project Title | Single line of text | Yes | Friendly project title |
| Status | Choice | Yes | Draft, Submitted, In Review, Approved, Rejected |
| Project Manager | Person or Group | Yes | Single person |
| Primary Sponsor | Person or Group | Yes | Single person |
| Department | Choice | Yes | Technology, Finance, Operations, People, Marketing |
| Brief | Multiple lines of text | Yes | Simple business brief |
| Budget Band | Choice | Yes | Low, Medium, High |
| Timeline | Choice | Yes | Short, Medium, Long |
| Team Impact | Choice | Yes | Single, Multi, Enterprise |
| Sensitive Data | Yes/No | Yes | Drives extra controls |
| Score | Number | No | Calculated by app/flow |
| T-Shirt Size | Choice | No | Small, Medium, Large |
| Governance Route | Choice | No | Fast-track, Standard, Full Board |
| Document Folder Path | Single line of text | No | SharePoint folder URL |
| Submission Date | Date and Time | No | Set on submit |

## Document library design

Library name: `Project Documents`

Recommended folder pattern:

`/Project Documents/{ProjectID}-{ProjectName}`

Recommended starter folder content:

- `01-Templates`
- `02-Working`
- `03-Submitted`

Recommended templates:

- Simple project brief
- Business case
- Risk assessment
- Data/privacy checklist
- Delivery plan
- Benefits tracker

## Recommended permissions model

- Project managers: contribute to their folders
- PMO / governance team: edit all items
- Site owners: full control
- Wider audience: read-only to approved portfolio views, not document working files

## Why this shape works

- SharePoint list gives you a strong metadata backbone for reporting and filtering
- Document library keeps project files in one governed place
- Power Automate can create folders, copy templates, and notify reviewers
- SPFx gives you a modern responsive front end inside SharePoint
