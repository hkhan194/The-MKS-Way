import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./MyMksWayApp.module.scss";
import {
  IMyMksWayAppProps,
  IProjectFormValues,
  IProjectOutcome,
  IProjectSummary,
} from "./types";
import { ProjectIntakeService } from "../services/ProjectIntakeService";
import { ScoringService } from "../services/ScoringService";

const initialFormValues: IProjectFormValues = {
  projectName: "",
  projectTitle: "",
  status: "Draft",
  projectManager: "",
  primarySponsor: "",
  department: "Technology",
  budgetBand: "low",
  timeline: "short",
  teamImpact: "single",
  sensitiveData: "no",
  brief: "",
};

export const MyMksWayApp: React.FC<IMyMksWayAppProps> = ({ siteUrl }) => {
  const [projects, setProjects] = useState<IProjectSummary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IProjectFormValues>(initialFormValues);
  const [outcome, setOutcome] = useState<IProjectOutcome | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const service = new ProjectIntakeService(siteUrl);
    service.getProjects().then(setProjects).catch(() => setProjects([]));
  }, [siteUrl]);

  useEffect(() => {
    if (formValues.projectName && formValues.projectTitle && formValues.projectManager && formValues.primarySponsor && formValues.brief) {
      setOutcome(ScoringService.calculate(formValues));
    } else {
      setOutcome(null);
    }
  }, [formValues]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const service = new ProjectIntakeService(siteUrl);
      const created = await service.submitProject(formValues);
      setProjects((current) => [created, ...current]);
      setFormValues(initialFormValues);
      setOutcome(null);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandRow}>
          <div className={styles.brandMark}>MKS</div>
          <div>
            <div>Project Intake</div>
            <h2>MyMKSWay</h2>
          </div>
        </div>

        <button className={`${styles.navLink} ${styles.activeLink}`}>Homepage</button>
        <button className={styles.navLink}>Settings</button>
      </aside>

      <main className={styles.main}>
        <section className={styles.topbar}>
          <div>
            <div>Portfolio overview</div>
            <h1>Project Portfolio</h1>
          </div>
          <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
            New Project
          </button>
        </section>

        <section className={styles.hero}>
          <div>
            <div>Responsive SharePoint experience</div>
            <h3>Capture a brief, route the right documents, and prepare governance automatically.</h3>
            <p>
              This SPFx web part is designed to sit on a SharePoint page and hand work off to SharePoint lists,
              document libraries, and Power Automate.
            </p>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricCard}>
              <div>Primary storage</div>
              <strong>SharePoint</strong>
            </div>
            <div className={styles.metricCard}>
              <div>Workflow engine</div>
              <strong>Power Automate</strong>
            </div>
          </div>
        </section>

        <section className={styles.portfolio}>
          <h3>Project Portfolio</h3>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Project Manager</th>
                  <th>Primary Sponsor</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.projectName}</td>
                    <td>{project.projectTitle}</td>
                    <td>
                      <span className={styles.statusPill}>{project.status}</span>
                    </td>
                    <td>{project.projectManager}</td>
                    <td>{project.primarySponsor}</td>
                    <td>{project.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.cardList}>
            {projects.map((project) => (
              <article className={styles.projectCard} key={`card-${project.id}`}>
                <div>{project.projectName}</div>
                <h4>{project.projectTitle}</h4>
                <p>
                  <span className={styles.statusPill}>{project.status}</span>
                </p>
                <p>Project Manager: {project.projectManager}</p>
                <p>Primary Sponsor: {project.primarySponsor}</p>
                <p>Department: {project.department}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalPanel}>
            <div className={styles.topbar}>
              <div>
                <div>New project</div>
                <h3>Project Brief</h3>
              </div>
              <button className={styles.secondaryButton} onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Project Name</span>
                  <input name="projectName" value={formValues.projectName} onChange={onChange} required />
                </label>

                <label className={styles.field}>
                  <span>Project Title</span>
                  <input name="projectTitle" value={formValues.projectTitle} onChange={onChange} required />
                </label>

                <label className={styles.field}>
                  <span>Project Manager</span>
                  <input name="projectManager" value={formValues.projectManager} onChange={onChange} required />
                </label>

                <label className={styles.field}>
                  <span>Primary Sponsor</span>
                  <input name="primarySponsor" value={formValues.primarySponsor} onChange={onChange} required />
                </label>

                <label className={styles.field}>
                  <span>Department</span>
                  <select name="department" value={formValues.department} onChange={onChange}>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="People">People</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Status</span>
                  <select name="status" value={formValues.status} onChange={onChange}>
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="In Review">In Review</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Estimated Budget</span>
                  <select name="budgetBand" value={formValues.budgetBand} onChange={onChange}>
                    <option value="low">Under 25k</option>
                    <option value="medium">25k - 100k</option>
                    <option value="high">Over 100k</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Delivery Timeline</span>
                  <select name="timeline" value={formValues.timeline} onChange={onChange}>
                    <option value="short">0-3 months</option>
                    <option value="medium">3-6 months</option>
                    <option value="long">6+ months</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Impacted Teams</span>
                  <select name="teamImpact" value={formValues.teamImpact} onChange={onChange}>
                    <option value="single">Single team</option>
                    <option value="multi">Multiple teams</option>
                    <option value="enterprise">Firm-wide</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Sensitive Data</span>
                  <select name="sensitiveData" value={formValues.sensitiveData} onChange={onChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Simple Project Brief</span>
                  <textarea name="brief" rows={4} value={formValues.brief} onChange={onChange} required />
                </label>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div>Project score</div>
                  <strong>{outcome ? outcome.score : "-"}</strong>
                </div>
                <div className={styles.infoCard}>
                  <div>T-shirt size</div>
                  <strong>{outcome ? outcome.size : "-"}</strong>
                </div>
                <div className={styles.infoCard}>
                  <div>Governance route</div>
                  <strong>{outcome ? outcome.route : "Complete the brief"}</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h4>Required documents</h4>
                <ul className={styles.documentList}>
                  {(outcome?.documents ?? ["Complete the form to see required documents"]).map((documentName) => (
                    <li key={documentName}>{documentName}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button type="button" className={styles.secondaryButton} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
