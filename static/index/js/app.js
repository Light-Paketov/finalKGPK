const startTime = localStorage.getItem('startTime');
let isTimerPaused = false; // Флаг паузы

function getCSRFToken() {
    var csrfTokenCookie = document.cookie.split(';').find(function(cookie) {
        return cookie.trim().startsWith('csrftoken=');
    });

    return csrfTokenCookie ? csrfTokenCookie.split('=')[1] : null;
}

function pad(number) {
    return (number < 10) ? '0' + number : number;
}

function updateTimer() {
    if (isTimerPaused) {
        return; // Если таймер на паузе, не обновляем его
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - parseInt(startTime);
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    document.getElementById('timer').innerHTML = `${pad(minutes)}:${pad(remainingSeconds)}`;
}

if (startTime) {
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    window.addEventListener('beforeunload', function() {
        clearInterval(timerInterval);
    });

    const endTime = document.getElementById('end-round-btn');
    endTime.addEventListener('click', function() {
        clearInterval(timerInterval);
        const currentTime = Date.now();
        const elapsedTime = currentTime - parseInt(startTime);
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timerValue = `${pad(minutes)}:${pad(remainingSeconds)}`;

        const csrfToken = getCSRFToken();
        if (csrfToken) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/save_time/', true);  // Замените '/save-time/' на свой URL
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRFToken', csrfToken);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log('Значение таймера успешно отправлено');
                }
            };
            xhr.send('timer_value=' + encodeURIComponent(timerValue));
        }

        localStorage.removeItem('startTime');
        localStorage.setItem('timerPaused', isTimerPaused); // Сохраняем состояние паузы
    });

    // Добавляем обработчик для кнопки паузы
    const pauseButton = document.getElementById('end-round-btn');
    pauseButton.addEventListener('click', function() {
        let newTimer = document.querySelector('.timeStop')
        console.log(newTimer)
        isTimerPaused = !isTimerPaused; // Переключаем флаг паузы

        if (!isTimerPaused) {
            // Если таймер возобновлен, обновляем startTime
            localStorage.setItem('startTime', Date.now() - (parseInt(startTime) - Date.now()));
        }
        else {
            newTimer.innerText = 'Время выполнения остановлено';
            localStorage.setItem('timerPaused', isTimerPaused); // Сохраняем состояние паузы
        }
    });
} else {
    const timerPaused = localStorage.getItem('timerPaused');
    if (timerPaused === 'true') {
        let newTimer = document.querySelector('.timeStop');
        newTimer.innerText = 'Время выполнения остановлено';
    }
}

//=====================ПЕРЕКЛЮЧЕНИЕ И КНОПКИ====================================================================================
 var items = document.querySelectorAll('.list-group-item');
function handleItemClick(clickedItem) {
    // Находим все элементы с классом 'list-group-item'
        var items = document.querySelectorAll('.list-group-item');

    // Убираем класс 'active' у всех элементов
    items.forEach(function (item) {
        item.classList.remove('list-group-show')
        document.getElementById('btn-save').disabled = false;
    });

    // Добавляем класс 'active' только к текущему элементу
    clickedItem.classList.add('list-group-show');
}

    var items = document.querySelectorAll('.list-group-item-tasks');
    var currentIndex = 0;
    var saveButton = document.getElementById('btn-save');
    function showTask(index) {
        // Убираем класс 'active' у всех элементов
        items.forEach(function (item) {
            item.classList.remove('list-group-show');
        });

        // Добавляем класс 'active' текущему элементу
        items[index].classList.add('list-group-show');
        saveButton.classList.remove("btn-disabled")
         // saveButton.disabled = false
    }

    function nextTask() {
        // Увеличиваем индекс и отображаем следующий элемент
        currentIndex = (currentIndex + 1) % items.length;
        showTask(currentIndex);
    }

    // Добавляем слушатель события для кнопки
    document.getElementById('next-task-btn').addEventListener('click', nextTask);


const endBtn = document.getElementById('end-round-btn')
const resBtn = document.getElementById('btn-result')
endBtn.addEventListener("click", function (){
    resBtn.style.display = 'inline-block'
})

function saveChanges() {
    // Здесь вы можете изменить содержимое modal-body
    document.querySelector('.modal-save').innerHTML = 'Идет проверка ваших заданий! <br> Преподаватель сообщит вам, когда можно посмотреть результат';
    document.getElementById('end-round-btn').style.display = 'none'

    var myButton = document.getElementById("closeWindow");
    myButton.onclick = function() {
        showResults();
    };
  }
//=========================================================================================================


document.addEventListener("DOMContentLoaded", function () {
    var submitBtn = document.querySelector(".btn-submit");

    var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    submitBtn.addEventListener("click", function () {
        confirmationModal.show();
    });

    document.getElementById("confirmSave").addEventListener("click", function () {
        confirmationModal.hide();
    });
});

//=========================================================================================================

document.addEventListener('DOMContentLoaded', function () {
    var saveButton = document.getElementById('btn-save');

    saveButton.addEventListener('click', function () {
        var activeTask = document.querySelector('.list-group-item.list-group-show');

        activeTask.style.color = '#ccc';
        activeTask.style.pointerEvents = 'none'
        saveButton.classList.add('btn-disabled')

    });
});


