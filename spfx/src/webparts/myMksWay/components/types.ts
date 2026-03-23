export interface IProjectSummary {
  id: number;
  projectName: string;
  projectTitle: string;
  status: string;
  projectManager: string;
  primarySponsor: string;
  department: string;
  score?: number;
  tShirtSize?: string;
}

export interface IProjectFormValues {
  projectName: string;
  projectTitle: string;
  status: string;
  projectManager: string;
  primarySponsor: string;
  department: string;
  budgetBand: "low" | "medium" | "high";
  timeline: "short" | "medium" | "long";
  teamImpact: "single" | "multi" | "enterprise";
  sensitiveData: "yes" | "no";
  brief: string;
}

export interface IProjectOutcome {
  score: number;
  size: "Small" | "Medium" | "Large";
  route: "Fast-track review" | "Standard governance review" | "Full governance board review";
  documents: string[];
}

export interface IMyMksWayAppProps {
  siteUrl: string;
}
