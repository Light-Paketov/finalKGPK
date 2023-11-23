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