//=======================================================================
document.addEventListener('DOMContentLoaded', function () {
    var currentTaskIndex = 0;
    var tasks = document.querySelectorAll('.task');
    var endBtn = document.getElementById('btn-end');

    document.getElementById('next-task-btn').addEventListener('click', function () {
        var activeListItem = document.querySelector('.list-group-item.active');
        if (activeListItem) {
            activeListItem.classList.remove('active');
        }

        if (currentTaskIndex < tasks.length - 1) {
            tasks[currentTaskIndex].style.display = 'none';
            currentTaskIndex++;
            tasks[currentTaskIndex].style.display = 'block';
            var nextTaskListItem = document.querySelector(`#list-task${currentTaskIndex + 1}-list`);
            if (nextTaskListItem) {
                nextTaskListItem.classList.add('active');
            }
        } else {
            alert('Вы завершили все задания.');

        }

    });


// Добавляем обработчики для переключения по списку
var listItems = document.querySelectorAll('.list-group-item');
listItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
        var activeListItem = document.querySelector('.list-group-item.active');
        if (activeListItem) {
            activeListItem.classList.remove('active');
        }

        tasks[currentTaskIndex].style.display = 'none';
        currentTaskIndex = index;
        tasks[currentTaskIndex].style.display = 'block';
        var clickedListItem = document.querySelector(`#list-task${currentTaskIndex + 1}-list`);
        if (clickedListItem) {
            clickedListItem.classList.add('active');
        }
    });
});



});

//=============================ПОЛУЧЕНИЕ ЗАДАЧ====================================================================================================

document.addEventListener('DOMContentLoaded', function () {
	var taskItems = document.querySelectorAll('.list-group-item-tasks');

	taskItems.forEach(function (item) {
		item.addEventListener('click', function () {
			var taskId = this.getAttribute('data-task-id');

			// Получение CSRF токена из cookie
			var csrftoken = getCookie('csrftoken');

			// Создание объекта XMLHttpRequest
			var xhr = new XMLHttpRequest();

			// Открытие соединения
			xhr.open('GET', '/index/?task_id=' + encodeURIComponent(taskId), true);

			// Установка заголовка после открытия соединения
			xhr.setRequestHeader('X-CSRFToken', csrftoken);

			// Обработчик события изменения состояния объекта XMLHttpRequest
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					// Обработка успешного ответа от сервера
					console.log('успешно');
				}
			};

			// Отправка запроса
			xhr.send();
		});
	});

	// Функция для получения значения cookie по имени
	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
});


//=================================СЛОЖЕНИЕ БАЛЛОВ

const ratingInputs = document.querySelectorAll('.rating-input')

ratingInputs.forEach((el)=>{
    const sum = el += el
})

//=========================================================
endRound = document.getElementById('end-round-btn')

function showResults(){
    const noneElements = document.querySelectorAll('.showResults')
    const btnResult = document.getElementById('btn-result')
    const waiting = document.querySelector('.waiting')
    const btnEnd = document.getElementById('btn-end')
    const btnSave = document.getElementById('btn-save')
    const tasksControl = document.querySelector('.btns')

    noneElements.forEach(el =>{
    el.classList.add('none')
         waiting.classList.remove('none')
    btnResult.classList.remove('none')
    btnEnd.classList.add('none')
    btnSave.classList.add('none')
    tasksControl.style.textAlign = 'center'
})
}
// endRound.addEventListener('click', showResults)


//===================================
var ratingElements = document.querySelectorAll('.ratingSum');

// Инициализируем переменную для хранения суммы
var sum = 0;

// Проходим по каждому элементу и добавляем его значение к сумме
ratingElements.forEach(function(element) {
    sum += parseInt(element.textContent);
});
console.log(sum)

// Выводим результат в элемент с id "sumRating"
document.querySelector('.sumRating').textContent = sum;

//==============================


//   document.getElementById('submit-form').addEventListener('submit', function() {
//     // Сделать кнопку недоступной после отправки формы
//     document.getElementById('btn-save').disabled = true;
//
//     // Сохранить состояние кнопки в localStorage
//     localStorage.setItem('submitButtonDisabled', 'true');
// });

// Проверить состояние кнопки при загрузке страницы
window.onload = function() {
    var isButtonDisabled = localStorage.getItem('submitButtonDisabled');
    if (isButtonDisabled === 'true') {
        document.getElementById('btn-save').disabled = true;
    }
};

window.onload = function() {
    var items = document.querySelectorAll('.list-group-item');

items[0].click();
};


//==============валидация языка
const languageInput = document.getElementById('areaLanguage');

languageInput.addEventListener('input', function() {
  validateTextInput(languageInput);
});

function validateTextInput(input) {
  if (input && input.value) {
    // Разрешаем буквы (латиницу и кириллицу), цифры и пробелы
    input.value = input.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
  }
}

//====================
// const mytimer = document.getElementById('timer');
//
// // Получаем элемент, к которому мы хотим добавить/удалить класс
// const myElement = document.querySelector('.showResults');
//
// // Проверяем, есть ли у кнопки класс 'none'
// if (mytimer.innerHTML == '0:00') {
//   // Если есть, то добавляем класс 'none' к элементу
//   myElement.classList.add('none');
// } else {
//   // Если нет, то удаляем класс 'none' у элемента (если он есть)
//   myElement.classList.remove('none');
// }

const timeStop = document.querySelector('.timeStop')
if (timeStop.innerHTML == "Время выполнения остановлено")
    showResults()

console.log(timeStop)