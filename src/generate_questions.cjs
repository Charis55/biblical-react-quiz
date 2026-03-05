const fs = require('fs');
const path = require('path');

const themes = [
    { name: "Integrity", terms: ["honesty in transactions", "consistency when unobserved", "truthful reporting", "keeping promises", "avoiding deceptive practices"] },
    { name: "Stewardship", terms: ["managing resources wisely", "caring for the environment", "investing talents", "handling company funds", "time management"] },
    { name: "Servant Leadership", terms: ["empowering others", "leading by example", "serving the team", "focusing on team success over personal glory", "humility in power"] },
    { name: "Justice", terms: ["impartiality in hiring", "equitable treatment of employees", "fair wages", "non-discrimination", "correcting systemic wrongs"] },
    { name: "Work Ethic", terms: ["diligence (Colossians 3:23)", "avoiding laziness", "pursuing excellence", "working as unto the Lord", "taking responsibility"] },
    { name: "Conflict Resolution", terms: ["addressing issues privately (Matthew 18)", "being quick to listen", "forgiveness and grace", "seeking peace", "avoiding workplace gossip"] },
    { name: "Rest & Sabbath", terms: ["maintaining work-life boundaries", "trusting God through resting", "avoiding burnout", "respecting employees' time off", "recognizing human limitations"] },
    { name: "Compassion", terms: ["caring for colleagues in need", "showing genuine empathy", "supporting struggling team members", "valuing people over mere profits", "kindness in daily feedback"] },
    { name: "Wisdom", terms: ["making ethical decisions", "seeking wise counsel", "praying for guidance in business", "long-term sustainable thinking", "understanding consequences"] },
    { name: "Humility", terms: ["admitting mistakes quickly", "accepting constructive criticism", "not aggressively seeking the spotlight", "giving credit to others", "remaining always teachable"] }
];

const scenarios = [
    "when dealing with a demanding client",
    "during an intense annual performance review",
    "upon discovering a major financial error",
    "while leading a high-stakes corporate project",
    "when a competitor employs unethical tactics",
    "when pressured to cut corners to meet a deadline",
    "during the hiring process for a new team member",
    "when deciding how to allocate a shrinking budget",
    "when observing a colleague act inappropriately",
    "when a team member is consistently underperforming",
    "when celebrating a major team victory",
    "when facing an unexpected market downturn",
    "when negotiating a difficult contract",
    "when receiving undeserved praise",
    "while managing remote or isolated workers"
];

// Let's generate exactly 500 unique questions using permutations.
const questions = [];

// To get exactly 500, we can use an outer loop if we don't have enough permutations, but 10*5*15 = 750 permutations.
// We'll just slice the first 500.

let count = 0;

for (const theme of themes) {
    for (const term of theme.terms) {
        for (const scenario of scenarios) {
            if (count >= 500) break;

            // Randomly pick correct answer position
            const correctIndex = count % 4; // Predictable distribution to ensure all options get used

            const options = ["", "", "", ""];

            // Generate the correct answer text
            const correctAnswer = `By prioritizing ${term} in accordance with the principle of ${theme.name}.`;
            options[correctIndex] = correctAnswer;

            // Generate 3 distractors
            let distractorInd = 1;
            for (let i = 0; i < 4; i++) {
                if (i !== correctIndex) {
                    if (distractorInd === 1) {
                        options[i] = `By focusing solely on maximizing short-term profits regardless of impact.`;
                    } else if (distractorInd === 2) {
                        options[i] = `By shifting blame and avoiding any personal or corporate responsibility.`;
                    } else if (distractorInd === 3) {
                        options[i] = `By prioritizing personal advancement over the well-being of the team or client.`;
                    }
                    distractorInd++;
                }
            }

            // Add variety to the question phrasing based on count to make them read naturally
            let questionText = "";
            if (count % 3 === 0) {
                questionText = `How should a professional guided by Biblical principles act ${scenario}?`;
            } else if (count % 3 === 1) {
                questionText = `In the context of ${theme.name}, what is the most appropriate Biblical response ${scenario}?`;
            } else {
                questionText = `What approach best demonstrates the Biblical concept of ${theme.name} ${scenario}?`;
            }

            questions.push({
                question: questionText,
                options: options,
                answer: correctIndex
            });

            count++;
        }
        if (count >= 500) break;
    }
    if (count >= 500) break;
}

// Write to questions.json in the src directory
const outputPath = path.join(__dirname, 'questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));

console.log(`Successfully generated ${questions.length} questions to ${outputPath}`);
