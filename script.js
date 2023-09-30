let score = 0;

function startGame() {
    fetchQuestionFromAPI(); // This would be your function that gets questions from GPT-3
    document.getElementById('submit-button').disabled = false;
}

function submitAnswer() {
    let userAnswer = prompt("Your answer:");
    // Here, you might want to check the user's answer and update the score accordingly.
    // Then, get the next question.
    fetchQuestionFromAPI();
}

function fetchQuestionFromAPI() {
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // NEVER do this in client-side code in real implementations
        },
        body: JSON.stringify({
            prompt: 'Generate a trivia question',
            max_tokens: 50
        })
    })
    .then(response => response.json())
    .then(data => {
        let question = data.choices[0].text.trim();
        document.getElementById('question').innerText = question;
    })
    .catch(error => console.error('Error fetching question:', error));
}
