# Power Automate flows

Use Power Automate for Outlook, Teams, and future calendar automation.

## Flow: PMO Gateway Approved

Trigger:

- SharePoint item modified in `PMO Lifecycle Reviews`.
- `ReviewStatus` changes to `Approved for Gateway Review`.

Actions:

- Get project record from `PMO Projects`.
- Get uploaded documents from `PMO Project Documents`.
- Send Outlook email to submitter.
- Include SharePoint folder link and submitted document links.
- Ask submitter for suitable time slots for the gateway review meeting.
- Optional: post Teams message to PMO channel.

Email wording:

```text
Hi [Submitter],

PMO has approved [Project Name] for [Gateway].

SharePoint documents:
[Document links]

Could you please send a few suitable time slots for the gateway review meeting?

Once we have availability, we can send the meeting invite through Outlook or Microsoft Teams.
```

## Flow: PMO Not Ready

Trigger:

- SharePoint item modified in `PMO Lifecycle Reviews`.
- `ReviewStatus` changes to `Not ready for review`.

Actions:

- Get project record.
- Send Outlook email to submitter.
- Include SharePoint folder link.
- Ask submitter to update documents and resubmit.
- Optional: post Teams message.

Email wording:

```text
Hi [Submitter],

PMO has reviewed [Project Name] for the [Phase] phase and it is not ready for gateway review yet.

Please update the required documents in SharePoint and resubmit when ready.

Project folder:
[SharePoint link]
```

## Flow: Create Gateway Meeting

Future option:

- Trigger from an approved gateway review.
- Use Microsoft 365/Graph/Copilot capability to check approver availability.
- Create Outlook meeting invite.
- Add Microsoft Teams meeting link.
- Attach or link SharePoint documents.

Keep this out of the first minimum build unless the team confirms calendar permissions and governance.

