let score = 0;
let currentQuestion = '';
let correctAnswerCount = 0;

function startGame() {
    const selectedDifficulty = document.getElementById('difficulty').value;
    fetchQuestionFromAPI(selectedDifficulty);
    document.getElementById('submit-button').disabled = false;
    document.getElementById('start-button').disabled = true;
    document.getElementById('difficulty-container').style.display = 'none'; // Hide the difficulty selection
    document.getElementById('question-container').style.display = 'block'; // Show question container
}

function submitAnswer() {
    const userAnswer = document.getElementById('answer').value;
    
    // Check if the user's answer is correct and update the score
    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);

    if (isCorrect) {
        score++;
        correctAnswerCount++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    document.getElementById('answer').value = '';
    fetchQuestionFromAPI(currentQuestion.difficulty);
}

function checkAnswer(userAnswer, correctAnswer) {
    // Convert both answers to lowercase and trim any whitespace for case-insensitive comparison
    userAnswer = userAnswer.toLowerCase().trim();
    correctAnswer = correctAnswer.toLowerCase().trim();

    // Compare the user's answer with the correct answer
    return userAnswer === correctAnswer;
}

function fetchQuestionFromAPI(difficulty) {
    fetch(`YOUR_BACKEND_ENDPOINT?difficulty=${difficulty}`, { // Replace with your backend endpoint
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        }
    })
    .then(response => response.json())
    .then(data => {
        currentQuestion = data; // Store the current question for later reference
        document.getElementById('question').innerText = data.question;
    })
    .catch(error => console.error('Error fetching question:', error));
}

// Add event listener for the "Start" button
document.getElementById('start-button').addEventListener('click', startGame);

// Add event listener for the "Submit" button
document.getElementById('submit-button').addEventListener('click', submitAnswer);

// Display the initial UI (difficulty selection) when the page loads
window.addEventListener('load', () => {
    document.getElementById('difficulty-container').style.display = 'block'; // Show difficulty selection
    document.getElementById('question-container').style.display = 'none'; // Hide question container
});
function fetchQuestionFromAPI(difficulty) {
    const prompt = generatePrompt(difficulty); // Create an appropriate prompt based on the chosen difficulty
    
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 50 // Adjust the max_tokens as needed
        })
    })
    .then(response => response.json())
    .then(data => {
        let question = data.choices[0].text.trim();
        document.getElementById('question').innerText = question;
        currentQuestion = {
            question: question,
            correctAnswer: generateCorrectAnswer(question) // Implement a function to generate the correct answer
        };
    })
    .catch(error => console.error('Error fetching question:', error));
}
