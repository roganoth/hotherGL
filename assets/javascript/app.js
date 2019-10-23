$(document).ready(function () {
    var chosenQuestion = 0;
    var a;
    var right = 0;
    var wrong = 0;
    var time = 30;
    var intervalId;
    var answerId;

    var questions = [{
        trivia: "who killed hector in the illiad?",
        possibelAnswers: ["achilles", "paris", "odyseus", "patroclus"],
        rightAnswer: ["achilles"]
    },
    {
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
        $("#time").text(time);
        // intervalId = setInterval(counter, 1000);
        $("#start").hide();
        question();
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
        // console.log(questions[chosenQuestion].rightAnswer[0])
        // console.log($(this).val());
        if ($(this).val() == questions[chosenQuestion].rightAnswer[0]) {
            // console.log("yay");
            correct();
        }
        else {
            incorrect();
        }
    }

    //this clears all the divs that the question populated to allow for the splash screen
    function clear() {
        // console.log("clear");
        $("#buttonSpaces").empty();
        $("#question").empty();
        $("#response").empty();
        stop();
        $(".ressponseBanner").empty();
        // invisibleTimer();
    }

    //this is to stop the timer to allow for the splash screen
    function stop() {
        clearInterval(intervalId);
        $("#time").text("");
        // console.log("Stop");
    }

    //this is for when the response is correct
    function correct() {
        // console.log("run")
        clear();
        var responseDiv = $("<div class='responseBanner response'>");
        responseDiv.text("That is correct!");
        $("#response").text("That is correct!");
        chosenQuestion++;
        // console.log(chosenQuestion);
        // console.log(questions.length);
        right++;
        // console.log(right);
        resetTimer();
        invisibleTimer();
    }

    //this is if the response is wrong
    function incorrect() {
        clear();
        var responseDiv = $("<div class='responseBanner' id='response'>");
        responseDiv.text("That is incorrect, sorry.");
        $("#response").text("That is incorrect, sorry.");
        chosenQuestion++;
        wrong++;
        resetTimer();
        invisibleTimer();
    }

    //this is to allow the timer to be reset and put isClockRunning in the correct position for question().
    function resetTimer() {
        time = 30;
        isClockRunning = false;
    }

    //this is meant to be call the splash screen between quesitons, then recall question to continue the game, unless the questions array has run its course, then will call the end of game function.
    function invisibleTimer() {
        if (chosenQuestion != questions.length) {
            setTimeout(clear, 3000);
            setTimeout(question, 3000);
        }
        else {
            endGame();
        }
    }

    //this is the final screen of the game to display the results
    function endGame() {
        stop();
        $("#gameSpace").html("<h1 class='endGameScore'>That's the End! Here's how you did: </h1><br>");
        $("#gameSpace").append("<h1 class='endGameScore'>Correct: " + right + "</h1><br>");
        $("#gameSpace").append("<h1 class='endGameScore'>Wrong: " + wrong + "</h1><br>");
    }

    //this is the function to load the quesions and create the answer buttons, then calls the compare function to determine if it was correct or wrong
    function question() {
        $("#time").text("30");
        intervalId = setInterval(counter, 1000);

        var questionText = JSON.stringify(questions[chosenQuestion].trivia);
        $("#question").append(questionText);
        for (i = 0; i < questions[chosenQuestion].possibelAnswers.length; i++) {
            answerId = questions[chosenQuestion].possibelAnswers[i];
            a = $("<button>");
            a.addClass("option");
            a.attr("data-name", answerId);
            a.text(answerId);
            a.val(answerId);
            $("#buttonSpaces").append(a);
        }
        $(document).on("click", ".option", compare)
    }

    //this starts the game
    $("#start").click(function () {
        start();
    })
})