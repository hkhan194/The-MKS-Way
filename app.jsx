const { useMemo, useState } = React;

const initialProjects = [
  {
    id: 1,
    projectName: "Digital Onboarding",
    projectTitle: "Client onboarding redesign",
    status: "In Review",
    projectManager: "A. Patel",
    primarySponsor: "Head of Operations",
    department: "Operations",
    score: 64,
    size: "Medium",
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
    size: "Medium",
  },
  {
    id: 3,
    projectName: "People Pulse",
    projectTitle: "Employee engagement improvements",
    status: "Draft",
    projectManager: "S. Ahmed",
    primarySponsor: "Chief People Officer",
    department: "People",
    score: 34,
    size: "Small",
  },
];

const defaultForm = {
  projectName: "",
  projectTitle: "",
  projectManager: "",
  primarySponsor: "",
  department: "",
  status: "",
  budgetBand: "",
  timeline: "",
  teamImpact: "",
  sensitiveData: "",
  brief: "",
};

function calculateOutcome(values) {
  let score = 20;

  if (values.budgetBand === "medium") score += 15;
  if (values.budgetBand === "high") score += 30;
  if (values.timeline === "medium") score += 10;
  if (values.timeline === "long") score += 20;
  if (values.teamImpact === "multi") score += 15;
  if (values.teamImpact === "enterprise") score += 25;
  if (values.sensitiveData === "yes") score += 20;
  if (values.department === "Technology") score += 10;
  if (values.department === "Operations") score += 6;

  let size = "Small";
  if (score >= 50 && score < 80) size = "Medium";
  if (score >= 80) size = "Large";

  let route = "Fast-track review";
  if (size === "Medium") route = "Standard governance review";
  if (size === "Large") route = "Full governance board review";

  const documents = ["Simple project brief", "Business case template"];

  if (score >= 50) {
    documents.push("Risk assessment template", "Governance review checklist");
  }

  if (values.sensitiveData === "yes") {
    documents.push("Data/privacy checklist", "Information security review form");
  }

  if (size === "Large") {
    documents.push("Detailed delivery plan", "Benefits tracking template");
  }

  return { score, size, route, documents };
}

