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
            $(".question-block").hide();
            timer.reset();
            timedOut();
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
            question : "The Rubik's cube was initially sold under what name?",
            A : "Puzzle Cube",
            B : "Color Block",
            C : "Magic Cube",
            D : "Manipulatable Toy",
            ans : { value : "C",
                display : "Magic Cube"}
        },
        q1 : {
            question : "The basic 3x3x3 cube has how many possible positions?",
            A : "500,000,000,000,000,000",
            B : "2 Trillion",
            C : "25 Billion",
            D : "43,252,003,274,489,856,000",
            ans : { value : "D",
                display : "43,252,003,274,489,856,000"}

        },
        q2 : {
            question : "The first Rubik's Cube World Championship was held in what year and what city?",
            A : "1983, London",
            B : "1990, New York City",
            C : "1982, Budapest",
            D : "1985, Paris",
            ans : { value : "C",
                display : "1982, Budapest"}
        },
        q3 : {
            question : "How many faces does a Megaminx have?",
            A : "16",
            B : "8",
            C : "14",
            D : "12",
            ans : { value : "D",
                display : "12"}
        },
        q4 : {
            question : "Even numbered cubes (4x4x4, 6x6x6, etc.) are different from the odd cubes in what way?",
            A : "They do not have fixed centers.",
            B : "They are easier to take apart.",
            C : "They cannot be magnetized.",
            D : "They cannot be speed solved.",
            ans : { value : "A",
                display : "They do not have fixed centers."}
        },
        q5 : {
            question : "The original Cube was invented in what year?",
            A : "1976",
            B : "1960",
            C : "1974",
            D : "1979",
            ans : { value : "C",
                display : "1974"}
        },
        q6 : {
            question : "What is the current world record for the fastest solve of the standard 3x3x3?",
            A : "4.72 seconds",
            B : "5.01 seconds",
            C : "4.22 seconds",
            D : "5.84 seconds",
            ans : { value : "C",
                display : "4.22 seconds"}
        },
        q7 : {
            question : "What is the largest current production model of the cube?",
            A : "19x19x19",
            B : "17x17x17",
            C : "15x15x15",
            D : "13x13x13",
            ans : { value : "B",
                display : "17x17x17"}
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
    trivia.blank++;
    $(".answer-page").text("Wake Up! You took to long, the correct answer was '" + answertext + "'.").show();

    setTimeout(clearboard, 4000);
    setTimeout(transitionQuestions, 5000);

}

function checkAnswer(pick) {
    playerchoice = pick;
    console.log(playerchoice);
    console.log(answervalue);
    if (playerchoice === answervalue) {
        console.log("Correct!");
        $(".answer-page").text("Correct!").show();
        trivia.correct++;
    } else {
        console.log("Wrong the correct answer was " + answertext);
        $(".answer-page").text("Wrong... The correct answer was '" + answertext + "'.")
            .show();
        trivia.incorrect++;
    }

    setTimeout(clearboard, 4000);
    setTimeout(transitionQuestions, 5000);

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
        $(".results, .reset").hide().empty();
    })

});