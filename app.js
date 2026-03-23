const projects = [
  {
    projectName: "Digital Onboarding",
    projectTitle: "Client onboarding redesign",
    status: "In Review",
    projectManager: "A. Patel",
    primarySponsor: "Head of Operations",
    department: "Operations",
  },
  {
    projectName: "Finance Insight Hub",
    projectTitle: "Portfolio reporting upgrade",
    status: "Submitted",
    projectManager: "L. Green",
    primarySponsor: "Finance Director",
    department: "Finance",
  },
  {
    projectName: "People Pulse",
    projectTitle: "Employee engagement improvements",
    status: "Draft",
    projectManager: "S. Ahmed",
    primarySponsor: "Chief People Officer",
    department: "People",
  },
];

const requiredDocsMap = {
  baseline: [
    "Simple project brief",
    "Business case template",
  ],
  risk: [
    "Risk assessment template",
    "Governance review checklist",
  ],
  data: [
    "Data/privacy impact checklist",
    "Information security review form",
  ],
  large: [
    "Detailed delivery plan",
    "Benefits tracking template",
  ],
};

const projectTableBody = document.querySelector("#projectTableBody");
const projectCards = document.querySelector("#projectCards");
const cardTemplate = document.querySelector("#projectCardTemplate");

const modal = document.querySelector("#projectModal");
const openModalBtn = document.querySelector("#openModalBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const projectForm = document.querySelector("#projectForm");
const previewBtn = document.querySelector("#previewBtn");

const nextStepsList = document.querySelector("#nextStepsList");
const scoreValue = document.querySelector("#scoreValue");
const sizeValue = document.querySelector("#sizeValue");
const routeValue = document.querySelector("#routeValue");

function renderProjects() {
  projectTableBody.innerHTML = "";
  projectCards.innerHTML = "";

  projects.forEach((project) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${project.projectName}</td>
      <td>${project.projectTitle}</td>
      <td><span class="status-pill">${project.status}</span></td>
      <td>${project.projectManager}</td>
      <td>${project.primarySponsor}</td>
      <td>${project.department}</td>
    `;
    projectTableBody.appendChild(row);

    const card = cardTemplate.content.cloneNode(true);
    card.querySelector(".project-name").textContent = project.projectName;
    card.querySelector(".project-title").textContent = project.projectTitle;
    card.querySelector(".status-pill").textContent = project.status;
    card.querySelector(".project-manager").textContent = project.projectManager;
    card.querySelector(".primary-sponsor").textContent = project.primarySponsor;
    card.querySelector(".department").textContent = project.department;
    projectCards.appendChild(card);
  });
}

function openModal() {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function getFormValues() {
  return Object.fromEntries(new FormData(projectForm).entries());
}

function calculateProjectOutcome(values) {
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

  const documents = [...requiredDocsMap.baseline];

  if (score >= 50) {
    documents.push(...requiredDocsMap.risk);
  }

  if (values.sensitiveData === "yes") {
    documents.push(...requiredDocsMap.data);
  }

  if (size === "Large") {
    documents.push(...requiredDocsMap.large);
  }

  return {
    score,
    size,
    route,
    documents,
  };
}

function updatePreview() {
  const values = getFormValues();
  const requiredFields = [
    "projectName",
    "projectTitle",
    "projectManager",
    "primarySponsor",
    "department",
    "status",
    "budgetBand",
    "timeline",
    "teamImpact",
    "sensitiveData",
    "brief",
  ];

  const missingRequired = requiredFields.some((field) => !values[field]);
  if (missingRequired) {
    scoreValue.textContent = "-";
    sizeValue.textContent = "-";
    routeValue.textContent = "Complete the form";
    nextStepsList.innerHTML = "<li>Complete all mandatory fields to unlock required documents and route guidance.</li>";
    return null;
  }

  const outcome = calculateProjectOutcome(values);
  scoreValue.textContent = String(outcome.score);
  sizeValue.textContent = outcome.size;
  routeValue.textContent = outcome.route;

  nextStepsList.innerHTML = outcome.documents
    .map((doc) => `<li>${doc}</li>`)
    .join("");

  return outcome;
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeModal();
  }
});

projectForm.addEventListener("input", updatePreview);
previewBtn.addEventListener("click", updatePreview);

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = getFormValues();
  const outcome = updatePreview();

  if (!outcome) {
    projectForm.reportValidity();
    return;
  }

  projects.unshift({
    projectName: values.projectName,
    projectTitle: values.projectTitle,
    status: values.status,
    projectManager: values.projectManager,
    primarySponsor: values.primarySponsor,
    department: values.department,
  });

  renderProjects();
  closeModal();
  projectForm.reset();
  updatePreview();

  window.alert(
    `Project submitted.\nScore: ${outcome.score}\nT-shirt size: ${outcome.size}\nRoute: ${outcome.route}`
  );
});

renderProjects();
