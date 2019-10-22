$(document).ready(function () {
    var chosenQuestion = 0;
    var a;
    var right = 0;
    var wrong = 0;
    var time = 30;
    var intervalId;
    var answerId;
    var chosenAnswer;
    isClockRunning = false;

    var questions = [{
        trivia: "what is what?",
        possibelAnswers: ["who", "when", "what", "where"],
        rightAnswer: ["what"]
    },
    {
        trivia: "when is what?",
        possibelAnswers: ["what", "when", "who", "where"],
        rightAnswer: ["when"]
    },
    {
        trivia: "where is what?",
        possibelAnswers: ["who", "why", "what", "where"],
        rightAnswer: ["where"]
    }]

    //this checks if the clock is running, then will start the counter, hide the start button, and call for the first question
    function start() {
        if (!isClockRunning) {
            $("#time").text(time);
            intervalId = setInterval(counter, 1000);
            isClockRunning = true;
            $("#start").hide();
            question();
        }
    }
    //this counts down the timer and if time runs out flags the response as incorrect
    function counter() {
        time--;
        $("#time").text(time);
        if (time < 0) {
            incorrect();
        }
    }

    //this compares the response button click with the correct answer key for the trivia to determine if the response was right or wrong
    function compare() {
        clear();
        chosenAnswer = $(a).val();
        console.log(questions[chosenQuestion].rightAnswer[0])
        console.log($(this).val());
        if ($(this).val() == questions[chosenQuestion].rightAnswer[0]) {
            console.log("yay");
            correct();
        }
        else {
            incorrect();
        }
    }

    //this clears all the divs that the question populated to allow for the splash screen
    function clear() {
        $("#buttonSpaces").empty();
        $("#question").empty();
        $("#response").empty();
        stop();
        invisibleTimer();
    }

    //this is to stop the timer to allow for the splash screen
    function stop() {
        clearInterval(intervalId);
        isClockRunning = false;
        $("#time").text("");
        console.log("Stop");
    }

    //this is for when the response is correct
    function correct() {
        console.log("run")
        clear();
        var responseDiv = $("<div class='responseBanner' id='response'>");
        responseDiv.text("That is correct!");
        $("#gameSpace").append(responseDiv);
        chosenQuestion++;
        console.log(chosenQuestion);
        console.log(questions.length);
        // invisibleTimer();
        right++;
        console.log(right);
        resetTimer();
    }

    //this is if the response is wrong
    function incorrect() {
        console.log("run incorrect")
        clear();
        var responseDiv = $("<div class='responseBanner' id='response'>");
        responseDiv.text("That is incorrect, sorry.");
        $("#gameSpace").append(responseDiv);
        chosenQuestion++;
        console.log(chosenQuestion);
        // invisibleTimer();
        wrong++;
        console.log(wrong);
        resetTimer();
    }

    //this is to allow the timer to be reset and put isClockRunning in the correct position for question().
    function resetTimer() {
        time = 30;
        isClockRunning = false;
    }

    //this is meant to be call the splash screen between quesitons, then recall question to continue the game, unless the questions array has run its course, then will call the end of game function.
    function invisibleTimer() {
        console.log("run timer")
        // console.log(questions.length)
        if (chosenQuestion != questions.length) {
            setTimeout(clear, 5000);
            question();
        }
        else {
            endGame();
        }
    }

    //this is the final screen of the game to display the results
    function endGame() {
        $("#gameSpace").text("That's the End! Here's how you did: ");
        $("#gameSpace").append("Correct: " + right);
        $("#gameSpace").append("Wrong: " + wrong);
    }

    //this is the function to load the quesions and create the answer buttons, then calls the compare function to determine if it was correct or wrong
    function question() {
        // console.log(questions);
        // chosenQuestion = Math.floor(Math.random() * questions.length);
        // chosenQuestion = 0;
        var questionText = JSON.stringify(questions[chosenQuestion].trivia);
        $("#question").append(questionText);
        console.log(questionText);
        console.log(questions[chosenQuestion].rightAnswer);
        for (i = 0; i < questions[chosenQuestion].possibelAnswers.length; i++) {
            answerId = questions[chosenQuestion].possibelAnswers[i];
            a = $("<button>");
            a.addClass("option");
            a.attr("data-name", answerId);
            a.text(answerId);
            a.val(answerId);
            $("#buttonSpaces").append(a);
            // console.log(a.val());
            // console.log(answerId);
        }
        console.log(questions[chosenQuestion].rightAnswer[0]);
        $(".option").click(compare)
    }

    //this starts the game
    $("#start").click(function () {
        start();
    })
})