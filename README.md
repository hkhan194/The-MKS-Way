# MyMKSWay SharePoint + Power Platform Starter

This workspace now contains a SharePoint Framework React starter for the `MyMKSWay` project intake experience, designed to sit on a SharePoint page and integrate with SharePoint Lists, a document library, and Power Automate.

## Recommended solution shape

- Front end: SharePoint Framework (SPFx) React web part on a modern SharePoint page
- Structured data: SharePoint list called `Projects`
- Documents: SharePoint document library called `Project Documents`
- Automation: Power Automate flow triggered when a project is created or updated
- Optional low-code extension: Power Apps form or admin app for operational management

## What is included

- [docs/sharepoint-information-architecture.md](C:/Users/hkhan/OneDrive%20-%20Moore%20Kingston%20Smith%20LLP/Documents/New%20project/docs/sharepoint-information-architecture.md)
- [docs/power-platform-flow.md](C:/Users/hkhan/OneDrive%20-%20Moore%20Kingston%20Smith%20LLP/Documents/New%20project/docs/power-platform-flow.md)
- [spfx/src/webparts/myMksWay/MyMksWayWebPart.ts](C:/Users/hkhan/OneDrive%20-%20Moore%20Kingston%20Smith%20LLP/Documents/New%20project/spfx/src/webparts/myMksWay/MyMksWayWebPart.ts)
- [spfx/src/webparts/myMksWay/components/MyMksWayApp.tsx](C:/Users/hkhan/OneDrive%20-%20Moore%20Kingston%20Smith%20LLP/Documents/New%20project/spfx/src/webparts/myMksWay/components/MyMksWayApp.tsx)
- [spfx/src/webparts/myMksWay/services/ProjectIntakeService.ts](C:/Users/hkhan/OneDrive%20-%20Moore%20Kingston%20Smith%20LLP/Documents/New%20project/spfx/src/webparts/myMksWay/services/ProjectIntakeService.ts)
- [spfx/src/webparts/myMksWay/services/ScoringService.ts](C:/Users/hkhan/OneDrive%20-%20Moore%20Kingston%20Smith%20LLP/Documents/New%20project/spfx/src/webparts/myMksWay/services/ScoringService.ts)

## Local constraint

This machine does not currently have `Node.js`, `npm`, or the SharePoint generator installed, so I could not scaffold and run a full SPFx package here. The code structure and TypeScript components are prepared, but you will need the toolchain before building and packaging.

## Setup once tooling is installed

1. Install the supported Node.js LTS version for your SPFx target.
2. Install the SharePoint generator:
   `npm install @microsoft/generator-sharepoint@latest --global`
3. In a fresh folder, scaffold a React SPFx web part.
4. Replace the generated `src/webparts/myMksWay` files with the files in this workspace.
5. Run `npm install`.
6. Run `gulp serve` or the current SPFx local serve command for the generated project version.

## SharePoint objects to create

- Site page to host the `MyMKSWay` web part
- SharePoint list `Projects`
- SharePoint document library `Project Documents`
- Optional list `Project Templates`
- Optional list `Project Scores Audit`

## Official references used

- [SPFx overview](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- [SPFx development environment setup](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)
- [SPFx 1.22 release notes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.22)
- [SPFx 1.22.1 release notes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.22.1)
- [Power Automate with SharePoint](https://learn.microsoft.com/en-us/power-automate/sharepoint-overview)
- [Building responsive canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/build-responsive-apps)
- [Add responsive screens in canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-scrolling-screen)

## Suggested next implementation step

If you want, I can take the next pass and tailor this to your exact SharePoint site structure by hardening:

- the list column names
- the document sets or folder naming pattern
- the Power Automate flow steps
- the governance scoring questions and weights
