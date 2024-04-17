let questionsData = [
    {
        question: "Which is the only continent in the world without a desert?",
        options: ["North America", "Africa", "Asia", "Europe"],
        correctAnswerIndex: 1
    },
    {
        question: "Which desert is known as the driest place on Earth?",
        options: ["Mojave Desert", "Kalahari Desert", "Gobi Desert", "Atacama Desert"],
        correctAnswerIndex: 3
    },
    {
        question: "What is the name of the desert located in North America that spans across the United States and Mexico?",
        options: ["Sonoran Desert", "Great Basin Desert", "Chihuahuan Desert", "Namib Desert"],
        correctAnswerIndex: 0
    },
    {
        question: "Which desert is characterized by its iconic red sand dunes and is located in the southern part of Africa?",
        options: ["Namib Desert", "Sahara Desert", "Kalahari Desert", "Atacama Desert"],
        correctAnswerIndex: 0
    },
    {
        question: "Which desert, located in Asia, is notable for being one of the coldest deserts in the world?",
        options: ["Arabian Desert", "Thar Desert", "Taklamakan Desert", "Gobi Desert"],
        correctAnswerIndex: 1
    },
    {
        question: "What is the name of the desert that occupies much of central Australia?",
        options: ["Great Victoria Desert", "Gibson Desert", "Tanami Desert", "Simpson Desert"],
        correctAnswerIndex: 3
    },
    {
        question: "Which desert is famous for its Saguaro cactus and is located primarily in the southwestern United States?",
        options: ["Mojave Desert", "Sonoran Desert", "Great Basin Desert", "Colorado Desert"],
        correctAnswerIndex: 1
    },
    {
        question: "What is the name of the desert located in eastern Africa that spans several countries including Ethiopia, Eritrea, and Djibouti?",
        options: ["Kalahari Desert", "Sahara Desert", "Namib Desert", "Danakil Desert"],
        correctAnswerIndex: 3
    },
    {
        question: "Which desert, situated in South America, is the largest in that continent?",
        options: ["Atacama Desert", "Sechura Desert", "Patagonian Desert", "Monte Desert"],
        correctAnswerIndex: 2
    },
    {
        question: "Which desert, located in Asia, is known for its expansive sand dunes and is often featured in movies and literature?",
        options: ["Arabian Desert", "Thar Desert", "Gobi Desert", "Taklamakan Desert"],
        correctAnswerIndex: 0
    }
];

// Variables
let currentQuestion = 0;
let userAnswers = [];

// Function to increment the current question index
function increment() {
    const questionLength = questionsData.length;
    if (currentQuestion < questionLength) {
        currentQuestion++;
    } else {
        currentQuestion = questionLength - 1;
    }
}

// Function to initialize question
function initializeQuestion() {
    let questionElement = document.getElementById('question');
    let optionsElement = document.getElementById('options');

    questionElement.textContent = `Question ${currentQuestion + 1} of ${questionsData.length}: ${questionsData[currentQuestion].question}`;

    optionsElement.innerHTML = '';

    questionsData[currentQuestion].options.forEach((option, index) => {
        let li = document.createElement('li');
        li.textContent = option;
        li.classList.add('option-btn');
        li.dataset.index = index;
        optionsElement.appendChild(li);
    });

    // Add event listeners to option buttons
    addOptionButtonListeners();
}

// Function to add event listeners to option buttons
function addOptionButtonListeners() {
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(optionButton => {
        optionButton.addEventListener('click', function () {
            // Remove 'selected' class from all options
            optionButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked option
            optionButton.classList.add('selected');

            // Store the user's answer
            const selectedIndex = parseInt(optionButton.dataset.index);
            userAnswers[currentQuestion] = selectedIndex;
        });
    });
}

// Function to display result
function displayResult() {
    const resultTable = document.getElementById('result-table');
    resultTable.innerHTML = '';

    questionsData.forEach((question, index) => {
        const actualAnswer = question.options[question.correctAnswerIndex];
        const candidateAnswer = question.options[userAnswers[index]];
        const result = actualAnswer === candidateAnswer ? 'Correct' : 'Incorrect';

        const row = `
            <tr>
                <td>${question.question}</td>
                <td>${actualAnswer}</td>
                <td>${candidateAnswer || 'Not attempted'}</td>
                <td>${result}</td>
            </tr>
        `;

        resultTable.innerHTML += row;
    });

    document.getElementById('result-container').style.display = 'block';
}

// Initialize first question
initializeQuestion();

// Get reference to the next button
const nextButton = document.getElementById('next-btn');

// Add click event listener to the next button
nextButton.addEventListener('click', function () {
    // If all questions are answered, display result
    if (currentQuestion === questionsData.length - 1) {
        displayResult();
    } else {
        // Otherwise, move to the next question
        increment();
        initializeQuestion();
    }
});