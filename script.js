const questions = [
    {
        question:"Which of the following is a NoSQL database?",
        answers: [
            {text:"MySQL",correct:false},
            {text:"PostgreSQL",correct:false},
            {text:"MongoDB ",correct:true},
            {text:"Oracle",correct:false},
        ]
    },
    {
        question:"Which protocol is used for securely transmitting web pages?",
        answers: [
            {text:"HTTP",correct:false},
            {text:"FTP",correct:false},
            {text:"HTTPS ",correct:true},
            {text:"SMTP",correct:false},
        ]
    },
    {
        question:"What is the primary function of DNS in networking?",
        answers: [
            {text:"To transfer files",correct:false},
            {text:"To resolve domain names to IP addresses ",correct:true},
            {text:"To encrypt data",correct:false},
            {text:"To establish a VPN connection",correct:false},
        ]
    },
    {
        question:"Which HTML tag is used to define an internal style sheet?",
        answers: [
            {text:"style tag",correct:true},
            {text:"link tag",correct:false},
            {text:"script tag",correct:false},
            {text:"meta tag",correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
} 

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();

