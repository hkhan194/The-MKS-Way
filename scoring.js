window.ScoringEngine = (() => {
  const rules = {
    scores: {
      budget: {
        under15000: 5,
        "15000to25000": 8,
        "25001to50000": 12,
        "50001to70000": 16,
        "70001to100000": 20,
        over100000: 25
      },
      deliveryTimeline: {
        upto3: 5,
        "3to6": 10,
        "6to12": 15,
        over12: 20
      },
      impactedTeams: {
        "1": 5,
        "2to3": 10,
        "4to5": 15,
        over5: 20
      },
      clientSensitiveData: {
        no: 0,
        yes: 15
      },
      audienceType: {
        internal: 5,
        client: 10
      },
      strategicImportance: {
        low: 2,
        moderate: 5,
        high: 8,
        critical: 10
      }
    },
    tshirtSize: [
      { min: 0, max: 25, label: "XS" },
      { min: 26, max: 40, label: "S" },
      { min: 41, max: 55, label: "M" },
      { min: 56, max: 70, label: "L" },
      { min: 71, max: 85, label: "XL" },
      { min: 86, max: 100, label: "XXL" }
    ],
    recommendedRoute: [
      { min: 0, max: 25, label: "Fast-track / Light-touch" },
      { min: 26, max: 55, label: "Standard Project" },
      { min: 56, max: 75, label: "Formal Project" },
      { min: 76, max: 100, label: "Enhanced Governance / Programme-level" }
    ],
    routeRank: {
      "Fast-track / Light-touch": 0,
      "Standard Project": 1,
      "Formal Project": 2,
      "Enhanced Governance / Programme-level": 3
    },
    documentsByRoute: {
      "Fast-track / Light-touch": ["Project Charter"],
      "Standard Project": ["Project Charter", "Risk Assessment Template"],
      "Formal Project": ["Project Charter", "Business Case", "Risk Assessment Template"],
      "Enhanced Governance / Programme-level": ["Project Charter", "Business Case", "Risk Assessment Template", "Data Privacy Assessment Form", "Information Security Review Form"]
    }
  };

  function lookupScore(group, value) {
    return rules.scores[group][value] || 0;
  }

  function pickByThreshold(value, list) {
    return list.find((item) => value >= item.min && value <= item.max);
  }

  function calculateTotal(values) {
    return (
      lookupScore("budget", values.budgetBand) +
      lookupScore("deliveryTimeline", values.deliveryTimeline) +
      lookupScore("impactedTeams", values.impactedTeams) +
      lookupScore("clientSensitiveData", values.clientSensitiveData) +
      lookupScore("audienceType", values.audienceType) +
      lookupScore("strategicImportance", values.strategicImportance)
    );
  }

  function applyRouteOverrides(values, route) {
    let finalRoute = route;
    const mustBeFormal =
      values.clientSensitiveData === "yes" ||
      values.budgetBand === "over100000" ||
      values.deliveryTimeline === "over12" ||
      (values.audienceType === "client" && (values.impactedTeams === "4to5" || values.impactedTeams === "over5"));

    if (mustBeFormal && rules.routeRank[finalRoute] < rules.routeRank["Formal Project"]) {
      finalRoute = "Formal Project";
    }

    return finalRoute;
  }

  function buildRequiredDocuments(values, route) {
    const documents = new Set(rules.documentsByRoute[route]);

    if (values.clientSensitiveData === "yes") {
      documents.add("Data Privacy Assessment Form");
      documents.add("Information Security Review Form");
    }

    if (values.audienceType === "client") {
      documents.add("Risk Assessment Template");
    }

    if (values.budgetBand === "50001to70000" || values.budgetBand === "70001to100000") {
      documents.add("Business Case");
    }

    if (values.budgetBand === "over100000") {
      documents.add("Business Case");
      documents.add("Risk Assessment Template");
      documents.add("Information Security Review Form");
    }

    return Array.from(documents);
  }

  function buildExplanation(values, score, size, route) {
    const drivers = [];
    if (values.budgetBand === "over100000" || values.budgetBand === "70001to100000") drivers.push("higher budget");
    if (values.deliveryTimeline === "over12" || values.deliveryTimeline === "6to12") drivers.push("longer delivery timeline");
    if (values.impactedTeams === "4to5" || values.impactedTeams === "over5") drivers.push("wider team impact");
    if (values.clientSensitiveData === "yes") drivers.push("client-sensitive data");
    if (values.audienceType === "client") drivers.push("client-facing delivery");

    const reasonText = drivers.length ? drivers.join(", ") : "a lighter delivery profile";
    return `Scored ${score}/100, sized ${size}, and routed to ${route} because the intake indicates ${reasonText}.`;
  }

  function assess(values) {
    const score = calculateTotal(values);
    const tshirtSize = pickByThreshold(score, rules.tshirtSize).label;
    const baseRoute = pickByThreshold(score, rules.recommendedRoute).label;
    const recommendedRoute = applyRouteOverrides(values, baseRoute);
    const requiredDocuments = buildRequiredDocuments(values, recommendedRoute);
    const explanation = buildExplanation(values, score, tshirtSize, recommendedRoute);

    return {
      score,
      scoreOutOf: 100,
      tshirtSize,
      recommendedRoute,
      requiredDocuments,
      explanation,
      rules
    };
  }

  return {
    rules,
    assess
  };
})();
