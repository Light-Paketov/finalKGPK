document.addEventListener('DOMContentLoaded', function () {
    var tab = new bootstrap.Tab(document.querySelector('.list-group-item'));
    tab.show();
});

//======================================
function validateInput(element) {
    var taskContainer = element.closest('.accordion-container');

    var inputsField = taskContainer.querySelectorAll('.estimation-input');

    var ratingInput = inputsField[0].value.trim();
    var commentInput = inputsField[1].value.trim();

    if (ratingInput === '') {
        alert('Пожалуйста, введите оценку.');
        inputsField.forEach((el) => {
            el.value = '';
            el.disabled = true;
        });
        return;
    }

    if (isNaN(ratingInput)) {
        alert('Пожалуйста, введите только числовое значение для оценки.');
        inputsField.forEach((el) => {
            el.value = '';
        });
        return;
    }

    if (commentInput === '') {
        alert('Пожалуйста, введите комментарий.');
        inputsField.forEach((el) => {
            el.value = '';
            el.disabled = true;
        });
        return;
    }

    element.disabled = true;
    element.innerHTML = 'Оценено';

    inputsField.forEach((el) => {
        el.value = '';
        el.disabled = true;
    });
}
//====================================
function calculateSum() {
    // Получаем все инпуты с классом "number-input"
    var inputs = document.querySelectorAll('.rating-input');
    var counter = document.querySelector('.ratingCounter');

    // Создаем массив для хранения чисел
    var numbers = [];

    // Проходимся по каждому инпуту
    inputs.forEach(function(input) {
        // Получаем значение из инпута
        var inputValue = input.placeholder;

        // Преобразуем значение в число и добавляем в массив
        var number = parseFloat(inputValue);
        numbers.push(number);
    });

    // Складываем числа
    var sum = numbers.reduce(function (total, number) {
        return total + number;
    }, 0);
    console.log(sum)
    counter.innerHTML = sum
}
calculateSum()

//===================валидация оценок
const validRatingList = document.querySelectorAll('.rating-input');

function validateNumberInput(input) {
  if (input && input.value) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}

validRatingList.forEach(function(validRating) {
  validRating.addEventListener('input', function() {
    validateNumberInput(validRating);
  });
});