import { IProjectFormValues, IProjectSummary } from "../components/types";
import { ScoringService } from "./ScoringService";

export class ProjectIntakeService {
  public constructor(private readonly siteUrl: string) {}

  public async getProjects(): Promise<IProjectSummary[]> {
    void this.siteUrl;

    // Placeholder seed data until the SharePoint REST or PnP integration is wired in.
    return Promise.resolve([
      {
        id: 1,
        projectName: "Digital Onboarding",
        projectTitle: "Client onboarding redesign",
        status: "In Review",
        projectManager: "A. Patel",
        primarySponsor: "Head of Operations",
        department: "Operations",
        score: 64,
        tShirtSize: "Medium",
      },
      {
        id: 2,
        projectName: "Finance Insight Hub",
        projectTitle: "Portfolio reporting upgrade",
        status: "Submitted",
        projectManager: "L. Green",
        primarySponsor: "Finance Director",
        department: "Finance",
        score: 52,
        tShirtSize: "Medium",
      },
    ]);
  }

  public async submitProject(values: IProjectFormValues): Promise<IProjectSummary> {
    const outcome = ScoringService.calculate(values);

    // Replace this with a SharePoint list item create call.
    return Promise.resolve({
      id: Date.now(),
      projectName: values.projectName,
      projectTitle: values.projectTitle,
      status: values.status,
      projectManager: values.projectManager,
      primarySponsor: values.primarySponsor,
      department: values.department,
      score: outcome.score,
      tShirtSize: outcome.size,
    });
  }
}
