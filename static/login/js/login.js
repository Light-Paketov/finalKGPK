var inputTeam = document.getElementById("teamName");
var inputPc = document.getElementById("pcNumber");

inputTeam.addEventListener("input", function() {
    inputTeam.value = inputTeam.value.replace(/\D/g, '').slice(0, 15);
});


function addPrefix() {
    if (!inputTeam.value.startsWith("Команда -")) {
        inputTeam.value = "Команда - " + inputTeam.value.slice(0, 2);
    }
}

inputTeam.addEventListener("click", addPrefix);
inputTeam.addEventListener("input", addPrefix);

// ==============================================================================

function formatInput() {
    var inputValue = inputPc.value.replace(/\D/g, '').slice(0, 4);

    inputPc.value = inputValue.slice(0, 2);
}

inputPc.addEventListener("click", formatInput);
inputPc.addEventListener("input", formatInput);

//-==============================================================================
document.getElementById('btn-login').addEventListener('click', function() {
    // Сохраняем текущее время в миллисекундах в Local Storage
    localStorage.setItem('startTime', Date.now());

    // Переход на другую страницу
    window.location.href = '../../../templates/app/index.html';
});