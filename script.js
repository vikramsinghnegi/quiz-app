
        // best wishe
        function showIntroScreen() {
    quizContainer.innerHTML = `
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-6">All the Best!</h1>
            <p class="text-lg mb-4">Get ready to test your knowledge of computer science.</p>
            <button id="start-quiz-btn" class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded">
                Start Quiz
            </button>
        </div>
    `;

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        startQuiz();
    });
}


        function startQuiz() {
    // time quiz show hoga
    currentQuestionIndex = 0;
    score = 0;
    totalTime = 300;
    timerStarted = false;
    userAnswers.fill(null);

    loadQuestion();
    clearInterval(timerInterval); 
}

 // QUESTION // ANSWER // OPTIONS
        
        const quizQuestions = [
            { question: "1.What does CPU stand for?", options: ["Central Processing Unit", "Control Processing Unit", "Computer Personal Unit", "Central Personal Unit"], answer: "Central Processing Unit" },
            { question: "2.Which programming language is used to style web pages?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "CSS" },
            { question: "3.What is the main function of an operating system?", options: ["To manage hardware and software resources", "To edit documents", "To browse the internet", "To write code"], answer: "To manage hardware and software resources" },
            { question: "4.What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Random Allocate Memory"], answer: "Random Access Memory" },
            { question: "5.Which company developed the Windows operating system?", options: ["Apple", "Google", "Microsoft", "IBM"], answer: "Microsoft" },
            { question: "6.What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transmission Path", "HighTech Transfer Protocol"], answer: "HyperText Transfer Protocol" },
            { question: "7.What is the primary purpose of a firewall?", options: ["To protect against malware", "To block unauthorized access", "To increase internet speed", "To manage storage"], answer: "To block unauthorized access" },
            { question: "8.Which device is primarily used for input?", options: ["Monitor", "Keyboard", "Printer", "Speaker"], answer: "Keyboard" },
            { question: "9.What is open-source software?", options: ["Software that is free to use", "Software with source code that anyone can modify", "Software with no licensing", "Software that is not secure"], answer: "Software with source code that anyone can modify" },
            { question: "10.What does IP in IP address stand for?", options: ["Internet Protocol", "Internal Process", "Internet Procedure", "Integrated Protocol"], answer: "Internet Protocol" },
            { question: "11.Which programming language is primarily used for web development?", options: ["C++", "JavaScript", "Python", "Java"], answer: "JavaScript" },
            { question: "12.What is a function in programming?", options: ["A collection of commands", "A block of code designed to perform a task", "An error in the code", "A variable used in code"], answer: "A block of code designed to perform a task" },
            { question: "13.Which component is considered the 'brain' of a computer?", options: ["CPU", "GPU", "RAM", "Hard Drive"], answer: "CPU" },
            { question: "14.What is the purpose of a database?", options: ["To store data", "To process data", "To delete data", "To secure data"], answer: "To store data" },
            { question: "15.Which type of memory is non-volatile?", options: ["RAM", "Cache", "ROM", "Registers"], answer: "ROM" },
            { question: "16.What is the full form of USB?", options: ["Universal Serial Bus", "Universal Secure Bus", "Universal Storage Bus", "Unified Serial Bus"], answer: "Universal Serial Bus" },
            { question: "17.What is the purpose of an algorithm?", options: ["To secure a system", "To solve a problem systematically", "To store data", "To create a program"], answer: "To solve a problem systematically" },
            { question: "18.Which file format is used for web images?", options: ["PDF", "JPEG", "DOC", "TXT"], answer: "JPEG" },
            { question: "19.What is a compiler?", options: ["A program that converts code into executable form", "A program that runs code directly", "A debugging tool", "A database"], answer: "A program that converts code into executable form" },
            { question: "20.What does GUI stand for?", options: ["Graphical User Interface", "General User Interface", "Graphical Utility Input", "Graphical User Integration"], answer: "Graphical User Interface" },
            { question: "21.What is JavaScript used for?",options: ["To create static web pages", "To style web pages", "To add interactivity and dynamic behavior to web pages", "To manage server-side databases"],answer: "To add interactivity and dynamic behavior to web pages"},
            { question: "25.What is the function of a database?", options: ["To store and manage data", "To run code", "To display websites", "To add styles to a webpage"], answer: "To store and manage data"},
            {question:  "26.What is an IP address?", options: ["A unique identifier for a device on a network", "A type of data encryption", "A programming language", "A website hosting service"],answer: "A unique identifier for a device on a network"},

