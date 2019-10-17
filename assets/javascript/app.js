$(document).ready(function () {
    var chosenQuestion;
    var correct = 0;
    var incorrect = 0;
    var time = 30;
    var intervalId;
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
            question();
            if (time < 0){
                stop();
            }
        }
    }

    function counter() {
        time--;
        $("#time").text(time);
    }

    function stop() {
        clearInterval(intervalId);
        isClockRunning = false;
    }

    function resetTimer() {
        time = 30;
        isClockRunning = false;
    }

    function invisibleTimer() {
        setTimeout(function(){
            question();
        },5000);
    }

    function question(){
        chosenQuestion = Math.floor(Math.random()*questions.length);
        for(i = 0; i < questions[chosenQuestion].possibelAnswers.length; i++) {
            var answerId = questions[chosenQuestion].possibelAnswers;
            $("#gameSpace").append("<button>answerId</button>");
        }
    }

    $("#start").click(function(){
        start();
    })
})