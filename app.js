/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Approximately how far is the Sun from the Earth?',
      answers: [
        '100 km',
        '1000 km',
        '100000 km',
        '150000000 km'
      ],
      correctAnswer: '150000000 km'
    },
    {
      question: 'Approximately how old is the universe?',
      answers: [
        '100 years',
        '6000 years',
        '10 billion years',
        '15 billion years'
      ],
      correctAnswer: '15 billion years'
    },
    {
      question: 'What is the speed of light?',
      answers: [
        '10 km per hr',
        '100 km per hr',
        '1000 km per hr',
        '300000 km per hr'
      ],
      correctAnswer: '300000 km per hr'
    },
    {
      question: 'Approximately how fast does the Earth rotate?',
      answers: [
        '100 km per hr',
        '1000 km per hr',
        '10 km per hr',
        '10000 km per hr'
      ],
      correctAnswer: '1000 km per hr'
    },
    {
      question: 'Approximately how large is the observable universe in 2020?',
      answers: [
        '1 light year',
        '200 light years',
        '15 billion light years',
        '93 billion light years'
      ],
      correctAnswer: '93 billion light years'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  correct: 0,
  incorrect: 0
};



let html =  `<div class="welcomePage">
  <h3 class="welcomeMessage">Time for a quick quiz about space!
  </h3>
  <button class="startQuiz" autofocus>Start Quiz!</button>
</div>`;

function handleStartQuiz() {
  $('.startQuiz').click(function(event) {
    store.questionNumber=0;
    store.correct=0;
    store.incorrect=0;
    html = loadQuiz();
    main();
  });
}

function renderQuizApp() {
  $('main').html(html);
}

function loadQuiz() {
  let number = store.questionNumber;
  let selection = store.questions[number].answers;
  return  `<div class="questionPage">
  <h3>
  Question ${number + 1}: ${store.questions[number].question}
</h3>
  <form class="question-form">
      <input type="radio" name="answer" id="answer-a" class="answer" value="${selection[0]}" required>
      <label for="answer">${selection[0]}</label><br>
      <input type="radio" name="answer" id="answer-b" class="answer" value="${selection[1]}">
      <label for="answer">${selection[1]}</label><br>
      <input type="radio" name="answer" id="answer-c" class="answer" value="${selection[2]}">
      <label for="answer">${selection[2]}</label><br>
      <input type="radio" name="answer" id="answer-d" class="answer" value="${selection[3]}">
      <label for="answer">${selection[3]}</label><br>
      <button type="submit" class="answerSubmit">Submit Answer</button>
  </form>
  <p>Correct: ${store.correct}</p><p>Incorrect: ${store.incorrect}</p>
</div>`;
}



function answerCheck(review) {
  let i = store.questionNumber;
  let result = (review === store.questions[i].correctAnswer) ? 'Correct' : 'Incorrect';
  if(store.feedback){
    if(result === 'Correct'){
      store.correct += 1;
      console.log('correct');

      html = generateCorrectPage();
    } else {
      store.incorrect += 1;
      console.log('incorrect');
      html = generateIncorrectPage();
    }
  }else{
    store.questionNumber++; 
  
    if(store.questionNumber < store.questions.length) {
      html = loadQuiz();
    } else {
      generateFinalPage();
    }}
}
function generateIncorrectPage(){
  html =  `<div class="incorrectPage">
  <h2>Congrats! You completed the quiz!</h2>
  <h3>Correct: ${store.correct}</h3>
  <h3>Incorrect: ${store.incorrect}</h3>
  <button class="nextQuestion">Next Question?</button></div>`;  

}
function generateCorrectPage(){
  html =  `<div class="correctPage">
  <h2>Congrats! You completed the quiz!</h2>
  <h3>Correct: ${store.correct}</h3>
  <h3>Incorrect: ${store.incorrect}</h3>
  <button class="nextQuestion">Next Question?</button></div>`;  

}

function generateFinalPage(){
  html =  `<div class="finalPage">
  <h2>Congrats! You completed the quiz!</h2>
  <h3>Correct: ${store.correct}</h3>
  <h3>Incorrect: ${store.incorrect}</h3>
  <button class="restartQuiz">Again?</button></div>`;  
  store.incorrect=0;
  store.correct=0;
  store.questionNumber=0;
}

function handleSubmit() {
  $('.question-form').on('click', '.answerSubmit', event => {
    event.preventDefault();
    let userAnswer = $('input[name=\'answer\']:checked').val();
    if(userAnswer !== undefined) {
      store.feedback = true;
      answerCheck(userAnswer);
      main();
    }
  });
  
}

function handleNextQuestion() {
  $('.submit').click(function(event) {
    store.feedback = true;
    renderQuizApp();
  });
}

function handleRestart() {
  $('.restartQuiz').click(function(event) {
    html = loadQuiz();
    main();
  });
}

function main(){
  renderQuizApp();
  handleStartQuiz();  
  handleSubmit();
  handleNextQuestion();
  handleRestart();
}

$(main());