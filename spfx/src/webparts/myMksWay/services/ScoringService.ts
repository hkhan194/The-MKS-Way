import { IProjectFormValues, IProjectOutcome } from "../components/types";

const baselineDocuments: string[] = [
  "Simple project brief",
  "Business case template",
];

const riskDocuments: string[] = [
  "Risk assessment template",
  "Governance review checklist",
];

const dataDocuments: string[] = [
  "Data/privacy checklist",
  "Information security review form",
];

const largeProjectDocuments: string[] = [
  "Detailed delivery plan",
  "Benefits tracking template",
];

export class ScoringService {
  public static calculate(values: IProjectFormValues): IProjectOutcome {
    let score: number = 20;

    if (values.budgetBand === "medium") score += 15;
    if (values.budgetBand === "high") score += 30;

    if (values.timeline === "medium") score += 10;
    if (values.timeline === "long") score += 20;

    if (values.teamImpact === "multi") score += 15;
    if (values.teamImpact === "enterprise") score += 25;

    if (values.sensitiveData === "yes") score += 20;

    if (values.department === "Technology") score += 10;
    if (values.department === "Operations") score += 6;

    let size: IProjectOutcome["size"] = "Small";
    if (score >= 50 && score < 80) {
      size = "Medium";
    } else if (score >= 80) {
      size = "Large";
    }

    let route: IProjectOutcome["route"] = "Fast-track review";
    if (size === "Medium") {
      route = "Standard governance review";
    } else if (size === "Large") {
      route = "Full governance board review";
    }

    const documents: string[] = [...baselineDocuments];

    if (score >= 50) {
      documents.push(...riskDocuments);
    }

    if (values.sensitiveData === "yes") {
      documents.push(...dataDocuments);
    }

    if (size === "Large") {
      documents.push(...largeProjectDocuments);
    }

    return {
      score,
      size,
      route,
      documents,
    };
  }
}
