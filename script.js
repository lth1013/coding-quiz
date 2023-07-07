var questions = [
    {
      question: "What is JavaScript?",
      options: {
        a: "A markup language",
        b: "A programming language",
        c: "A styling language",
        d: "A database language"
      },
      correctAnswer: "b"
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: {
        a: "let",
        b: "var",
        c: "const",
        d: "both a and b"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the output of the following code? console.log(2 + '2');",
      options: {
        a: "4",
        b: "22",
        c: "undefined",
        d: "NaN"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: {
        a: "String",
        b: "Number",
        c: "Boolean",
        d: "Float"
      },
      correctAnswer: "d"
    },
    {
      question: "What does the DOM stand for?",
      options: {
        a: "Document Object Model",
        b: "Data Object Model",
        c: "Dynamic Object Model",
        d: "Document Order Model"
      },
      correctAnswer: "a"
    }
  ];

let currentQuestion = 0; //starting at 0 index of questions
let score = 0; //will add to this variable later
let countdown = 30; //change html after you change this !!REMINDER!!
let timer; 
let quizEnded = false; // prevent quiz from being able to be continued for a second time after timer has ended
//and score has been submitted

function startQuiz() {
    document.getElementById("quizContainer").style.display = "block";
    document.querySelector("button").style.display = "none";
    displayQuestion();
    timer = setInterval(updateTimer, 1000);
}

function displayQuestion() {
    var questionElement = document.getElementById("question");
    var labelA = document.getElementById("labelA");
    var labelB = document.getElementById("labelB");
    var labelC = document.getElementById("labelC");
    var labelD = document.getElementById("labelD");
  //dots for questions
    var current = questions[currentQuestion];
    questionElement.textContent = current.question;
    labelA.textContent = current.options.a;
    labelB.textContent = current.options.b;
    labelC.textContent = current.options.c;
    labelD.textContent = current.options.d;
    //question content
    var answerRadios = document.querySelectorAll("input[name='answer']");
    answerRadios.forEach(radio => (radio.checked = false));
}

function checkAnswer() {
    if (quizEnded) {
      return; // do nothing if timer has ran out or quiz completed
    }
  
    var answer = document.querySelector("input[name='answer']:checked");
    if (answer.value === questions[currentQuestion].correctAnswer) {
      score++;
    }
  
    if (answer.value !== questions[currentQuestion].correctAnswer) {
      countdown -= 5; // takes 5s off the timer when non correct answer chosen
    } 
  
    currentQuestion++;
    if (currentQuestion === questions.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }
//create end quiz

function endQuiz() {
    if (quizEnded) {
      return; // same as above
    }
  
    clearInterval(timer);
    quizEnded = true; // boolean changed when whether quiz is over
  
    var initials = prompt("Enter your initials:");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    //lil math to sort the list, convert into strings
  
    var highScoresElement = document.getElementById("highScores");
    highScoresElement.innerHTML = "";
    highScores.forEach(entry => {
      var li = document.createElement("li");
      li.textContent = `${entry.initials}: ${entry.score}`;
      highScoresElement.appendChild(li);
    });
  }
  //creating the leaderboard
  
  function updateTimer() {
    var countdownElement = document.getElementById("countdown");
    countdown--;
    countdownElement.textContent = countdown;
  
    if (countdown <= 0) {
      endQuiz();
    }
  }
  //timer updates, when reaches 0 quiz ends