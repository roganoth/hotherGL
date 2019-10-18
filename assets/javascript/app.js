$(document).ready(function () {
    var chosenQuestion;
    var a;
    var correct = 0;
    var incorrect = 0;
    var time = 30;
    var intervalId;
    var answerId;
    var chosenAnswer;
    isClockRunning = false;

    var questions = [{
        trivia: "what is what?",
        possibelAnswers: ["who","when","what","where"],
        rightAnswer: ["what"]
    },
    {
        trivia: "when is what?",
        possibelAnswers: ["what","when","who","where"],
        rightAnswer: ["when"]
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
            stop();
        }
    }

    function stop() {
        clearInterval(intervalId);
        isClockRunning = false;
        $("#time").text("");
    }

    function correct() {
        invisibleTimer();
    }

    function incorrect() {
        invisibleTimer();
    }

    function resetTimer() {
        time = 30;
        isClockRunning = false;
    }

    function invisibleTimer() {
        setTimeout(function () {
            question();
        }, 5000);
    }

    function question() {
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
        $(".option").click(function () {
            chosenAnswer = $(a).val();
            // console.log("dude");
            console.log(questions[chosenQuestion].rightAnswer[0])
            console.log($(this).val());
            if ($(this).val() == questions[chosenQuestion].rightAnswer[0]) {
                console.log("yay");
                $("#buttonSpaces").empty();
                $("#question").empty();
                questions.splice(chosenQuestion);
                console.log(questions);
                invisibleTimer();
                resetTimer();
            }
            else {
                $("#buttonSpaces").empty();
                $("#question").empty();
                invisibleTimer();
            }
        })
    }


    $("#start").click(function () {
        start();
    })
})