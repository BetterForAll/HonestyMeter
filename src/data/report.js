//report data for the example article (./article.js). For testing.
const report = {
    score: 70,
    explanation:
      "The article provides information about the Premier League clubs' decision to withdraw gambling sponsorship from the front of their matchday shirts by the end of the 2025-26 season. The article presents both sides of the issue, but there are some manipulations used, such as cherry-picking data, omission of key information, and appeal to authority. The article also contains some irrelevant information that does not contribute to the main topic.",
    sidesScore: [
      { sideName: "Gambling industry", score: 60 },
      { sideName: "Football clubs", score: 80 },
    ],
    sidesBalance: { "Gambling industry": 45, "Football clubs": 55 },
    favoredSide: "Football clubs",
    manipulations: [
      {
        name: "Cherry-picking data",
        description:
          "Presenting only the data that supports the argument while ignoring other relevant data",
        context:
          "The article states that the rate of problem gambling remains low by international standards at 0.3% of the UK's adult population - down from 0.4% the year previous. However, a YouGov survey for GambleAware in 2021 put the figure at 2.8%.",
        suggestedChanges: [
          "Present both data and explain the reasons for the difference in results.",
        ],
      },
      {
        name: "Omission of key information",
        description:
          "Leaving out important information that would change the audience's perception of the issue",
        context:
          "The article mentions that clubs will still be able to continue featuring gambling brands in areas such as shirt sleeves and LED advertising. However, it does not mention that these areas are less visible than the front of the shirt.",
        suggestedChanges: [
          "Include information about the visibility of different areas of the shirt.",
        ],
      },
      {
        name: "Appeal to authority",
        description:
          "Using an authority figure to support the argument without providing evidence",
        context:
          "The article quotes Lucy Frazer, who was appointed Secretary of State for Culture, Media and Sport in February, saying she 'welcomed the decision by the Premier League'.",
        suggestedChanges: [
          "Provide evidence to support the authority figure's statement.",
        ],
      },
    ],
  };

  export default report;