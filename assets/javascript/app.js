$(document).ready(function () {
    var chosenQuestion;
    var correct = 0;
    var incorrect = 0;
    var time = 5;
    var intervalId;
    var answerId;
    isClockRunning = false;

    var questions = [{
        sampleQuestion1: "what is what?",
        possibelAnswers: [1, 2, 3, 4],
        rightAnswer: [3]
    },
    {
        sampleQuestion2: "when is what?",
        possibelAnswers: [1, 2, 3, 4],
        rightAnswer: [2]
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
    //compare function in order to compare player selection against correct answer
    // function compare() {
    //     if ()
    // }

    function stop() {
        clearInterval(intervalId);
        isClockRunning = false;
        $("#time").text("");
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
        $("gameSpace").append(questions[chosenQuestion].sampleQuestion1)
        for (i = 0; i < questions[chosenQuestion].possibelAnswers.length; i++) {
            answerId = questions[chosenQuestion].possibelAnswers[i];
            var a = $("<button>");
            a.addClass("option");
            a.attr("data-name",answerId);
            a.text(answerId);
            $("#gameSpace").append(a);
        }
    }

    $(".option").on("click", function(){
        if ((chosenQuestion.rightAnswer).contains(answerId)) {
            console.log("yay");
        }
    })

    $("#start").click(function () {
        start();
    })
})