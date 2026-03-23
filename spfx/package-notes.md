# SPFx Packaging Notes

Because the local machine does not currently include Node.js or the SPFx generator, this folder contains source files rather than a generator-complete package.

## Best way to turn this into a running SharePoint solution

1. Install Node.js LTS supported by your target SPFx version.
2. Run:
   `npm install @microsoft/generator-sharepoint@latest --global`
3. Scaffold a new SharePoint Framework React web part named `myMksWay`.
4. Copy the source files from this folder into the generated project:
   - `src/webparts/myMksWay/MyMksWayWebPart.ts`
   - `src/webparts/myMksWay/components/*`
   - `src/webparts/myMksWay/services/*`
5. Run `npm install`.
6. Use the generated config and manifest files from the scaffolded project as the packaging baseline.

## Why I chose this approach

SPFx packaging has version-sensitive config files. Generating those with the official toolchain is safer than hand-authoring every build and package artifact in an environment where the toolchain is missing.
