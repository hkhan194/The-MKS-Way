window.ScoringEngine = (() => {
  const scoreScale = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5
  };

  const rules = {
    scores: {
      strategicAlignment: scoreScale,
      valueBenefits: scoreScale,
      costResourceEfficiency: scoreScale,
      riskCompliance: scoreScale,
      timeSensitivity: scoreScale,
      feasibility: scoreScale
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
    documentsByRoute: {
      "Fast-track / Light-touch": ["Project Charter"],
      "Standard Project": ["Project Charter", "Risk Assessment Template"],
      "Formal Project": ["Project Charter", "Business Case", "Risk Assessment Template"],
      "Enhanced Governance / Programme-level": ["Project Charter", "Business Case", "Risk Assessment Template", "Data Privacy Assessment Form", "Information Security Review Form"]
    }
  };

  const scoringFields = [
    "strategicAlignment",
    "valueBenefits",
    "costResourceEfficiency",
    "riskCompliance",
    "timeSensitivity",
    "feasibility"
  ];

  function lookupScore(group, value) {
    return rules.scores[group][value] || 0;
  }

  function pickByThreshold(value, list) {
    return list.find((item) => value >= item.min && value <= item.max) || list[0];
  }

  function calculateTotal(values) {
    const rawScore = scoringFields.reduce((total, field) => total + lookupScore(field, values[field]), 0);
    return Math.round((rawScore / 30) * 100);
  }

  function buildRequiredDocuments(route) {
    return [...rules.documentsByRoute[route]];
  }

  function buildExplanation(score, size, route) {
    return `Scored ${score}/100, sized ${size}, and routed to ${route} using the six MVP scoring questions.`;
  }

  function assess(values) {
    const score = calculateTotal(values);
    const tshirtSize = pickByThreshold(score, rules.tshirtSize).label;
    const recommendedRoute = pickByThreshold(score, rules.recommendedRoute).label;
    const requiredDocuments = buildRequiredDocuments(recommendedRoute);
    const explanation = buildExplanation(score, tshirtSize, recommendedRoute);

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
