# Canvas screen map

This maps the current prototype to Power Apps Canvas screens and components.

## Screen: scrHome

Purpose: project list and entry point.

Controls:

- `galProjects` - gallery connected to `PMO Projects`.
- `txtSearchProjects` - search input.
- `ddStatusFilter` - status filter.
- `ddDepartmentFilter` - department filter.
- `btnProjectDetails` - opens project details.
- `btnProjectLifecycle` - opens lifecycle governance view.

Expected behaviour:

- Selecting `Details` opens the project details screen or panel.
- Selecting `Lifecycle` opens the lifecycle screen for the selected project.
- Filters use SharePoint-backed project fields.

## Screen: scrProjectDetails

Purpose: normal project information view.

Controls:

- Project summary container.
- Owner and sponsor details.
- Business objective.
- Project status and completion.
- Submitted document summary.

Expected behaviour:

- This screen remains separate from lifecycle governance.
- PMO can view project context without changing lifecycle review data.

## Screen: scrLifecycle

Purpose: lifecycle governance and gateway readiness.

Controls:

- `conCurrentPhase` - prominent current phase box.
- `conLifecycleFlow` - Initiation, Planning, Delivery, Closure, and Gateway 4.
- `galGatewayReadiness` - checklist for selected phase.
- `galWhatComesNext` - next steps for selected phase.
- `galRequiredDocuments` - required files for selected phase.
- `btnAdditionalDocument` - adds extra upload row.
- `btnSubmitForGatewayReview` - enabled only when required documents are uploaded.
- `btnApprovedForGatewayReview` - PMO approval action.
- `btnNotReadyForReview` - PMO return action.

Expected behaviour:

- Current phase is always visually obvious.
- Selected phase changes readiness, next steps, and documents.
- Submit is enabled by required document upload status only.
- PMO buttons update the review status and trigger Outlook/Teams automation.

## Reusable component: cmpLifecyclePhase

Inputs:

- `PhaseName`
- `GatewayName`
- `IsCurrent`
- `IsSelected`
- `PhaseStatus`

Outputs:

- `OnSelectPhase`

## Reusable component: cmpRequiredDocument

Inputs:

- `DocumentLabel`
- `DocumentDescription`
- `IsUploaded`
- `DocumentLink`
- `IsReadOnly`

Outputs:

- `OnUpload`
- `OnOpenDocument`

## Reusable component: cmpPMOReview

Inputs:

- `ReviewStatus`
- `Project`
- `Phase`
- `Submitter`

Outputs:

- `OnApprovedForGatewayReview`
- `OnNotReadyForReview`

