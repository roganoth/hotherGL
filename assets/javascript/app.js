$(document).ready(function() {
var correct = 0;
var incorrect = 0;
var questions = []
//create an array of objects(questions), with an array ie question: -> keyAnswers [] -> rightAnswer[] 
function start () {
    var chosenQuestion = Math.floor(Math.random)*questions.length;
    
}

$("#start").click(function){
    start();
}
})