var questions = [
    {
        type: "choose",
        question: "<h3>Уровень сложности:</h3><p>P.S. Тут нет уровня сложности только(HARD)</p>",
        answers: [
            "Легкий",
            "Средний",
            "Сложный"
        ],
        correct: [3]
       
    },
   
    {
        type: "choose",
        question: "<h3>Вопрос 2. Что ты выберишь?</h3>",
        answers: [
            "Шаурму",
            "Пиццу",
            "Ничего"
        ],
        correct: [1]
       
    },
    {
        type: "choose",
        question: "<h3>Вопрос 3. Уже нормальный. Сложи 2+2*2</h3>",
        answers: [
            "6",
            "8",
            "Это слооожно"
        ],
        correct: [1]
        
    },
{
        type: "choose",
        question: "<h3>Вопрос 4. В периодической таблице Менделеева что обозначет элемент (Au):</h3>",
        answers: [
            "Золото",
            "Серебро",
            "Водорооод?",
            "Наверно это Железо"

        ],
        correct: [1]
        
    },
{
        type: "choose",
        question: "<h3>Вопрос 5. В физике (F) это - </h3>",
        answers: [
            "Силааааа",
            "Скоороость",
            "Плотность?"
        ],
        correct: [1]
        
    },
{
        type: "choose",
        question: "<h3>Вопрос 6. Что больше</h3>",
        answers: [
            "-6",
            "-0.25",
            "-0.0000000001"
        ],
        correct: [3]
        
    },
    {
        type: "choose",
        question: "<h3>Вопрос 7. Столица США:</h3>",
        answers: [
            "Вашингтон",
            "Нью-Йорк",
            "У нее есть столица?"
        ],
        correct: [1]
        
    },
    {
        type: "choose",
        question: "<h3>Вопрос 8. Самая большая планета в Солнечной системе?</h3>",
        answers: [
            "Юпитер",
            "Меркурий",
            "Земля"
        ],
        correct: [1]
        
    },
    {
        type: "choose",
        question: "<h3>Вопрос 9. Теперь самый слоожный вопрос готовься. Ты куда ходишь в КФС или Макдональдс</h3>",
        answers: [
            "КФС там есть вкусная курочка",
            "Макдональдс понял ты тварь",
            "Люблю Бургер Кинг",
            "Ты шо я на диееееете"
        ],
        correct: []

        
    },
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
    $("#btn , #jQuizler").click(function(){
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

