$(document).ready(function () {
    var chosenQuestion;
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


    //create an array of objects(questions), with an array ie question: -> keyAnswers [] -> rightAnswer[] 
    function start() {
        if (!isClockRunning) {
            $("#time").text(time);
            intervalId = setInterval(counter, 1000);
            isClockRunning = true;
            $("#start").hide();
            question();
        }
    }

    function counter() {
        time--;
        $("#time").text(time);
        if (time < 0) {
            compare();
        }

    }

    function clear() {
        $("#buttonSpaces").empty();
        $("#question").empty();
        stop();
        questions.splice(chosenQuestion.triva, 1);
        if (questions.length != 0) {
            invisibleTimer();
        }
        resetTimer();
        console.log(questions);
    }

    function stop() {
        clearInterval(intervalId);
        isClockRunning = false;
        $("#time").text("");
    }

    function correct() {
        console.log("run")
        clear();
        var responseDiv = $("<div class='responseBanner' id='response'>");
        responseDiv.text("That is correct!");
        $("#gameSpace").append(responseDiv);
        invisibleTimer();
        right++;
    }

    function incorrect() {
        console.log("run uincorrect")
        clear();
        var responseDiv = $("<div class='responseBanner' id='response'>");
        responseDiv.text("That is incorrect, sorry.");
        $("#gameSpace").append(responseDiv);
        invisibleTimer();
        wrong++;
    }

    function resetTimer() {
        time = 30;
        isClockRunning = false;
    }

    function invisibleTimer() {
        console.log("run timeer")
        console.log(questions.length)
        if (questions.length != 0) {
            setTimeout(clear, 3000);
            question();
        }
        else {
            endGame();
        }
    }

    function endGame() {
        $("#gameSpace").text("That's the End! Here's how you did: ");
        $("#gameSpace").append("Correct" + right);
        $("#gameSpace").append("Wrong" + wrong);
    }

    function question() {
        console.log(questions);
        chosenQuestion = Math.floor(Math.random() * questions.length);
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
            console.log(a.val());
        }
        console.log(answerId);
        console.log(questions[chosenQuestion].rightAnswer[0]);
        $(".option").click(function compare() {
            chosenAnswer = $(a).val();
            console.log(questions[chosenQuestion].rightAnswer[0])
            console.log($(this).val());
            if ($(this).val() == questions[chosenQuestion].rightAnswer[0] && questions.length != 0) {
                console.log("yay");
                correct();
            }
            // else if (questions.length === 0) {
            //     endGame();
            // }
            else {
                incorrect();
            }
        })
    }

    $("#start").click(function () {
        start();
    })
})