function isComplete(values) {
  return Object.values(values).every(Boolean);
}

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultForm);

  const outcome = useMemo(() => {
    if (!isComplete(formValues)) {
      return null;
    }

    return calculateOutcome(formValues);
  }, [formValues]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isComplete(formValues)) {
      event.currentTarget.reportValidity();
      return;
    }

    const nextOutcome = calculateOutcome(formValues);
    const newProject = {
      id: Date.now(),
      projectName: formValues.projectName,
      projectTitle: formValues.projectTitle,
      status: formValues.status,
      projectManager: formValues.projectManager,
      primarySponsor: formValues.primarySponsor,
      department: formValues.department,
      score: nextOutcome.score,
      size: nextOutcome.size,
    };

    setProjects((current) => [newProject, ...current]);
    setFormValues(defaultForm);
    setIsModalOpen(false);
  };

  const averageScore = Math.round(
    projects.reduce((sum, project) => sum + (project.score || 0), 0) / projects.length
  );

  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">MKS</div>
            <div>
              <p className="eyebrow">Project Intake</p>
              <h1>MyMKSWay</h1>
            </div>
          </div>

          <nav className="nav">
            <button className="nav-link active" type="button">Homepage</button>
            <button className="nav-link" type="button">Settings</button>
          </nav>

          <section className="sidebar-panel">
            <p className="panel-label">Portfolio Health</p>
            <div className="health-stat">
              <strong>{projects.length}</strong>
              <span>Total portfolio items</span>
            </div>
            <div className="health-stat">
              <strong>{projects.filter((project) => project.status !== "Draft").length}</strong>
              <span>Submitted or in review</span>
            </div>
            <div className="health-stat">
              <strong>{averageScore}%</strong>
              <span>Average governance score</span>
            </div>
          </section>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div>
              <p className="eyebrow">Portfolio overview</p>
              <h2>Project Portfolio</h2>
            </div>
            <button className="primary-btn" type="button" onClick={() => setIsModalOpen(true)}>
              New Project
            </button>
          </header>

          <section className="hero-card">
            <div>
              <span className="welcome-strip">React web app prototype</span>
              <h3>Capture the brief once, guide the next steps automatically.</h3>
              <p className="hero-copy">
                This React version gives you the homepage, responsive portfolio view, project intake form,
                required document guidance, and automatic project scoring with t-shirt sizing.
              </p>
            </div>
            <div className="hero-metrics">
              <div className="metric-card">
                <span>Primary target</span>
                <strong>SharePoint</strong>
              </div>
              <div className="metric-card">
                <span>Workflow path</span>
                <strong>Power Platform</strong>
              </div>
            </div>
          </section>

          <section className="portfolio-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Current submissions</p>
                <h3>Project Portfolio</h3>
              </div>
            </div>

            <div className="portfolio-table-wrap">
              <table className="portfolio-table">
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
                      <td><span className="status-pill">{project.status}</span></td>
                      <td>{project.projectManager}</td>
                      <td>{project.primarySponsor}</td>
                      <td>{project.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="project-cards show">
              {projects.map((project) => (
                <article className="project-card" key={`card-${project.id}`}>
                  <div className="project-card-top">
                    <div>
                      <p className="project-name">{project.projectName}</p>
                      <h4 className="project-title">{project.projectTitle}</h4>
                    </div>
                    <span className="status-pill">{project.status}</span>
                  </div>
                  <dl>
                    <div>
                      <dt>Project Manager</dt>
                      <dd>{project.projectManager}</dd>
                    </div>
                    <div>
                      <dt>Primary Sponsor</dt>
                      <dd>{project.primarySponsor}</dd>
                    </div>
                    <div>
                      <dt>Department</dt>
                      <dd>{project.department}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <div className={`modal ${isModalOpen ? "show" : "hidden"}`} aria-hidden={!isModalOpen}>
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <div className="modal-header">
            <div>
              <p className="eyebrow">New project</p>
              <h3 id="modalTitle">Project Brief</h3>
            </div>
            <button className="icon-btn" type="button" aria-label="Close form" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
          </div>

          <form className="project-form" onSubmit={onSubmit}>
            <div className="form-grid">
              <label>
                <span>Project Name *</span>
                <input type="text" name="projectName" value={formValues.projectName} onChange={onChange} required />
              </label>
              <label>
                <span>Project Title *</span>
                <input type="text" name="projectTitle" value={formValues.projectTitle} onChange={onChange} required />
              </label>
              <label>
                <span>Project Manager *</span>
                <input type="text" name="projectManager" value={formValues.projectManager} onChange={onChange} required />
              </label>
              <label>
                <span>Primary Sponsor *</span>
                <input type="text" name="primarySponsor" value={formValues.primarySponsor} onChange={onChange} required />
              </label>
              <label>
                <span>Department *</span>
                <select name="department" value={formValues.department} onChange={onChange} required>
                  <option value="">Select</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="People">People</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </label>
              <label>
                <span>Status *</span>
                <select name="status" value={formValues.status} onChange={onChange} required>
                  <option value="">Select</option>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In Review">In Review</option>
                </select>
              </label>
              <label>
                <span>Estimated Budget *</span>
                <select name="budgetBand" value={formValues.budgetBand} onChange={onChange} required>
                  <option value="">Select</option>
                  <option value="low">Under £25k</option>
                  <option value="medium">£25k - £100k</option>
                  <option value="high">Over £100k</option>
                </select>
              </label>
              <label>
                <span>Delivery Timeline *</span>
                <select name="timeline" value={formValues.timeline} onChange={onChange} required>
                  <option value="">Select</option>
                  <option value="short">0-3 months</option>
                  <option value="medium">3-6 months</option>
                  <option value="long">6+ months</option>
                </select>
              </label>
              <label>
                <span>Impacted Teams *</span>
                <select name="teamImpact" value={formValues.teamImpact} onChange={onChange} required>
                  <option value="">Select</option>
                  <option value="single">Single team</option>
                  <option value="multi">Multiple teams</option>
                  <option value="enterprise">Firm-wide</option>
                </select>
              </label>
              <label>
                <span>Contains Client or Sensitive Data? *</span>
                <select name="sensitiveData" value={formValues.sensitiveData} onChange={onChange} required>
                  <option value="">Select</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>
            </div>

            <label className="full-width">
              <span>Simple Project Brief *</span>
              <textarea
                name="brief"
                rows="4"
                value={formValues.brief}
                onChange={onChange}
                required
                placeholder="Describe the problem, expected outcome, and why this project matters."
              ></textarea>
            </label>

            <section className="guidance-panel">
              <div>
                <p className="eyebrow">Dynamic next steps</p>
                <h4>Required documents and guidance</h4>
              </div>
              <ul className="next-steps-list">
                {(outcome ? outcome.documents : ["Complete the mandatory fields to see the required documents."]).map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </section>

            <section className="template-panel">
              <p className="eyebrow">Future SharePoint path</p>
              <h4>What happens after submit</h4>
              <ul className="template-list">
                <li>Create a project record in SharePoint.</li>
                <li>Create a project folder for all related documents.</li>
                <li>Show the templates the user needs to complete.</li>
                <li>Let users upload the finished Word documents and submit.</li>
              </ul>
            </section>

            <section className="score-panel">
              <div className="score-card">
                <span>Project score</span>
                <strong>{outcome ? outcome.score : "-"}</strong>
              </div>
              <div className="score-card">
                <span>T-shirt size</span>
                <strong>{outcome ? outcome.size : "-"}</strong>
              </div>
              <div className="score-card">
                <span>Recommended route</span>
                <strong>{outcome ? outcome.route : "Complete the form"}</strong>
              </div>
            </section>

            <p className="form-note">
              This screen is now rendered by React. The next step is wiring it to SharePoint and Power Platform.
            </p>

            <div className="form-actions">
              <button className="secondary-btn" type="button" onClick={() => setFormValues(defaultForm)}>
                Clear Form
              </button>
              <button className="primary-btn" type="submit">Submit Project</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