// Amore question add here
           
        ];

        const quizContainer = document.getElementById('quiz-container');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const scoreContainer = document.getElementById('score-container');
        const scoreDisplay = document.getElementById('score');
        const restartBtn = document.getElementById('restart-btn');
        const timerDisplay = document.getElementById('time');

        let currentQuestionIndex = 0;
        let score = 0;
        const userAnswers = Array(quizQuestions.length).fill(null);
        let totalTime = 300; // Total time in seconds (5 minutes)
        let timerInterval;
        let timerStarted = false; // Flag to track if timer has started

        function updateTimer() {
            const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
            const seconds = (totalTime % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
            if (totalTime > 0) {
                totalTime--;
            } else {
                clearInterval(timerInterval);
                showScore();
            }
        }

        function loadQuestion() {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <h2 class="text-xl font-bold mb-4">${currentQuestion.question}</h2>
                <ul class="space-y-2">
                    ${currentQuestion.options.map((option, index) => `
                        <li>
                            <button class="option-btn w-full text-left bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded" data-option="${option}">
                                ${option}
                            </button>
                        </li>
                    `).join('')}
                </ul>
                   <div id="feedback" class="mt-4 text-lg text-center font-semibold min-h-[30px]"></div>
            `;

            const optionButtons = document.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
              

                    optionButtons.forEach(btn => btn.disabled = true);

                    const selectedOption = button.dataset.option;
                    userAnswers[currentQuestionIndex] = selectedOption;
                    const feedback = document.getElementById('feedback');
                    if (!timerStarted) {
                        timerInterval = setInterval(updateTimer, 1000); // Start the timer when user selects an answer
                        timerStarted = true;
                    }

                    if (selectedOption === currentQuestion.answer) {
                        feedback.textContent = "Correct!";
                        feedback.classList.remove('text-red-500');
                        feedback.classList.add('text-green-500');
                        score++;
                    } else {
                        feedback.textContent = `Wrong! `;
                        feedback.classList.remove('text-green-500');
                        feedback.classList.add('text-red-500');
                    }
                    nextBtn.disabled = false;
                });
            });

            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.disabled = true;
        }

        function showScore() {
            quizContainer.innerHTML = "";
            scoreContainer.classList.remove('hidden');
            scoreDisplay.textContent = `You scored ${score} out of ${quizQuestions.length}`;
            clearInterval(timerInterval);
        }

        restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            totalTime = 300;
            userAnswers.fill(null);
            timerStarted = false; // Reset the timer flag
            scoreContainer.classList.add('hidden');
            loadQuestion();
            clearInterval(timerInterval);
        });

        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showScore();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion();
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            loadQuestion();
        });


        document.addEventListener('DOMContentLoaded', () => {

    showIntroScreen();
});

document.addEventListener('DOMContentLoaded', () => {
    showIntroScreen();

    // Add event listener for the background toggle button
    const toggleBtn = document.getElementById('toggle-bg-btn');
    const colors = ['#1A202C', '#2D3748', '#4A5568', '#6B46C1', '#2C7A7B', '#38A169']; // Array of awesome colors
    let colorIndex = 0;

    toggleBtn.addEventListener('click', () => {
        // Cycle through the colors array
        colorIndex = (colorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[colorIndex];
    });
});


