let questionslist = {};
let trivia = {};

let questions;
let answervalue;
let answertext;
let playerchoice;

let intervalID;

// Timer Object ========================================================================================================
timer = {
    time: 12,

    start: function() {
        /*$("#timer-display").text("00:12");*/
        intervalID = setInterval(timer.countdown, 1000)
    },

    countdown: function() {
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            timer.reset();
            trivia.blank++;
            console.log(trivia.blank);
            console.log(playerchoice);
            /*transitionQuestions();*/
        } else {

        }
    },

    reset: function() {
        timer.time = 12;
        $("#timer-display").text("00:12");
        clearInterval(intervalID);
    },

    timeConverter: function(t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};

// Question Object =====================================================================================================

function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestion();

}

function resetTrivia() {
    return {
        questionNum: 0,
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0 : {
            question : "What race is Chewbacca?",
            A : "Mon Calamari",
            B : "Wookie",
            C : "Jawa",
            D : "Bantha",
            ans : { value : "B",
                display : "Wookie"}
        },
        q1 : {
            question : "What give's lightsabers their color?",
            A : "The owner's energy.",
            B : "The planet it was made on.",
            C : "The owner's age.",
            D : "The crystals used to make them.",
            ans : { value : "D",
                display : "The crystals used to make them."}

        },
        q2 : {
            question : "What is the name of the snow planet in Episode V?",
            A : "Hoth",
            B : "Endor",
            C : "Alderaan",
            D : "Naboo",
            ans : { value : "A",
                display : "Hoth"}
        },
        q3 : {
            question : "What is the name of the only Super Star Destroyer see in the films, Darth Vader's flagship?",
            A : "Devastator",
            B : "Executor",
            C : "Dominator",
            D : "Lusankya",
            ans : { value : "B",
                display : "Executor"}
        },
        q4 : {
            question : "How did Han Solo acquire the Millenium Falcon?",
            A : "Stole it.",
            B : "Won it in a raffle.",
            C : "Bought it.",
            D : "Won it in a Sabacc game.",
            ans : { value : "D",
                display : "Won it in a Sabacc game"}
        },
        q5 : {
            question : "What was Luke's call sign in Episode IV?",
            A : "Red Five",
            B : "Big Red",
            C : "Rogue Five",
            D : "Epic One",
            ans : { value : "A",
                display : "Red Five"}
        },
        q6 : {
            question : "What system can Cloud City can be found in?",
            A : "Lando",
            B : "Bespin",
            C : "Dagobah",
            D : "Corellia",
            ans : { value : "B",
                display : "Bespin"}
        },
        q7 : {
            question : "Who is the bounty hunter who finally delivers Han to Jabba?",
            A : "Bossk",
            B : "Zuckuss",
            C : "Dengar",
            D : "Boba Fett",
            ans : { value : "D",
                display : "Boba Fett"}
        }
    }
}

function showQuestion() {
    questions = Object.keys(questionslist);
    var questiontitle = questions[trivia.questionNum];
    var question = questionslist[questiontitle];
    var questionblocks = createQuestions(question, questiontitle);
    $(".question-block").append(questionblocks).show();
}

function createQuestions(question, key) {
/*    var block = $("<div class='question' name='" + key + "'>" + question.question + "</div>");
    let choice1 = $("<button class='choice' data-value='A'>" + question.A + "</button>");
    let choice2 = $("<button class='choice' data-value='B'>" + question.B + "</button>");
    let choice3 = $("<button class='choice' data-value='C'>" + question.C + "</button>");
    let choice4 = $("<button class='choice' data-value='D'>" + question.D + "</button>");
    block.append(choice1, choice2, choice3, choice4);*/

    var block = $("<div class='question' name='" + key + "'><h3>" + question.question + "</h3>" +
        "<ul>" +
        "<li><h4 class='choice' data-value='A'>" + question.A + "</h4></li>" +
        "<li><h4 class='choice' data-value='B'>" + question.B + "</h4></li>" +
        "<li><h4 class='choice' data-value='C'>" + question.C + "</h4></li>" +
        "<li><h4 class='choice' data-value='D'>" + question.D + "</h4></li>" +
        "</ul>" + "</div>");

    answervalue = question.ans.value;
    answertext = question.ans.display;

    return block;
}

function timedOut () {
    
}

function checkAnswer(pick) {
    playerchoice = pick;
    console.log(playerchoice);
    console.log(answervalue);
    if (playerchoice === answervalue) {
        console.log("Correct!");
        $(".answer-page").text("Correct!");
        trivia.correct++;
    } else {
        console.log("Wrong the correct answer was " + answertext);
        $(".answer-page").text("Wrong... The correct answer was " + answertext);
        trivia.incorrect++;
    }

    setTimeout(clearboard, 8000);
    setTimeout(transitionQuestions, 10000);

}

function clearboard() {
    $(".question-block").empty();

}

function displayResults() {
    $(".question-block").empty();
    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);
    $(".results").show();
    $(".reset").show();
}
function transitionQuestions() {
    trivia.questionNum++;
    $(".answer-page").hide();
    playerchoice = undefined;
    if (trivia.questionNum < questions.length) {
        $(".answer-page .question-block").empty();
        showQuestion();
        timer.start();
    } else {
        displayResults();
    }

}


// Gameplay ============================================================================================================

$(document).ready(function() {

    $(".start").on("click", function() {
        $(".start").hide();
        startTrivia();
        timer.start();
    });

    $(".question-block").on("click", ".choice", function() {
        timer.reset();
        console.log(trivia.questionNum);
        console.log($(this).attr("data-value"));
        playerchoice = $(this).attr("data-value");
        $(".question-block").hide();
        checkAnswer(playerchoice);

    });

    $(".reset").on("click", function() {
        $(".start").show();
        timer.reset();
    })

});