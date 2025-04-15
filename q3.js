function analyzeText() {
    const text = document.getElementById("inputText").value;
    const resultsContainer = document.getElementById("analysisResults");

    if (text.trim() === "") {
        resultsContainer.innerHTML = "<p>Please enter some text to analyze.</p>";
        return;
    }

    // Basic counts:
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = (text.trim().match(/\b\w+\b/g) || []).length;
    const spaceCount = (text.match(/ /g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialSymbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    const pronouns = [
      "i", "me", "you", "he", "him", "she", "her", "it", "we", "us", "they", "them",
      "my", "your", "his", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs",
      "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves"
    ];

    const prepositions = [
      "in", "on", "at", "by", "with", "about", "against", "between", "into", "through",
      "during", "before", "after", "above", "below", "to", "from", "up", "down", "over", "under"
    ];

    const articles = ["a", "an"];

    function countOccurrences(tokens, wordGroup) {
        return tokens.filter(token => wordGroup.includes(token))
                     .reduce((acc, token) => {
                         acc[token] = (acc[token] || 0) + 1;
                         return acc;
                     }, {});
    }

    const pronounCounts = countOccurrences(tokens, pronouns);
    const prepositionCounts = countOccurrences(tokens, prepositions);
    const articleCounts = countOccurrences(tokens, articles);

    let outputHTML = `<h3>Analysis Results:</h3>`;
    outputHTML += `<ul>
        <li><strong>Letter Count:</strong> ${letterCount}</li>
        <li><strong>Word Count:</strong> ${wordCount}</li>
        <li><strong>Space Count:</strong> ${spaceCount}</li>
        <li><strong>Newline Count:</strong> ${newlineCount}</li>
        <li><strong>Special Symbols Count:</strong> ${specialSymbolCount}</li>
    </ul>`;

    outputHTML += `<h4>Pronoun Counts:</h4><pre>${JSON.stringify(pronounCounts, null, 2)}</pre>`;
    outputHTML += `<h4>Preposition Counts:</h4><pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>`;
    outputHTML += `<h4>Indefinite Article Counts:</h4><pre>${JSON.stringify(articleCounts, null, 2)}</pre>`;

    resultsContainer.innerHTML = outputHTML;
}
