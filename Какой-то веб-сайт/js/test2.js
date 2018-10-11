var questions = [
    {
        type: "choose",
        question: "<h3>Вопрос 10. Заключительный вопрос. Мне делать такие же тестовые задания?</h3>",
        answers: [
            "Да, делай",
            "Пошел в п@#$у", 
            "Мне пофиг на твой сайт",
            "Блин сложный вопрос"
        ],
        correct: [2]

        
    }
];

$("document").ready(function(){
    $("#jQuizler").jQuizler(questions);
    $("#btn + #jQuizler").click(function(){
        $("#put").attr("disabled", "disabled");
        var a = $("#put").val();
         if(a == ""){
            $("#put").attr("placeholder", "Дебил");
         }

    });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

