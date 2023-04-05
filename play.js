// HTML ELEMENTS
const HTMLQuestion = document.getElementById("question");
const HTMLquestionCounter = document.getElementById('questionCounter');
const HTMLscore = document.getElementById('score');
const progressBar = document.getElementById('progressBar');
const progressBarFull = document.getElementById('progressBarFull');

// made an array from choice text elements.
const choices = Array.from(document.getElementsByClassName("choice-text"));

// JS Variable
let currentQuestion = {};  // to store data of currentQuestion
let acceptingAnswers = false;
let score = 0;  
let questionCounter = 0; // to count number of questions.
let availableQuestions = [];  // this will contain available questions at any moment.

let questions = [
    {
        question: 'Which type of Programming does Python support?',
        choice1: 'object-oriented programming',
        choice2: 'structured programming',
        choice3: 'functional programming',
        choice4: 'all of the mentioned',
        answer: 4,
    },
    {
        question: "Which of the following is the correct extension of the Python file?",
        choice1: ".python",
        choice2: ".pl",
        choice3: ".py",
        choice4: ".p",
        answer: 3,
    },
    {
        question : 'Which keyword is used for function in Python language?',
        choice1:  'Function',
        choice2:  'def',
        choice3:  'Fun',
        choice4:  'Define',
        answer : 2
    },
    {
        question: "Python supports the creation of anonymous functions at runtime, using a construct called",
        choice1 : "pi",
        choice2 : "anonymous",
        choice3 : "lamba",
        choice4 : "def __init__",
        answer : 3
    },
    {
        question: "Which of the following functions is a built-in function in python?",
        choice1 : "factorial()",
        choice2 : "print()",
        choice3 : "seed()",
        choice4 : "sqrt()",
        answer : 2
    },{
        question: "Which of the following is the use of id() function in python?",
        choice1 : "Every object doesn\'t have a unique id",
        choice2 : "Id returns the identity of the object",
        choice3 : "All of the mentioned",
        choice4 : "None of the mentioned",
        answer : 2
    },{
        question: "Which of the following is not a core data type in Python programming?",
        choice1 : "Tuples",
        choice2 : "Lists",
        choice3 : "Class",
        choice4 : "Dictionary",
        answer : 3
    }
    ,{
        question: `What will be the output of the following Python code?

                 print('abc. DEF'.capitalize())`,
        choice1 : "Abc. def",
        choice2 : "abc. def",
        choice3 : "Abc. Def",
        choice4 : "ABC. DEF",
        answer : 1
    },{
        question: `To add a new element to a list we use which Python command?`,
        choice1 : "list1.addEnd(5)",
        choice2 : "list1.addLast(5)",
        choice3 : "list1.append(5)",
        choice4 : "list1.add(5)",
        answer : 3
    },{
        question: `Kya tu abhi bhi chutiya hain?`,
        choice1 : "Hann",
        choice2 : "Nahi",
        choice3 : "Pata Nahi",
        choice4 : "Shayad",
        answer : 1
    }
];

// constants;
const correctBonus = 10;
const maxQuestions = 10;  // number of questions you want for each user to attempt.

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];  // availableQuestions will contain all the elements of questions array. We use this instead of avilalbleQuestions = questions bcz we want both of them to be seperate. Since arrays are reference.

    // to update the questionCounter.
    HTMLquestionCounter.innerHTML = `${questionCounter} / ${maxQuestions}`;

    getNewQuestion();
}

getNewQuestion = () => {

    // no more questions are left or the number of questions you want user to attempt are attempted.
    // It means the game is going to end.
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
        
        // will store the score locally
        localStorage.setItem('mostRecentScore', score);

        // go to the end page
        return window.location.assign('/end.html');
    }

    // this will select random index for available question array.
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    // currentQuestion is an object.
    currentQuestion = availableQuestions[questionIndex];
    HTMLQuestion.innerText = currentQuestion.question;

    // to display choices.
    choices.forEach((choice)=>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    // now remove the attempted question from available question
    availableQuestions.splice(questionIndex,1);

    // to update the score
    HTMLscore.innerHTML = score;

    acceptingAnswers = true; // so that users can select answers once the page is reload completely.
    questionCounter++; // this will count number of questions you've attempted.

    // to update the questionCounter.
    HTMLquestionCounter.innerHTML = `${questionCounter} / ${maxQuestions}`;
    
    // update the progress bar
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`;
}

// When any choice is selected.
// To know which choice is selected and check whether it is correct or not.
choices.forEach((choice)=>{
    choice.addEventListener("click", (e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];   // this will contain selected choice data set number in string format.

        /* let HTMLClassToApply;
        if(Number(selectedAnswer) === currentQuestion.answer){
            HTMLClassToApply = "correct";
        }else{
            HTMLClassToApply = "incorrect";
        } */

        // the above if else is same as this. This is just ternary operator.
        const HTMLClassToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        // this will add correct class to the choice text. So that we can apply css acording to wrong or right answer.
        selectedChoice.parentElement.classList.add(HTMLClassToApply);   
        if(HTMLClassToApply == "incorrect"){
            selectedChoice.parentElement.classList.add("horizontal-shake");
            const audio = new Audio('wrong.mp3');
            audio.play();
        }
        
        else if(HTMLClassToApply == "correct"){
            score += correctBonus;  // score is increased.
            const audio = new Audio('correct.mp3');
            audio.play();
        }

        // after sometime we want to remove the correct or incorrect for else that choice-text will remain green for newQuestion too. Also we need to see next question.
        // setTimeout is used to have some pause after selecting the answer.
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(HTMLClassToApply);
            selectedChoice.parentElement.classList.remove("horizontal-shake");

            // newQuestion should be also be display after given seconds.
            getNewQuestion();
        }, 1000);

        
    } )
});

// for first question and choices to be appear, we need initialize first function call.
startGame();
