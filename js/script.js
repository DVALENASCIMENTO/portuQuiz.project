let currentQuestionIndex = 0;
let selectedAnswers = [];
let questions = [];

// Carregar arquivo JSON de questões
function loadQuiz(jsonFile) {
    fetch(`data/${jsonFile}`)
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            showQuestion(0);
        })
        .catch(error => console.error('Erro ao carregar o quiz:', error));
}

// Exibir questão
function showQuestion(index) {
    if (index >= questions.length) {
        showResults();
        return;
    }

    const question = questions[index];
    const container = document.querySelector('section.topics');
    
    container.innerHTML = `
        <h2>${question.question}</h2>
        <div class="options">
            ${question.options.map((option, i) => `
                <button onclick="selectAnswer(${i})">${option}</button>
            `).join('')}
        </div>
        <button onclick="nextQuestion()">Próxima</button>
    `;
    currentQuestionIndex = index;
}

// Armazenar resposta selecionada
function selectAnswer(selected) {
    selectedAnswers[currentQuestionIndex] = selected;
}

// Próxima questão
function nextQuestion() {
    if (typeof selectedAnswers[currentQuestionIndex] === 'undefined') {
        alert('Por favor, selecione uma resposta.');
        return;
    }
    showQuestion(currentQuestionIndex + 1);
}

// Exibir resultados
function showResults() {
    let correct = 0;

    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
            correct++;
        }
    });

    const container = document.querySelector('section.topics');
    const total = questions.length;
    const score = Math.round((correct / total) * 100);

    container.innerHTML = `
        <h2>Você acertou ${correct} de ${total} perguntas.</h2>
        <p>Sua pontuação: ${score}%</p>
        <button onclick="location.reload()">Reiniciar</button>
    `;
}
