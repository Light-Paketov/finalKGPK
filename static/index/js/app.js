document.addEventListener("DOMContentLoaded", function () {
    var timerElement = document.getElementById('timer');
    var roundElement = document.getElementById('round');
    const endRound = document.getElementById('end-round-btn');

    // Получаем предыдущее значение data-round из localStorage
    var prevRoundId = localStorage.getItem('prevRoundId');

    // Сравниваем текущее значение data-round с предыдущим
    if (prevRoundId && roundElement.dataset.round !== prevRoundId) {
        // Если значение изменилось после обновления, сбрасываем таймер
        localStorage.removeItem('timer');
    }

    // Обновляем localStorage с текущим значением data-round
    localStorage.setItem('prevRoundId', roundElement.dataset.round);

    var savedTime = localStorage.getItem('timer');
    var seconds = 0;
    var minutes = 0;

    if (savedTime) {
        var savedTimeArray = savedTime.split(':');
        minutes = parseInt(savedTimeArray[0], 10);
        seconds = parseInt(savedTimeArray[1], 10);
    }

    function updateTimer() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    var formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    // Обновляем текстовое содержимое элемента
    timerElement.textContent = formattedTime;

    // Обновляем атрибут data-timer
    timerElement.setAttribute('data-timer', formattedTime);

    // Обновляем localStorage с текущим значением таймера
    localStorage.setItem('timer', formattedTime);
}

    var timerInterval = setInterval(updateTimer, 1000);

    // Создаем новый экземпляр MutationObserver с функцией обратного вызова
    var observer = new MutationObserver(function (mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-round') {
                // Перезапускаем секундомер при изменении атрибута data-round
                clearInterval(timerInterval);
                seconds = 0;
                minutes = 0;
                timerInterval = setInterval(updateTimer, 1000);

                // Обновляем localStorage с текущим значением data-round
                localStorage.setItem('prevRoundId', roundElement.dataset.round);
            }
        }
    });

    // Настраиваем конфигурацию MutationObserver для отслеживания изменений атрибута
    const btnLogin = document.getElementById('btn-login')
    var observerConfig = { attributes: true };
    btnLogin.addEventListener('click', ()=>{
           clearInterval(timerInterval);
      })
    // Начинаем наблюдение за элементом с атрибутом data-round
    observer.observe(roundElement, observerConfig);
});




// Функция для получения значения таймера
// Получение значения таймера
function getTimerValue() {
    var timerElement = document.getElementById('timer');
    return timerElement.dataset.timer;
}

// Получение значения roundID
function getRoundID() {
    var roundIDElement = document.getElementById('roundID');
    return roundIDElement.value;
}

// Получение CSRF-токена
function getCSRFToken() {
    var csrfTokenCookie = document.cookie.split(';').find(function(cookie) {
        return cookie.trim().startsWith('csrftoken=');
    });

    return csrfTokenCookie ? csrfTokenCookie.split('=')[1] : null;
}

// Отправка данных на сервер
function sendDataToServer(data) {
    var xhr = new XMLHttpRequest();
    var url = '/save_time/';
    var csrfToken = getCSRFToken();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-CSRFToken', csrfToken);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Данные успешно отправлены на сервер.');
            } else {
                console.error('Ошибка при отправке данных на сервер:', xhr.statusText);
            }
        }
    };

    xhr.send(data);
}

// Отправка данных на сервер при клике на кнопку
const endRound = document.getElementById('end-round-btn');
function sendData() {
    var timerValue = getTimerValue();
    var roundID = getRoundID();

    // Формирование данных для отправки
    var data = 'timer_value=' + encodeURIComponent(timerValue) + '&roundID=' + encodeURIComponent(roundID);

    sendDataToServer(data);
}

// Слушатель события для кнопки
endRound.addEventListener('click', sendData);
//=====================ПЕРЕКЛЮЧЕНИЕ И КНОПКИ====================================================================================
// var submitform = document.getElementById('submit-form');
// submitform.addEventListener('submit', function(event) {
//     // Ваш код для добавления класса или другие действия
//      saveButton.disabled = true
//
//     // Вручную вызываем отправку формы
//     this.submit(); // "this" здесь ссылается на форму
//   });

function handleItemClick(clickedItem) {
    // Находим все элементы с классом 'list-group-item'
    var items = document.querySelectorAll('.list-group-item');

    // Убираем класс 'active' у всех элементов
    items.forEach(function (item) {
        item.classList.remove('list-group-show')
    });

    // Добавляем класс 'active' только к текущему элементу
    clickedItem.classList.add('list-group-show');
    saveButton.classList.remove("btn-disabled")
    // saveButton.disabled = false
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

// document.getElementById('end-round-btn').addEventListener('click', function () {
//     // Ваш код для завершения раунда
//     alert('Раунд завершен');
// });

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
					console.log(xhr.responseText);
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


